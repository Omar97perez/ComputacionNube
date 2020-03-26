#include <iostream>
#include <vector>
#include <assert.h>
#include <cmath>
#include <png++/png.hpp>
#include "mpi.h"
#include "stdio.h"
#include "string.h"
#include <string>
#include <sstream>
#include <chrono>

using namespace std;

typedef vector<double> Array;
typedef vector<Array> Matrix;
typedef vector<Matrix> Image;

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

// Funcion que nos permite cargar la imagen.
Image loadImage(string filename)
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

// Funcion que nos permite guardar la Imagen Final.
void saveImage(Image &image, string filename)
{
    assert(image.size() == 3);

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

// Funcin que aplica un filtro dado un un tamaño inicial y final. Además, solo devuelve ese trozo calculado.
Image applyFilter(Image &image, Matrix &filter, int initHeight, int recvFinalHeight)
{
    assert(image.size() == 3 && filter.size() != 0);

    int heightFinal = recvFinalHeight - initHeight;

    int height = image[0].size();
    int width = image[0][0].size();
    int filterHeight = filter.size();
    int filterWidth = filter[0].size();
    int newImageHeight = height - filterHeight + 1;
    int newImageWidth = width - filterWidth + 1;

    Image newImage(3, Matrix(heightFinal, Array(newImageWidth)));

    int x = 0;

    for (int d = 0; d < 3; d++)
    {
        for (int i = initHeight; i < recvFinalHeight; i++)
        {
            for (int j = 0; j < newImageWidth; j++)
            {
                for (int h = i; h < i + filterHeight; h++)
                {
                    for (int w = j; w < j + filterWidth; w++)
                    {
                        newImage[d][x][j] += filter[h - i][w - j] * image[d][h][w];
                    }
                }
            }
            x++;
        }
        x = 0;
    }

    return newImage;
}

// Funcion que nos permite unificar dos imagenes
Image joinImage(Image &image1, Image &image2)
{

    assert(image1.size() == 3);
    assert(image2.size() == 3);

    int height = image1[0].size() + image2[0].size();
    int width = image1[0][0].size();

    Image newImage(3, Matrix(height, Array(width)));

    for (int d = 0; d < 3; d++)
    {
        for (int i = 0; i < height; i++)
        {
            for (int j = 0; j < width; j++)
            {
                if (i < image1[0].size())
                {
                    newImage[d][i][j] += image1[d][i][j];
                }
                else
                {
                    newImage[d][i][j] += image2[d][i - image1[0].size()][j];
                }
            }
        }
    }

    return newImage;
}

int main(int argc, char **argv)
{
    int rank, size, tag, rc;
    MPI_Status status;
    char message[20];

    auto t1 = std::chrono::high_resolution_clock::now();

    // Inicializa la estructura de comunicación de MPI entre los procesos.
    rc = MPI_Init(&argc, &argv);
    // Determina el tamaño del grupo asociado con un comunicador
    rc = MPI_Comm_size(MPI_COMM_WORLD, &size);
    // Determina el rango (identificador) del proceso que lo llama dentro del comunicador seleccionado.
    rc = MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    tag = 100;

    // Calculamos los valores del filtro deseado
    Matrix filter = getGaussian(10, 10, 50.0);

    // Cargamos la iamagen
    Image image = loadImage(argv[1]);

    // Calculamos los valores necesarios para poder aplicart el filtrado
    int height = image[0].size();
    int width = image[0][0].size();
    int filterHeight = filter.size();
    int filterWidth = filter[0].size();
    int newImageHeight = height - filterHeight + 1;
    int newImageWidth = width - filterWidth + 1;
    int newImageHeightNode = newImageHeight / size;

    if (rank == 0)
    {
        //Mostramos los valores del filtrado
        cout << endl;
        cout << "--- Información de la Imagen---" << endl;
        cout << "height: " << height << endl;
        cout << "width: " << width << endl;
        cout << "filterHeight: " << filterHeight << endl;
        cout << "filterWidth: " << filterWidth << endl;
        cout << "newImageHeight: " << newImageHeight << endl;
        cout << "newImageWidth: " << newImageWidth << endl;
        cout << "newImageHeightNode: " << newImageHeightNode << endl;
        cout << endl;

        cout << "Cargando..." << endl;

        for (int i = 1; i < size; i++)
        {
            // Enviar un mensaje a otro proceso
            rc = MPI_Send(&image.data(), height * width * 3, MPI_BYTE, i, tag, MPI_COMM_WORLD);
        }

        Image newImage = applyFilter(image, filter, 0, newImageHeightNode);
        saveImage(newImage, "./src/0.png");
    }
    else
    {
        // Generamos el nombre del fichero 
        stringstream ss;
        ss << rank;
        string str = ss.str();
        string ficheroEnviar = "./src/" + str + ".png";

        int elemento = rank + 1;
        int recvFinalHeight = newImageHeightNode * elemento;
        // Calculamos el valores Iniciales del proceso Actual
        int recvInitHeight = (recvFinalHeight - (recvFinalHeight / (rank + 1))) + 1;

        rc = MPI_Recv(image, height * width * 3, MPI_BYTE, 0, tag, MPI_COMM_WORLD, &status);

        Image newImage = applyFilter(&image, filter, recvInitHeight, recvFinalHeight);
        saveImage(newImage, ficheroEnviar);
    }

    // Cuando todos los proce4sos han acabado
    MPI_Barrier(MPI_COMM_WORLD);
    if (rank == 0)
    {
        // Inicializamos el valor al primer fichero
        string ficheroEnviar = "./src/0.png";
        Image imageFinal = loadImage(ficheroEnviar.data());
        for (int i = 1; i < size; i++)
        {
            stringstream ss;
            ss << i;
            string str = ss.str();
            ficheroEnviar = "./src/" + str + ".png";

            // Cargamos la sección de la imagen
            Image image = loadImage(ficheroEnviar);
            // Unimos las imagenes
            imageFinal = joinImage(imageFinal, image);
        }

        // Guardamos la imagen final
        saveImage(imageFinal, "imageFinal.png");

        auto t2 = std::chrono::high_resolution_clock::now();

        auto duration = std::chrono::duration_cast<std::chrono::seconds>(t2 - t1).count();

        // Imprimimos el valor del tiempo de ejecución
        cout << "Tiempo de ejecución " << duration << " sec" << endl;
    }

    // Finaliza la comunicación paralela entre los procesos
    rc = MPI_Finalize();
}
