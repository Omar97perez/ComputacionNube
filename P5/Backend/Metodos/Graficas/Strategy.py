import matplotlib.pyplot as plt

class Grafica:
    def __init__(self,X, Y, nombreElementoX, nombreElementoY, nombreFichero):
        self.X = X
        self.Y = Y
        self.nombreElementoX = nombreElementoX
        self.nombreElementoY = nombreElementoY
        self.nombreFichero = nombreFichero

class Lineas(Grafica):
  def grafica(self):
    fig = plt.figure()
    fig.suptitle('Grafico de lineas')
    plt.plot(self.X, self.Y)
    plt.xlabel(self.nombreElementoX)
    plt.ylabel(self.nombreElementoY)
    if self.nombreFichero:
      plt.savefig(self.nombreFichero)
    else:
      plt.show()

class Barras(Grafica):
  def grafica(self):
    plt.suptitle('Diagrama de Barras')
    plt.plot(131)
    plt.bar(self.X, self.Y)
    plt.xlabel(self.nombreElementoX)
    plt.ylabel(self.nombreElementoY)
    if self.nombreFichero:
      plt.savefig(self.nombreFichero)
    else:
      plt.show()

class Puntos(Grafica):
  def grafica(self):
    plt.suptitle('Grafico de Puntos')
    plt.scatter(self.X, self.Y)
    plt.xlabel(self.nombreElementoX)
    plt.ylabel(self.nombreElementoY)
    if self.nombreFichero:
      plt.savefig(self.nombreFichero)
    else:
      plt.show()

class Resumen(Grafica):
  def grafica(self):
    plt.figure(figsize=(9, 3))
    plt.subplot(131)
    plt.bar(self.X, self.Y)
    plt.subplot(132)
    plt.scatter(self.X, self.Y)
    plt.subplot(133)
    plt.plot(self.X, self.Y)
    plt.suptitle('Resumen')
    if self.nombreFichero:
      plt.savefig(self.nombreFichero)
    else:
      plt.show()