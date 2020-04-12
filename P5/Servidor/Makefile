runMPI:
	mpiexec --allow-run-as-root -np 4 ./Metodos/MPI/mpi_Final_version ./img/Original/$(img) $(height) $(width) $(img) 

runOpenMP:
	./Metodos/OpenMP/OpenMP_version ./img/Original/$(img) 4 $(img)

runSecuencial:
	./Metodos/Secuencial/a.out ./img/Original/$(img) $(img)

runGraficas:
	python ./Metodos/Graficas/Programa.py ./HojaCalculo/Original/$(dataEntry) 0 $(elementoX) $(elementoY) $(tipoRepresentacion) $(tipoGrafica) $(dataExit)