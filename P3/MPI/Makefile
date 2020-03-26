all: 
	mpic++ -o mpi_Old_version main.cpp -lpng
	mpic++ -o mpi_Final_version main_final_version.cpp -lpng

old:
	mpic++ -o mpi_Old_version main.cpp -lpng

new: 
	mpic++ -o mpi_Final_version main_final_version.cpp -lpng
	
runOld:
	mpiexec -np 4 mpi_Old_version image.png

runFinal:
	mpiexec -np 4 mpi_Final_version image.png