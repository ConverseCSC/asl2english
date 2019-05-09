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

def readData(): 
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
        #print(data['frontregions'])
        """print sideregions DICT, img, width, height, regions"""
        #print(data['sideregions']) #json.dumps('sideregions')
        return data
    
def makeSQL(data):
    sql = ''
    for p in data['handshapes']:
        if p != "null":
            #print(p)
            insert = 'insert into HandShape (shape, group, img) values ' \
                + "('{0}', '{1}', '{2}');".format(p['shape'],
                                                p['group'], p['img'])
            print(insert)
            sql += insert


    for name in data['frontregions']['regions']:
        image = data['frontregions']['image']
        #print('\n', name, data['frontregions']['regions'][name])
        p = data['frontregions']['regions'][name]
        #print(p)
        if p['elt'] == 'polygon':
            if len(p['xyz']) == 3:
                insert = 'insert into Regions (name, image, X, Y, Z, elt, pts) values '
                insert += "('{0}', '{1}', {2:.1f}, {3:.1f}, {4:.1f}, 'polygon', '{5}');".format(
                            name, image, p['xyz'][0], p['xyz'][1], p['xyz'][2], 
                            p['points'])
            else:
                insert = 'insert into Regions (name, image, X, Y, elt, pts) values '
                insert += "('{0}', '{1}', {2:.1f}, {3:.1f}, 'polygon', '{4}');".format(
                            name, image, p['xyz'][0], p['xyz'][1], p['points'])
        elif p['elt'] == 'ellipse':
            if len(p['xyz']) == 3:
                insert = 'insert into Regions (name, image, X, Y, Z, elt, cx, cy, rx, ry) values '
                insert += "('{0}', '{1}', {2:.1f}, {3:.1f}, {4:.1f}, 'ellipse', {5:d}, {6:d}, {7:d}, {8:d});".format(
                            name, image, p['xyz'][0], p['xyz'][1], p['xyz'][2], 
                            p['c'][0], p['c'][1], p['r'][0], p['r'][1])
            else:
                insert = 'insert into Regions (name, image, X, Y, elt, cx, cy, rx, ry) values '
                insert += "('{0}', '{1}', {2:.1f}, {3:.1f}, 'ellipse', {4:d}, {5:d}, {6:d}, {7:d});".format(
                            name, image, p['xyz'][0], p['xyz'][1], 
                            p['c'][0], p['c'][1], p['r'][0], p['r'][1])
        print(insert) 
        sql += insert

    for name in data['sideregions']['regions']:
        image = data['sideregions']['image']
        #print('\n', name, data['sideregions']['regions'][name])
        p = data['sideregions']['regions'][name]
        #print(p)
        if p['elt'] == 'polygon':
            if len(p['xyz']) == 3:
                insert = 'insert into Regions (name, image, X, Y, Z, elt, pts) values '
                insert += "('{0}', '{1}', {2:.1f}, {3:.1f}, {4:.1f}, 'polygon', '{5}');".format(
                            name, image, p['xyz'][0], p['xyz'][1], p['xyz'][2], 
                            p['points'])
            else:
                insert = 'insert into Regions (name, image, X, Y, elt, pts) values '
                insert += "('{0}', '{1}', {2:.1f}, {3:.1f}, 'polygon', '{4}');".format(
                            name, image, p['xyz'][0], p['xyz'][1], p['points'])
        elif p['elt'] == 'ellipse':
            if len(p['xyz']) == 3:
                insert = 'insert into Regions (name, image, X, Y, Z, elt, cx, cy, rx, ry) values '
                insert += "('{0}', '{1}', {2:.1f}, {3:.1f}, {4:.1f}, 'ellipse', {5:d}, {6:d}, {7:d}, {8:d});".format(
                            name, image, p['xyz'][0], p['xyz'][1], p['xyz'][2], 
                            p['c'][0], p['c'][1], p['r'][0], p['r'][1])
            else:
                insert = 'insert into Regions (name, image, X, Y, elt, cx, cy, rx, ry) values '
                insert += "('{0}', '{1}', {2:.1f}, {3:.1f}, 'ellipse', {4:d}, {5:d}, {6:d}, {7:d});".format(
                            name, image, p['xyz'][0], p['xyz'][1], 
                            p['c'][0], p['c'][1], p['r'][0], p['r'][1])
        print(insert) 
        sql += insert



    return sql




def create_connection(dbfile):
    """ create a database connection to a SQLite database for asl2english """
    try:
        conn = sqlite3.connect(dbfile)
        print(conn)
        print(sqlite3.version)
    except Error as e:
        print(e)
        
    return conn



#def create_Regions(conn, Regions):
#     sql = INSERT INTO Region(id, name, image, X, Y, Z, elt, pts, cx, cy, rx, ry)
#            VALUES(?,?,?)
#    cur = conn.cursor()
#    cur.execute(sql, Regions)
#    return cur.lastrowid

def main():
    data = readData()
    sqlStatements = makeSQL(data) # Result is a long list of INSERT statements
    try:
        conn = create_connection("asl2english-master\\asl2english.sqlite")
        cur = conn.cursor()
        cur.execute(sqlStatements)
    finally:
        conn.close()
    
    
    return 0

if __name__ == '__main__':
    main()
    
#~ SELECT
#~ *
#~ FROM
#~ Handshape;
 
#~ SELECT
#~ *
#~ FROM
#~ Regions;
 
