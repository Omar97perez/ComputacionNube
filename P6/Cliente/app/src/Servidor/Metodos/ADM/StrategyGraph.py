#-*- coding: utf-8-*-
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
import geopandas as gpd

class Grafica:
    def __init__(self,X, Y, nombreElementoX, nombreElementoY, nombreFichero):
        self.X = X
        self.Y = Y
        self.nombreElementoX = nombreElementoX
        self.nombreElementoY = nombreElementoY
        self.nombreFichero = nombreFichero

class Lineas(Grafica):
  def grafica(self,elementoX, elementoFiltrar, df):
    colors = "bgrcmykw"
    color_index = 0
    for index, row in df.iterrows():
      plt.plot(row[elementoX],label=row[elementoFiltrar], c=colors[color_index], ls="-", lw="3")
      color_index += 1
    plt.xticks(range(len(elementoX)), elementoX)
    plt.legend()
    plt.suptitle('Gráfica de Líneas')
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

class Circular(Grafica):
  def grafica(self):
    plt.pie(self.Y, labels=self.X, autopct='%1.1f%%', shadow=True, startangle=90)
    plt.suptitle('Grafico Circular')
    if self.nombreFichero:
      plt.savefig(self.nombreFichero)
    else:
      plt.show()

class Escalera(Grafica):
  def grafica(self):
    plt.step(self.X, self.Y)
    plt.suptitle('Grafico de Escaleras')
    plt.xlabel(self.nombreElementoX)
    plt.ylabel(self.nombreElementoY)
    if self.nombreFichero:
      plt.savefig(self.nombreFichero)
    else:
      plt.show()

class DiagramaDispersion(Grafica):
  def grafica(self):
    plt.scatter(self.X, self.Y, s=np.pi*3, alpha=0.5)
    plt.title('Grafico de Dispersion')
    plt.xlabel(self.nombreElementoX)
    plt.ylabel(self.nombreElementoY)
    if self.nombreFichero:
      plt.savefig(self.nombreFichero)
    else:
      plt.show()

class PoligonoFrecuencia(Grafica):
  def grafica(self):
    fig = plt.figure()
    fig.suptitle('Poligono de Frecuencia')
    plt.plot(self.X, self.Y)
    plt.xlabel(self.nombreElementoX)
    plt.ylabel(self.nombreElementoY)
    if self.nombreFichero:
      plt.savefig(self.nombreFichero)
    else:
      plt.show()

class HistogramaUnico(Grafica):
  def grafica(self, df):
    fig = plt.figure()
    fig.suptitle('Histograma Unico')
    plt.ylabel(self.nombreElementoY)
    plt.hist(self.Y, density=True, bins=30, alpha=1, edgecolor = 'black',  linewidth=1)  
    if self.nombreFichero:
      plt.savefig(self.nombreFichero)
    else:
      plt.show()

class HistogramaMultiple(Grafica):
  def grafica(self, df):
    fig = plt.figure()
    fig.suptitle('Histograma')
    plt.xlabel(self.nombreElementoX)
    plt.ylabel(self.nombreElementoY)
    listFinal = list()
    listProvisional = list()
    elements = dict.fromkeys(self.X).keys()
    for element in elements:
      listProvisional.append(element)
      elementosEjeX = df[self.nombreElementoX].isin(listProvisional)
      listFinal.append(df[elementosEjeX].loc[:,self.nombreElementoY])
      listProvisional = list()
    plt.hist(listFinal, density=True, bins=30, label=elements)  
    plt.legend()
    if self.nombreFichero:
      plt.savefig(self.nombreFichero)
    else:
      plt.show()

class Cajas(Grafica):
  def grafica(self, df):
    fig = plt.figure()
    fig.suptitle('Cajas y Bigotes')
    plt.xlabel(self.nombreElementoX)
    plt.ylabel(self.nombreElementoY)
    listFinal = list()
    listProvisional = list()
    elements = dict.fromkeys(self.X).keys()
    for element in elements:
      listProvisional.append(element)
      elementosEjeX = df[self.nombreElementoX].isin(listProvisional)
      listFinal.append(df[elementosEjeX].loc[:,self.nombreElementoY])
      listProvisional = list()
    plt.boxplot(listFinal, notch=True, sym="o", labels=elements)
    if self.nombreFichero:
      plt.savefig(self.nombreFichero)
    else:
      plt.show()
    
class HistogramaSeaborn(Grafica):
  def grafica(self, df):
    sns.set()
    fig = plt.figure()
    fig.suptitle('Histograma')
    x = np.random.randn(100)
    sns.distplot(df.loc[:,self.nombreElementoY])
    if self.nombreFichero:
      plt.savefig(self.nombreFichero)
    else:
      plt.show()

class CajasSeaborn(Grafica):
  def grafica(self, df):
    sns.catplot(x = self.nombreElementoX, y = self.nombreElementoY, data=df, kind = "box").set(title = 'Diagrama de Cajas y Bigotes (Seaborn)')
    if self.nombreFichero:
      plt.savefig(self.nombreFichero)
    else:
      plt.show()

class ViolinSeaborn(Grafica):
  def grafica(self, df):
    fig = plt.figure()
    fig.suptitle('Gráfica de Violín')
    sns.violinplot(x = self.nombreElementoX, y = self.nombreElementoY, data=df)
    if self.nombreFichero:
      plt.savefig(self.nombreFichero)
    else:
      plt.show()
  
class GeographicMap(Grafica):
  def grafica(self, map_data):

    fig, ax = plt.subplots(1, 1, figsize=(10, 10))
    
    # Control del encuadre (área geográfica) del mapa
    ax.axis([-20, 5, 26, 46])
    
    # Control del título y los ejes
    ax.set_title('Mapas Geográficos', pad = 20, fontdict={'fontsize':20, 'color': '#4873ab'})
    ax.set_xlabel('Longitud')
    ax.set_ylabel('Latitud')
    
    # Añadir la leyenda separada del mapa
    from mpl_toolkits.axes_grid1 import make_axes_locatable
    divider = make_axes_locatable(ax)
    cax = divider.append_axes("right", size="5%", pad=0.2)
    
    # Generar y cargar el mapa
    map_data.plot(column=self.nombreElementoX, cmap='plasma', ax=ax,legend=True, cax=cax, zorder=5)
    
    # # Cargar un mapa base con contornos de países
    oceanos = "../../Archivos/ne_50m_ocean.shp"
    map_oceanos = gpd.read_file(oceanos)
    map_oceanos.plot(ax=ax, color='#89c0e8', zorder=0)

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