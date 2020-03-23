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

// Funcion que nos permite cargar la imagen
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

// Funcion que nos permite guardar la Imagen Final
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

// Funcin que aplica un filtro dado un un tamaño inicial y final
Image applyFilter(Image &image, Matrix &filter, int initHeight, int recvFinalHeight)
{
    assert(image.size() == 3 && filter.size() != 0);

    int height = image[0].size();
    int width = image[0][0].size();
    int filterHeight = filter.size();
    int filterWidth = filter[0].size();
    int newImageHeight = height - filterHeight + 1;
    int newImageWidth = width - filterWidth + 1;

    Image newImage(3, Matrix(newImageHeight, Array(newImageWidth)));

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
                        newImage[d][i][j] += filter[h - i][w - j] * image[d][h][w];
                    }
                }
            }
        }
    }

    return newImage;
}

// Funcion que nos permite cargar la imagen
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

    if (rank == 0)
    {
        strcpy(message, "Hello, world");
        cout << "El nodo principal empieza a enviar la informacion" << endl;

        Matrix filter = getGaussian(10, 10, 50.0);
        cout << "Cargando Imagen..." << endl;
        Image image = loadImage(argv[1]);

        int height = image[0].size();
        int width = image[0][0].size();
        int filterHeight = filter.size();
        int filterWidth = filter[0].size();
        int newImageHeight = height - filterHeight + 1;
        int newImageWidth = width - filterWidth + 1;
        int newImageHeightNode = newImageHeight / (size - 1);

        cout << endl;
        cout << "--- Informacion Imagen---" << endl;
        cout << "height: " << height << endl;
        cout << "width: " << width << endl;
        cout << "filterHeight: " << filterHeight << endl;
        cout << "filterWidth: " << filterWidth << endl;
        cout << "newImageHeight: " << newImageHeight << endl;
        cout << "newImageWidth: " << newImageWidth << endl;
        cout << "newImageHeightNode: " << newImageHeightNode << endl;
        cout << endl;

        for (int i = 1; i < size; i++)
        {
            int sendFinalHeight = newImageHeightNode * i;
            // Enviar un mensaje a otro proceso
            rc = MPI_Send(&sendFinalHeight, 13, MPI_INT, i, tag, MPI_COMM_WORLD);
        }

        // for (int i = 1; i < size; i++) {
        //   Image newImageRecv;
        //   rc = MPI_Recv(&newImageRecv, 13, MPI_BYTE, i, tag, MPI_COMM_WORLD, &status);
        //   cout << "---------------------------------------------------------------" << endl;
        //   cout << "Nodo: " << i << endl;
        //   image = joinImage(image, newImageRecv);
        //   saveImage(image, "FinalImage.png");
        // }

        // Prueba envio imagen fallida
        //  for (int i = 1; i < size; i++) {
        //   Image image;
        //   rc = MPI_Recv(&image, 1200*630*50, MPI_LONG_DOUBLE, i, tag, MPI_COMM_WORLD, &status);
        //   cout << "Recibiendo del Nodo: " << endl;
        // }
    }
    else
    {
        int recvFinalHeight = 0;

        stringstream ss;
        ss << rank;
        string str = ss.str();
        string ficheroEnviar = "./src/" + str + ".png";

        //Recibir un mensaje de otro proceso
        rc = MPI_Recv(&recvFinalHeight, 13, MPI_INT, 0, tag, MPI_COMM_WORLD, &status);

        int recvInitHeight = recvFinalHeight - (recvFinalHeight / rank);
        cout << "El nodo " << rank << " ha recibido como inicial " << recvInitHeight << " y como final " << recvFinalHeight << endl;

        Matrix filter = getGaussian(10, 10, 50.0);

        cout << "Loading image..." << endl;
        Image image = loadImage(argv[1]);
        cout << "Applying filter..." << endl;
        Image newImage = applyFilter(image, filter, recvInitHeight, recvFinalHeight);
        cout << "Saving image..." << endl;
        saveImage(newImage, ficheroEnviar);
        cout << "Done!" << endl;

        //  Prueba Envio de imagen
        cout << "Se esta enviando Nodo: " << rank << endl;
        rc = MPI_Send(&newImage, 13, MPI_BYTE, 0, tag, MPI_COMM_WORLD);
        cout << "Se envio en teoria" << endl;

        // // Prueba envio imagen fallida
        //   Image image = loadImage(argv[1]);
        //   cout << "Se esta enviando Nodo: " << rank << endl;
        //   rc = MPI_Send(&image, 1200*630*50,  MPI_LONG_DOUBLE, 0, tag, MPI_COMM_WORLD);
    }

    //Prueba union de imagenes
    MPI_Barrier(MPI_COMM_WORLD);
    if (rank == 0)
    {
        string ficheroEnviar = "./src/1.png";
        Image imageFinal = loadImage(ficheroEnviar.data());
        for (int i = 2; i < size; i++)
        {
            stringstream ss;
            ss << i;
            string str = ss.str();
            ficheroEnviar = "./src/" + str + ".png";

            cout << "Fichero : " << ficheroEnviar << " " << i << std::endl;

            Image image = loadImage(ficheroEnviar);
            imageFinal = joinImage(imageFinal, image);
        }
        saveImage(imageFinal, "imageFinal.png");
    }

    auto t2 = std::chrono::high_resolution_clock::now();

    auto duration = std::chrono::duration_cast<std::chrono::seconds>(t2 - t1).count();

    cout << "Tiempo de ejecuccion " << duration << " sec" << endl;

    // Finaliza la comunicación paralela entre los procesos
    rc = MPI_Finalize();
}