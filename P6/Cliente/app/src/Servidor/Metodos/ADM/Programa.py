#-*- coding: utf-8-*-
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
import sys
import StrategyGraph as st
import StrategyFile as sf
import string 
import os
import geopandas as gpd

pedirParametros = int(sys.argv[2]) 

#Cargamos los datos de un fichero csv
file = sys.argv[1] 
fichero = os.path.splitext(file)
fichero = fichero[0] + ".csv"
nombreFichero = ""

if file.endswith('.csv'):
    fileSelected = sf.Csv(file, fichero)
    df = fileSelected.collect()
elif file.endswith('.json'):
    fileSelected= sf.Json(file, fichero)
    df = fileSelected.collect()
elif file.endswith('.xlsx'):
    fileSelected= sf.Xlsx(file, fichero)
    df = fileSelected.collect()
elif file.endswith('.geojson'):
    map_data = gpd.read_file(file)
else:
    print("Formato no soportado")
    sys.exit()

if(pedirParametros == 1):
    # Pedimos los parámetros que nos van a hacer falta
    tipoGrafica = int(input('Indique que gráfica desea ver:\n\t 1. Gráfica de Líneas.\n\t 2. Gráfica de Barras.\n\t 3. Gráfica de puntos.\n\t 4. Gráfico Circular.\n\t 5. Gráfico de Escaleras.\n\t 6. Gráfico de Dispersión. \n\t 7. Poligono de Frecuencia.\n\t 8. Histograma Único. \n\t 9. Histograma Mútiple.  \n\t 10. Histograma (Seaborn). \n\t 11. Cajas y Bigotes (Matplotlin). \n\t 12. Cajas y Bigotes (Seaborn). \n\t 13. Violín.  \n\t 14. Mapa Geofráfico. \n\t 15. Resumen.\n > '))
    if tipoGrafica != 14:
        print("Los valores a seleccionar para los ejes son:\n")
        print(list(df.columns))
        if tipoGrafica != 1:
            elementoX = int(input('\nIndique el valor numérico del eje X\n > '))
            elementoY = int(input('Indique el valor numérico del eje Y\n > '))
        else:
            elementoX = input('Indique los valores del eje X a representar separados por comas.\n > ')
        if tipoGrafica != 10:
            elementoAgrupar = input('Indique el elemento por el que desea agrupar. Si no desea agrupar clicke enter \n > ')
        else:
            elementoAgrupar = "\n"
        if elementoAgrupar and tipoGrafica != 10:
            tipoRepresentacion = int(input('En caso de colisión de datos similares al agrupar ¿Que desea hacer?:\n\t 1. Suma. \n\t 2. Máximo. \n\t 3. Mínimo. \n\t 4. Ninguno. \n  > '))
        else:
            tipoRepresentacion = 4
        elementoFiltrar = input('Indique el elemento por el que desea filtrar. Si no desea filtrar clicke enter \n > ')
        if elementoFiltrar:
            elementoRepresentar = input('Indique los valores a representar separados por comas. Si desea todos escriba "Todos" o "T". \n > ')
        else:
            elementoRepresentar = "T"
        nombreFichero = ""
    else:
        elementoX = input('\nIndique el nombre de la columna con valor numérico a representar\n > ')

else:
    # Pedimos los parámetros que nos van a hacer falta
    tipoGrafica = int(sys.argv[3]) 
    elementoX = sys.argv[4]
    elementoY = int(sys.argv[5]) 
    elementoAgrupar = int(sys.argv[6]) 
    tipoRepresentacion = int(sys.argv[7]) 
    elementoFiltrar = int(sys.argv[8])
    elementoRepresentar = sys.argv[9]
    nombreFichero = sys.argv[10]

if tipoGrafica != 14:
    if tipoGrafica != 1:
        nombreElementoX = df.columns[elementoX]
        nombreElementoY = df.columns[elementoY]

    # Filtramos por las columnas indicadas anteriormente (si procede)
    if(elementoRepresentar != "Todos" and elementoRepresentar != "T"):
        elementoFiltrar = df.columns[int(elementoFiltrar)]
        elementosEjeX = elementoRepresentar.split(",")
        elementosEjeX = df[elementoFiltrar].isin(elementosEjeX)
        df = df[elementosEjeX]

    # Agrupamos los valores por una columna específica (pasada por linea de comandos)
    if tipoRepresentacion != 4:
        elementoAgrupar = df.columns[int(elementoAgrupar)]
        if tipoRepresentacion == 1:
            df = df.groupby(elementoAgrupar, as_index=False).sum()
        elif tipoRepresentacion == 2:
            df = df.groupby(elementoAgrupar, as_index=False).max()
        elif tipoRepresentacion == 3:
            df = df.groupby(elementoAgrupar, as_index=False).min()

    # Cogemos las columnas necesarias para las gráficas (pasadas por parámetro)
    if tipoGrafica != 1:
        X = df.loc[:,nombreElementoX]
        Y = df.loc[:,nombreElementoY]

# Representamos los valores
if tipoGrafica == 1:
    graficaFinal= st.Lineas("","","","",nombreFichero)
    graficaFinal.grafica(elementoX.split(","), elementoFiltrar, df)
elif tipoGrafica == 2:
    graficaFinal= st.Barras(X,Y,nombreElementoX,nombreElementoY,nombreFichero)
    graficaFinal.grafica()
elif tipoGrafica == 3:
    graficaFinal= st.Puntos(X,Y,nombreElementoX,nombreElementoY,nombreFichero)
    graficaFinal.grafica()
elif tipoGrafica == 4:
    graficaFinal= st.Circular(X,Y,nombreElementoX,nombreElementoY,nombreFichero)
    graficaFinal.grafica()
elif tipoGrafica == 5:
    graficaFinal= st.Escalera(X,Y,nombreElementoX,nombreElementoY,nombreFichero)
    graficaFinal.grafica()
elif tipoGrafica == 6:
    graficaFinal= st.DiagramaDispersion(X,Y,nombreElementoX,nombreElementoY,nombreFichero)
    graficaFinal.grafica()
elif tipoGrafica == 7:
    graficaFinal= st.PoligonoFrecuencia(X,Y,nombreElementoX,nombreElementoY,nombreFichero)
    graficaFinal.grafica()
elif tipoGrafica == 8:
    graficaFinal= st.HistogramaUnico(X,Y,nombreElementoX,nombreElementoY,nombreFichero)
    graficaFinal.grafica(df)
elif tipoGrafica == 9:
    graficaFinal= st.HistogramaMultiple(X,Y,nombreElementoX,nombreElementoY,nombreFichero)
    graficaFinal.grafica(df)
elif tipoGrafica == 10:
    graficaFinal= st.HistogramaSeaborn(X,Y,nombreElementoX,nombreElementoY,nombreFichero)
    graficaFinal.grafica(df)
elif tipoGrafica == 11:
    graficaFinal= st.Cajas(X,Y,nombreElementoX,nombreElementoY,nombreFichero)
    graficaFinal.grafica(df)
elif tipoGrafica == 12:
    graficaFinal= st.CajasSeaborn(X,Y,nombreElementoX,nombreElementoY,nombreFichero)
    graficaFinal.grafica(df)
elif tipoGrafica == 13:
    graficaFinal= st.ViolinSeaborn(X,Y,nombreElementoX,nombreElementoY,nombreFichero)
    graficaFinal.grafica(df)
elif tipoGrafica == 14:
    graficaFinal= st.GeographicMap("X","X",elementoX,"X",nombreFichero)
    graficaFinal.grafica(map_data)
else:
    graficaFinal= st.Resumen(X,Y,nombreElementoX,nombreElementoY,nombreFichero)
    graficaFinal.grafica()