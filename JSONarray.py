# First, an array made up of dictionaries will be created
# Within that array will include the various signs and their javascript objects
# The data in that array will then be turned into an array of JSON objects
# The material in this file converts the dictionaries into JSON objects
# 

import json

from makearray2 import * 

def json_list(dict):
    lst = []
    for array in dict:
        d = {}
        d = array
        lst.append(d)
    
    return json.dump(lst, outfile)


with open('multivideosigns.json', 'w') as outfile:
    json_list(file_naming())
