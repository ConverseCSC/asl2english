#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
#  asl2englishprogram.py
#  
#  Copyright 2019 ABTurner002 <ABTurner002@KUH-LAB-12>
#  
#  This program is free software; you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation; either version 2 of the License, or
#  (at your option) any later version.
#  
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#  
#  You should have received a copy of the GNU General Public License
#  along with this program; if not, write to the Free Software
#  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
#  MA 02110-1301, USA.
#  
#  

#Code from http://www.sqlitetutorial.net/sqlite-python/insert/ and http://www.sqlitetutorial.net/sqlite-python/creating-database/

import sqlite3
import json
from sqlite3 import Error
 
with open('asl2english-master\\data.json') as json_file:  
    data = json.load(json_file)
    for p in data['handshapes']:
        print('Handshape: ')
        if p == "null":
            print(p)
        else:
            print('id: ' + str(p['id']))
            print('shape: ' + p['shape'])
            print('group: ' + p['group'])
            print('img: ' + p['img'])
            print('')
    for p in data['shapegroups']:
        print('Shapegroup: ')
        print(str(p))
        print('')


    """print frontregions DICT img, width, height, regions"""
    """print sideregions DICT, img, width, height, regions"""
    print(json.dumps('sideregions'))


        
def create_connection(dbfile):
    """ create a database connection to a SQLite database for asl2english """
    try:
        conn = sqlite3.connect(dbfile)
        print(conn)
        print(sqlite3.version)
    except Error as e:
        print(e)
        
    return conn

 
def main():
    try:
        conn = create_connection("asl2english-master\\asl2english.sqlite")
    finally:
        conn.close()
    
    
    return 0

if __name__ == '__main__':
    main()
    
 #SELECT
# *
#FROM
 #projects;
 
 
