#pragma OPENCL EXTENSION cl_khr_fp64 : enable

kernel void applyFilter(global double *image, global double *filter, 
                        global double *newImage, int height, int width, 
                        int filterHeight, int filterWidth)
{
    int newImageHeight = height - filterHeight + 1;
    int newImageWidth = width - filterWidth + 1;
    int d, j, h, w;

    int i = get_global_id(0);

    for ( d = 0; d < 3; d++)
    {
        for (j = 0; j < newImageWidth; j++)
        {
            float sum = 0, val = 0;
            for (h = i; h < i + filterHeight; h++)
            {
                for (w = j; w < j + filterWidth; w++)
                {
                    float weight = filter[ (h - i) * filterWidth + (w - j)];
                    val += image[d * height * width + h * width + w] * weight;
                    sum += weight;
                }

                newImage[d * newImageHeight * newImageWidth + i * newImageWidth + j] = round(val / sum);
            }
        }
    }
}



