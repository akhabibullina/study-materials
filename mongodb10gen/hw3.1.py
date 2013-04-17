import pymongo
import sys
from pymongo import Connection
#connect to database
connection = Connection("localhost", 27017)

# get a handle to the school database
db=connection.school
students = db.students

try:
        cursor = students.find()

except:
        print "Unexpected error:", sys.exc_info()[0]

id = -1

tmp = []
for doc in cursor:
	if doc['_id'] != id:
		id = doc['_id']
		scores = doc["scores"]
		for score in scores:
			if score["type"] == "homework":
				tmp.append(score["score"])

		#print 'min:', min(tmp)
		i = 0
		for score in scores:
			print 'score', score["score"]
			print 'min', min(tmp)
			if score["score"] == min(tmp):
				print 'Deleting score', score
				del doc["scores"][i]
			i = i + 1
		students.save(doc);
		tmp = []
#print grades.count()