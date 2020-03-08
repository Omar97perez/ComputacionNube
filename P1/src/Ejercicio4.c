#include <stdio.h>
#include <string.h>
#include "mpi.h"
int main(int argc, char **argv)
{
  int rank, size, tag, rc, i, anterior, posterior;
  MPI_Status status;
  char message[20];

	// Inicializa la estructura de comunicación de MPI entre los procesos.
  rc = MPI_Init(&argc, &argv);
  // Determina el tamaño del grupo asociado con un comunicador
  rc = MPI_Comm_size(MPI_COMM_WORLD, &size);
  // Determina el rango (identificador) del proceso que lo llama dentro del comunicador seleccionado.
  rc = MPI_Comm_rank(MPI_COMM_WORLD, &rank);
  tag = 100;
	  
  if(rank == 0) {
      printf( "Mensaje Enviado Desde el 0 a 1\n");
      //Envía el mensaje al siguiente proceso (1 por defecto)
      rc = MPI_Send(message, 13, MPI_CHAR, 1, tag, MPI_COMM_WORLD);
      
      // Recibe el mensaje del proceso "Size - 1"
      rc = MPI_Recv(message, 13, MPI_CHAR, size - 1, tag, MPI_COMM_WORLD, &status);
      printf( "Mensaje Recibido Desde el 0\n");
  }
  else {
    strcpy(message, "Hello, world");
    anterior = rank - 1;
    // Recibe el mensaje del proceso anterior
    rc = MPI_Recv(message, 13, MPI_CHAR, anterior, tag, MPI_COMM_WORLD, &status);
    printf( "Mensaje Recibido por %d\n", rank);

    if(rank + 1 == size)
    {
      posterior = 0;
    } 
    else
    {
      posterior = rank + 1;
    }

    // Envía el mensaje al proceso siguiente
    rc = MPI_Send(message, 13, MPI_CHAR, posterior, tag, MPI_COMM_WORLD);
    printf( "Mensaje Enviado por %d a %d\n", rank, posterior);
  } 
  rc = MPI_Finalize();
}



