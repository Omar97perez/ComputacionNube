#include <iostream>
#include <vector>
#include <assert.h>
#include <cmath>
#include <png++/png.hpp>
#include "stdio.h"
#include "string.h"
#include <string>
#include <sstream>
#include <chrono>
#include <CL/cl.hpp>
#include <sys/stat.h>


using namespace std;

typedef vector<double> Array;
typedef vector<Array> Matrix;
typedef vector<Matrix> Image;

char* readCLSource(const char* shaderFile, int &size)
{
    struct stat statBuf;
    stat(shaderFile, &statBuf);

    std::ifstream f(shaderFile);
    
    if (!f)
        return 0;
    
    char *buf = (char*) new char[statBuf.st_size + 1];
    f.read(buf, statBuf.st_size);
    buf[statBuf.st_size] = '\0';
    
    //std::cout << std::string(buf, statBuf.st_size) << std::endl;

    size = statBuf.st_size + 1;

    return buf;
}

Matrix getGaussian(int height, int width, double sigma)
{
    Matrix kernel(height, Array(width));
    double sum = 0.0;
    int i, j;

    for (i = 0; i < height; i++)
    {
        for (j = 0; j < width; j++)
        {
            kernel[i][j] = exp(-(i * i + j * j) / (2 * sigma * sigma)) / (2 * M_PI * sigma * sigma);
            sum += kernel[i][j];
        }
    }

    for (i = 0; i < height; i++)
    {
        for (j = 0; j < width; j++)
        {
            kernel[i][j] /= sum;
        }
    }

    return kernel;
}

Image loadImage(const char *filename)
{
    png::image<png::rgb_pixel> image(filename);
    Image imageMatrix(3, Matrix(image.get_height(), Array(image.get_width())));

    int h, w;
    for (h = 0; h < image.get_height(); h++)
    {
        for (w = 0; w < image.get_width(); w++)
        {
            imageMatrix[0][h][w] = image[h][w].red;
            imageMatrix[1][h][w] = image[h][w].green;
            imageMatrix[2][h][w] = image[h][w].blue;
        }
    }

    return imageMatrix;
}

void saveImage(Image &image, const char *filename)
{
    //assert(image.size() == 3);

    int height = image[0].size();
    int width = image[0][0].size();
    int x, y;

    png::image<png::rgb_pixel> imageFile(width, height);

    for (y = 0; y < height; y++)
    {
        for (x = 0; x < width; x++)
        {
            imageFile[y][x].red = image[0][y][x];
            imageFile[y][x].green = image[1][y][x];
            imageFile[y][x].blue = image[2][y][x];
        }
    }
    imageFile.write(filename);
}

int main(int agrc, char *argv[])
{
    auto t1 = std::chrono::high_resolution_clock::now();
    Matrix filter = getGaussian(10, 10, 50.0);

    cout << "Cargando Imagen..." << endl;
    Image image = loadImage(argv[1]);

    int height = image[0].size();
    int width = image[0][0].size();
    int filterHeight = filter.size();
    int filterWidth = filter[0].size();
    int newImageHeight = height - filterHeight + 1;
    int newImageWidth = width - filterWidth + 1;

    // --------------- INICIALIZACION DE OPENCL ------------------
    
                std::vector<cl::Platform> all_platforms;
                cl::Platform::get(&all_platforms);

                if ( all_platforms.size() == 0 ) {
                    printf("No se han encontrado plataformas para ejecutar OpenCL");
                    exit(1);
                }

                cl::Platform default_platform = all_platforms[0];
                std::cout << "Using platform: "<< default_platform.getInfo<CL_PLATFORM_NAME>() << "\n";

                std::vector<cl::Device> all_devices;
                
                default_platform.getDevices(CL_DEVICE_TYPE_ALL, &all_devices);

                if (all_devices.size() == 0 ) {
                    printf("La plataforma escogida no es compatible con OpenCL");
                    exit(1);
                }

                cl::Device default_device = all_devices[0];
                std::cout << "Using device: " << default_device.getInfo<CL_DEVICE_NAME>() << "\n";

                cl::Context context({default_device});

                cl::Program::Sources sources;

                int size = 0;
                char *kernel_code = readCLSource("clProgram.cl", size);

                sources.push_back({kernel_code, size});

                cl::Program program(context, sources);

                if( program.build({default_device})!=CL_SUCCESS ) {
                    std::cout <<" Error building: " << program.getBuildInfo<CL_PROGRAM_BUILD_LOG>(default_device) << "\n";
                    exit(1);
                }

    // --------------- PREPARACION DATOS PARA OPENCL ------------------

    vector<double> sourceCPU;
    vector<double> resultCPU;
    vector<double> filtroCPU;

    for (int d = 0; d < 3; d++)
    {
        for (int i = 0; i < image[0].size(); i++)
        {
            for (int j = 0; j < image[0][0].size(); j++)
            {
                sourceCPU.push_back(image[d][i][j]);
            }
        }
    }

    for ( int i = 0; i < filterHeight; i++) {
        for ( int j = 0; j < filterWidth; j++) {
            filtroCPU.push_back(filter[i][j]);
        }
    }

    resultCPU.resize(3 * newImageHeight * newImageWidth);

    // BUFFERS DE OPENCL
    cl::Buffer sourceGPU(context, CL_MEM_READ_WRITE, sourceCPU.size() * sizeof(double));
    cl::Buffer resultGPU(context, CL_MEM_READ_WRITE, resultCPU.size() * sizeof(double));
    cl::Buffer filtroGPU(context, CL_MEM_READ_WRITE, filtroCPU.size() * sizeof(double));

    cl::CommandQueue queue(context, default_device);

    // COPIA DE DATOS A BUFFERS DE GPU
    queue.enqueueWriteBuffer(sourceGPU, CL_TRUE, 0, sourceCPU.size() * sizeof(double), sourceCPU.data());
    queue.enqueueWriteBuffer(filtroGPU, CL_TRUE, 0, filtroCPU.size() * sizeof(double), filtroCPU.data());

    // EJECUCION DEL KERNEL

    cout << "Aplicando filtrado..." << endl;
    cl::Kernel kernel_gauss = cl::Kernel(program, "applyFilter");
    kernel_gauss.setArg(0, sourceGPU);
    kernel_gauss.setArg(1, filtroGPU);
    kernel_gauss.setArg(2, resultGPU);
    kernel_gauss.setArg(3, height);
    kernel_gauss.setArg(4, width);
    kernel_gauss.setArg(5, filterHeight);
    kernel_gauss.setArg(6, filterWidth);
    queue.enqueueNDRangeKernel(kernel_gauss, cl::NullRange, cl::NDRange(height), cl::NullRange);
    queue.finish();

    queue.enqueueReadBuffer(resultGPU, CL_TRUE, 0, resultCPU.size() * sizeof(double), &resultCPU[0]);

    cout << "Filtro aplicado" << endl;

    Image resultMatrix(3, Matrix(newImageHeight, Array(newImageWidth)));

    for (int d = 0; d < 3; d++)
    {
        for (int i = 0; i < newImageHeight; i++)
        {
            for (int j = 0; j < newImageWidth; j++)
            {
                resultMatrix[d][i][j] = resultCPU[d * newImageHeight * newImageWidth + i * newImageWidth + j];
            }
        }
    }

    cout << "Guardando imagen..." << endl;
    saveImage(resultMatrix, "FinalImage.png");
    cout << "Trabajo Finalizado" << endl;

    auto t2 = std::chrono::high_resolution_clock::now();

    auto duration = std::chrono::duration_cast<std::chrono::milliseconds>(t2 - t1).count();
    std::cout << "Tiempo de ejecucion: " << (float) (duration / 1000.0) << " sec" << std::endl;

    return 0;
}
