from pyspark import SparkContext
from pyspark.streaming import StreamingContext


def functionToCreateContext():
    sc = SparkContext("local[2]", "Boats")
    ssc = StreamingContext(sc, 5)
    ssc.checkpoint("./Buques/Benchijigua") 
    return ssc

ssc = StreamingContext.getOrCreate(checkpointPath = "./Buques/Benchijigua", setupFunc = functionToCreateContext)
lines = ssc.socketTextStream("localhost", 9999)
lines.pprint()

ssc.start()             
ssc.awaitTermination()  