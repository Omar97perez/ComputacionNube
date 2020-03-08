#include <stdio.h>
#include "mpi.h"

int main(int  argc, char **argv)
{

    int rank, size;
    int  namelen;
    char processor_name[MPI_MAX_PROCESSOR_NAME];

	// Inicializa la estructura de comunicación de MPI entre los procesos.
    MPI_Init( &argc, &argv );
    // Determina el tamaño del grupo asociado con un comunicador
    MPI_Comm_size( MPI_COMM_WORLD, &size );
    // Determina el rango (identificador) del proceso que lo llama dentro del comunicador seleccionado.
    MPI_Comm_rank( MPI_COMM_WORLD, &rank );
    // Obtiene el nombre del proceso
    MPI_Get_processor_name(processor_name, &namelen);

	// Imprime el mensaje del procesos en cuestión
    printf( "Hello world from process %d of %d in %s\n", rank, size, processor_name );

    // Finaliza la comunicación paralela entre los procesos
    MPI_Finalize();
}


