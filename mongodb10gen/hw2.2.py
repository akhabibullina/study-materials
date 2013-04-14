import pymongo
import sys
from pymongo import Connection
#connect to database
connection = Connection("localhost", 27017)

# get a handle to the school database
db=connection.students
grades = db.grades

try:
        cursor = grades.find({'type': 'homework'}).sort([('student_id', pymongo.ASCENDING),('score', pymongo.ASCENDING)])

except:
        print "Unexpected error:", sys.exc_info()[0]

id = -1

for doc in cursor:
	#print 'student_id: '+str(doc['student_id'])
	if (doc['student_id'] != id) :
		#print id
		id = doc['student_id']
		grades.remove({'_id': doc['_id']})
		#print doc

print grades.count()