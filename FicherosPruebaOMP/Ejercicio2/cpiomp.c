#include "omp.h"
#include <stdio.h>
#include <math.h>

double f(a)
double a;
{
    return (4.0 / (1.0 + a*a));
}

int main(int argc, char *argv[]) {
    int  n, i;
    double PI25DT = 3.141592653589793238462643;
    double pi, h, sum, x;

        n = 100;
        h   = 1.0 / (double) n;
        sum = 0.0;
#pragma omp parallel for reduction(+:pi) private(x, i)
        for (i = 1; i <= n; i ++) {
            x = h * ((double)i - 0.5);
            pi += f(x);
        }
        pi = h * pi;
	printf("\nPI = %.16f\n", pi);
}

            
