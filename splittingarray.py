import json
import urllib2

aslarray = urllib2.urlopen('ASLarray.js')

wjson = aslarray.read()
wjdata = json.loads(wjson)
print(wjdata['signs'][0])

