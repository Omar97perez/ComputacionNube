#include <stdio.h>
#include <string.h>
#include "mpi.h"
int main(int argc, char **argv)
{
  int rank, size, tag, rc, i;
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
    for(i = 1; i < size; i++)
    {
      //El maestro espera por el mensaje de los nodos hijos
      rc = MPI_Recv(message, 13, MPI_CHAR, i, tag, MPI_COMM_WORLD, &status);
      printf( "Mensaje Recibido Desde: %d\n", i);
    } 
  }
  else {
    strcpy(message, "Hello, world");
    // Cada nodo hijo envía al maestro 
    rc = MPI_Send(message, 13, MPI_CHAR, 0, tag, MPI_COMM_WORLD);
    printf( "Mensaje Enviado por %d\n", rank);
  } 

  // Finaliza la comunicación paralela entre los procesos
  rc = MPI_Finalize();
}


