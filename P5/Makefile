runMPI:
	mpiexec -np 4 ./Metodos/MPI/mpi_Final_version ./img/Original/$(img) $(height) $(width) $(img)

runOpenMP:
	./Metodos/OpenMP/OpenMP_version ./img/Original/$(img) 4 $(img)

runSecuencial:
	./Metodos/Secuencial/a.out ./img/Original/$(img) $(img)