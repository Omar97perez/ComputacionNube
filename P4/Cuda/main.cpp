#include <iostream>
#include <vector>
#include <assert.h>
#include <cmath>
#include <png++/png.hpp>

using namespace std;

typedef vector<double> Array;
typedef vector<Array> Matrix;
typedef vector<Matrix> Image;

__global__ Matrix getGaussian(int height, int width, double sigma)
{
    Matrix kernel(height, Array(width));
    double sum=0.0;
    int i,j;

    for (i=0 ; i<height ; i++) {
        for (j=0 ; j<width ; j++) {
            kernel[i][j] = exp(-(i*i+j*j)/(2*sigma*sigma))/(2*M_PI*sigma*sigma);
            sum += kernel[i][j];
        }
    }

    for (i=0 ; i<height ; i++) {
        for (j=0 ; j<width ; j++) {
            kernel[i][j] /= sum;
        }
    }

    return kernel;
}

__global__ Image loadImage(const char *filename)
{
    png::image<png::rgb_pixel> image(filename);
    Image imageMatrix(3, Matrix(image.get_height(), Array(image.get_width())));

    int h,w;
    for (h=0 ; h<image.get_height() ; h++) {
        for (w=0 ; w<image.get_width() ; w++) {
            imageMatrix[0][h][w] = image[h][w].red;
            imageMatrix[1][h][w] = image[h][w].green;
            imageMatrix[2][h][w] = image[h][w].blue;
        }
    }

    return imageMatrix;
}

__global__ void saveImage(Image &image, const char *filename)
{
    assert(image.size()==3);

    int height = image[0].size();
    int width = image[0][0].size();
    int x,y;

    png::image<png::rgb_pixel> imageFile(width, height);

    for (y=0 ; y<height ; y++) {
        for (x=0 ; x<width ; x++) {
            imageFile[y][x].red = image[0][y][x];
            imageFile[y][x].green = image[1][y][x];
            imageFile[y][x].blue = image[2][y][x];
        }
    }
    imageFile.write(filename);
}

__global__ Image applyFilter(Image &image, Matrix &filter){
    assert(image.size()==3 && filter.size()!=0);

    int height = image[0].size();
    int width = image[0][0].size();
    int filterHeight = filter.size();
    int filterWidth = filter[0].size();
    int newImageHeight = height-filterHeight+1;
    int newImageWidth = width-filterWidth+1;
    int d,i,j,h,w;

    Image newImage(3, Matrix(newImageHeight, Array(newImageWidth)));

    for (d=0 ; d<3 ; d++) {
        for (i=0 ; i<newImageHeight ; i++) {
            for (j=0 ; j<newImageWidth ; j++) {
                for (h=i ; h<i+filterHeight ; h++) {
                    for (w=j ; w<j+filterWidth ; w++) {
                        newImage[d][i][j] += filter[h-i][w-j]*image[d][h][w];
                    }
                }
            }
        }
    }

    return newImage;
}

int main(int agrc, char *argv[])
{
    Matrix filter = getGaussian(10, 10, 50.0);

    cout << "Cargando Imagen..." << endl;
    Image image = loadImage(argv[1]);
    cout << "Aplicando filtrado..." << endl;

   // FALTAAAAAAAA Preparar datos Cuda
    cudaMalloc(&src, image * sizeof(uchar));

   // FALTAAAAAAplicamos filtrado
    Image newImage = applyFilter<<<NOSE, NOSE>>>(image, filter);

    cout << "Guardando imagen..." << endl;
    saveImage(newImage, "modifyImage.png");
    cout << "Trabajo Finalizado" << endl;
}