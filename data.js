// Defined in this file:
/* global handshapes */
/* global shapegroups */
/* global sideregions */
/* global frontregions */
/* global signs */
/* global shape_dist_overrides */

// shapegroups is an array of arrays.  Each subarray defines a group of
// semantically similar handshapes.  The numbers in each subarray are
// handshape ID's, not handshape names.  What signs go in what group is
// defined by the groups found at 
// http://www.bu.edu/asllrp/cslgr/pages/handshape-palette.html.
//
// In the handshapes array, the group of a sign is a name, not an index.
// What the name is doesn't matter, as long as every sign in the group
// uses the same name and no other group uses that name.  Generally, I use
// the name of the first sign in the group as the group name.
// 
// Not all groups are present yet, only the ones that have actually been
// used in signs present in the database.  When adding a sign, if the group
// of one of its handshapes hasn't yet been defined, I add the entire group
// both here and in the handshapes array.


shapegroups = [
	// A  10  S   cocked-S  T  X-over-thumb 
    [ 14, 12, 82, 34,      72, 80],
    // 1  D   X   bent-1 G/Q flat-G alt-G
    [  1, 42, 79, 22,    53, 49,    26],

    // V/2 crvd-V bent-V
    [  77, 41,    88],
    // 8   cocked-8 open-8 25
    [ 10,  32,      66,    13],
    // 5  crvd-5 5-C 5-C-L 5-C-tt
    [  4, 35,    5,  6,    7],
    // B   B-xd flat-B B-L Vulcan crvd-B crvd-flat-B crvd-spread-B bent-B
    [ 20,  19,  46,    18, 92,    36,    37,         39,           23,
      // bent-B-xd bent-B-L
         91,       24],
    // C   sml-C/3 tight-C tight-C/2
    [ 30,  71,     74,     73],
    // O  baby-O flat-O flat-O/2 fanned-flat-O
    [ 65, 21,    51,    50,      45],
    // I  Y   I-L-Y bent-I-L-Y Horns bent-Horns O/2-Horns
    [ 57, 81, 56,   95,        55,   25,        64], 
    
	// U/H crvd-U bent-U cocked-U U-L  bent-U-L
    [  76,  40,   29,   83,      75,  86],
   
    // 3 crvd-3
    [  2, 84],
    // 6   W   crvd-W
    [  8,  78,  85],
    // 7  cocked-7 open-7
    [  9,  90,     89],
    // F/9 cocked-F open-F
    [  44,  33,      67],
    // 4 
      [ 3 ],
    // 5  crvd-5 5-C 5-C-L 5-C-tt
  //  [  4, 35,    5,  6,    7],
    // E  loose-E
    [ 43,  61],
    // M  alt-M  bent-M  full-M
    [ 62, 15,    27,      52],
    // N  alt-N bent-N
    [  63, 16,  28],
    // P/K  alt-P
    [  58,   17],
    // L  L-X  crvd-L
    [ 60, 59,  38],
    // R  R-L
    [ 70, 87],

    // Rlxd  Other
    [ 93 ] 
  ];

// Handshapes is an array of objects representing (surprise!) handshapes.
// Indices in the array match the handshape ID's.
// Each handshape object has the following members:
//     shape: the name of the handshape, as found at 
//            http://www.bu.edu/asllrp/cslgr/pages/ncslgr-handshapes.html
//     id: the numerical handshape ID, as found at that same URL
//     group: the name of the handshape's group, as defined in the shapegroups
//            array above
//     img: the URL of a picture of the handshape.  These are taken from the
//          same URL as the handshape name.
//
// Only the handshapes from the groups that have been used so far in the database
// are present in this array.  (That's why so many members are 'undefined'; those
// represent handshapes whose groups haven't been used yet.)  When adding a sign, 
// if the group of one of its handshapes hasn't yet been defined, I add the entire
// group (not just the one missing sign) both here and in the shapegroups array.
// 
handshapes = [
			undefined,
			
	      { shape: '1', id: 1, group: '1',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1195.gif'},
	      	// // 3
		 { shape: '3', id: 2, group: '3',
		 	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1239.gif'},
	      	// 4
    	{ shape: '4', id: 3, group: '4',
	 		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1206.gif'},
	      { shape: '5', id: 4, group: '5',
	        img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1202.gif'},
	      { shape: '5-C', id: 5, group: '5',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1204.gif'},
	      { shape: '5-C-L', id: 6, group: '5',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1277.gif'},
	      { shape: '5-C-tt', id: 7, group: '5',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1207.gif'},
	       // 6
	 	{ shape: '6', id: 8, group: '6',
	 		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1238.gif'},
	     { shape: '7', id: 9, group: '7',
	 		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1246.gif'},
	      { shape: '8', id: 10, group: '8',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1247.gif'},
	      undefined,
	      { shape: '10', id: 12, group: 'A',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1190.gif' },
	      { shape: '25', id: 13, group: '8',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1231.gif'},
	      { shape: 'A', id: 14, group: 'A',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1189.gif' },
	      { shape: 'alt-M', id: 15, group: 'M',
	     	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1260.gif'},
	       { shape: 'alt-N', id: 16, group: 'N',
	     	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1261.gif'},
	       { shape: 'alt-P', id: 17, group: 'P-K',
	     	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1281.gif'},
	      { shape: 'B-L', id: 18, group: 'B',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1186.gif'},
	      { shape: 'B-xd', id: 19, group: 'B',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1253.gif'},
	      { shape: 'B', id: 20, group: 'B',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1185.gif'},
	      { shape: 'baby-O', id: 21, group: 'O',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1215.gif'},
	      { shape: 'bent-1', id: 22, group: '1',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1275.gif'},
	      { shape: 'bent-B', id: 23, group: 'B',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1255.gif'},
	      { shape: 'bent-B-L', id: 24, group: 'B',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1256.gif'},
	      { shape: 'bent-Horns', id: 25, group: 'I',
	      	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1276.gif'},
	      { shape: 'alt-G', id: 26, group: '1',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1262.gif'},
	       { shape: 'bent-M', id: 27, group: 'M',
	     	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1268.gif'},
	      { shape: 'bent-N', id: 28, group: 'N',
	    	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1270.gif'},
	      { shape: 'bent-U', id: 29, group: 'U-H',
		 	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1273.gif'},
	      { shape: 'C', id: 30, group: 'C',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1187.gif'},
	      undefined,
	      { shape: 'cocked-8', id: 32, group: '8',
	        img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1234.gif'},
	       { shape: 'cocked-F', id: 33, group: 'F-9',
	 		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1218.gif'},
	      { shape: 'cocked-S', id: 34, group: 'A',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1280.gif'},
	      { shape: 'crvd-5', id: 35, group: '5',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1205.gif'},
	      { shape: 'crvd-B', id: 36, group: 'B',
	        img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1257.gif'},
	      { shape: 'crvd-flat-B', id: 37, group: 'B',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1258.gif'},
	       { shape: 'crvd-L', id: 38, group: 'L',
	    	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1226.gif'},
	      { shape: 'crvd-sprd-B', id: 39, group: 'B',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1208.gif'},
	      { shape: 'crvd-U', id: 40, group: 'U-H',
			img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1274.gif'},
	      { shape: 'crvd-V', id: 41, group: 'V',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1210.gif'},
	      { shape: 'D', id: 42, group: '1',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1196.gif'},
	      { shape: 'E', id: 43, group: 'E',
	     	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1259.gif'},
	      	{ shape: 'F-9', id: 44, group: 'F-9',
	         img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1216.gif'},
	      { shape: 'fanned-flat-O', id: 45, group: 'O',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1279.gif'},
  	      { shape: 'flat-B', id: 46, group: 'B',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1254.gif'},
	      undefined,
	      undefined,
	      { shape: 'flat-G', id: 49, group: '1',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1198.gif'},
	      { shape: 'flat-O/2', id: 50, group: 'O',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1223.gif'},
	      { shape: 'flat-O', id: 51, group: 'O',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1213.gif'},
	      { shape: 'full-M', id: 52, group: 'M',
	     	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1243.gif'},
	      { shape: 'G/Q', id: 53, group: '1',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1197.gif'},
	      undefined,
	      { shape: 'Horns', id: 55, group: 'I',
	      	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1229.gif'},
	      { shape: 'I-L-Y', id: 56, group: 'I',
	      	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1228.gif'},
	      { shape: 'I', id: 57, group: 'I',
	      img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1236.gif'},
	     { shape: 'P-K', id: 58, group: 'P-K',
	    	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1235.gif'},
	      	{ shape: 'L-X', id: 59, group: 'L',
	     	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1265.gif'},
	      { shape: 'L', id: 60, group: 'L',
	     	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1225.gif'},
	      { shape: 'loose-E', id: 61, group: 'E',
	     	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1242.gif'},
	       { shape: 'M', id: 62, group: 'M',
	     	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1267.gif'},
	      { shape: 'N', id: 63, group: 'N',
	    	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1269.gif'},
	      { shape: 'O/2-Horns', id: 64, group: 'I',
	      	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1230.gif'},
	      { shape: 'O', id: 65, group: 'O',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1212.gif'},
	      { shape: 'open-8', id: 66, group: '8',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1233.gif'},
	       { shape: 'open-F', id: 67, group: 'F-9',
	 		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1217.gif'},
	      undefined,
	      undefined,
	       { shape: 'R', id: 70, group: 'R',
	    	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1237.gif'},
	      { shape: 'sml-C/3', id: 71, group: 'C',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1199.gif'},
	      { shape: 'T', id: 72, group: 'A',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1192.gif'},
	      { shape: 'tight-C/2', id: 73, group: 'C',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1222.gif'},
	      { shape: 'tight-C', id: 74, group: 'C',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1214.gif'},
	      { shape: 'U-L', id: 75, group: 'U-H',
			img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1224.gif'},
	      { shape: 'U-H', id: 76, group: 'U-H',
			img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1221.gif'},
	      { shape: 'V/2', id: 77, group: 'V',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1209.gif'},
	      { shape: 'W', id: 78, group: '6',
	 		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1245.gif'},
	      { shape: 'X', id: 79, group: '1',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1220.gif'},
	      { shape: 'X-over-thumb', id: 80, group: 'A',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1271.gif'},
	      {shape: 'Y', id: 81, group: 'I',
	      	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1227.gif'},
	      { shape: 'S', id: 82, group: 'A',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1191.gif' },
	       { shape: 'cocked-U', id: 83, group: 'U-H',
			img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1249.gif'},
	      { shape: 'crvd-3', id: 84, group: '3',
		 	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/crvd-3.gif'},
	      { shape: 'crvd-W', id: 85, group: '6',
			img: 'https://www.bu.edu/asllrp/cslgr/pages/images/crvd-W.gif'},
	       { shape: 'bent-U-L', id: 86, group: 'U-H',
		 	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/bent-U-L.gif'},
	      { shape: 'R-L', id: 87, group: 'R',
	    	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/R-L.gif'},
	      { shape: 'bent-V', id: 88, group: 'V',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/bent-v.gif' },
	      { shape: 'open-7', id: 89, group: '7',
	 		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/open-7.gif'},
	      	{ shape: 'cocked-7', id: 90, group: '7',
			img: 'https://www.bu.edu/asllrp/cslgr/pages/images/cocked-7.gif'},
	      { shape: 'bent-B-xd', id: 91, group: 'B',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/bent-B-xd.gif'},
	      { shape: 'Vulcan', id: 92, group: 'B',
	      img: 'https://www.bu.edu/asllrp/cslgr/pages/images/Vulcan.gif'},
	      	{ shape: 'base-hand', id: 93, group: 'Rlxd',
	     	img: 'images/basehand.svg'},
	     	undefined,
	      { shape: 'bent-I-L-Y', id: 95, group: 'I',
	    	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1266.gif'}
	   
 
	    	
	     ];


/* 
 * handshapeDistances is a 2-D array of overrides allowing specification of distances between
 * particular pairs of handshapes.  In every case, the first index must be less than the second.
 */

shape_dist_overrides = Array(handshapes.length);
for (var i = 0; i < shape_dist_overrides.length; i++) {
    shape_dist_overrides[i] = [];
}

// B-L, B
shape_dist_overrides[18][20] = 1;

// crvd-spread-B, fanned-flat-O, tight-C
shape_dist_overrides[39][45] = 1;
shape_dist_overrides[39][74] = 1;
shape_dist_overrides[45][74] = 1;

// X, X-over-thumb, cocked-S
shape_dist_overrides[34][79] = 1;
shape_dist_overrides[79][80] = 1;
// cocked-S and X-over-thumb are both in the A group


sideregions = { 'image': 'images/side.svg',
		'width': 150,
		'height': 400,
		'regions': {
		    'r-ear': {'elt': 'ellipse', 'c': [34, 72],
			      'r': [8, 11], 'xyz': [2, 4, -2] },
		    'temple': {'elt': 'polygon', 'xyz': [2, 5, -1],
				   'points': '30,50 50,50 50,60 30,60'},
		    'forehead': {'elt': 'polygon', 'xyz': [0, 6],
				 'points': '45,40 60,48 60,57 45,57' },
		    'r-eye': {'elt': 'ellipse', 'c': [57, 64], 'r': [6, 5],
			      'xyz': [1, 5]},
						// 'L-eye': {'elt': 'ellipse', 'c': [66, 43], 'r': [6, 5],
						//     'xyz': [1, 5]},
		    'r-cheek': {'elt': 'ellipse', 'c': [53, 72], 'r': [6, 7],
				'xyz': [2, 3]},
		    			//'L-cheek': {'elt': 'ellipse', 'c': [73, 56], 'r': [6, 7],
						//	'xyz': [2, 3]},
		    'nose':  {'elt': 'ellipse', 'c': [63, 75], 'r': [7, 6],
			      'xyz': [0, 4]},
		    'mouth': {'elt': 'polygon', 'xyz': [0, 3],
			      'points': '45,82 56,82 65,82 65,92 45,92' },
		    'chin': {'elt': 'polygon', 'xyz': [0, 2],
			     'points': '42,93 65,93 65,98 42,98' },
			'upper-area': {'elt': 'polygon', 'xyz': [2, 2],
				   'points': '75,0 150,0 150,69 75,69' },
			'chin-area': {'elt': 'polygon', 'xyz': [2, 2],
				   'points': '75,70 150,70 150,99 75,99' },
			'chest': {'elt': 'polygon', 'xyz': [2, 2],
				   'points': '75,135 100,135 100,194 75,194' },
			'chest-front': {'elt': 'polygon', 'xyz': [2, 2],
				   'points': '100,135 150,135 150,194 100,194' },
			'stomach': {'elt': 'polygon', 'xyz': [2, 2],
				   'points': '75,195 150,195 150,249 75,249' },
			'waist': {'elt': 'polygon', 'xyz': [2, 2],
				   'points': '75,250 150,250 150,290 75,290' },
		    'r-shoulder': {'elt': 'ellipse', 'c': [36, 147],
			      'r': [12, 14], 'xyz': [2, 4, -2] },
			}
		};
		

frontregions = { 'image': 'images/front.svg',
//287.5

		'width': 287.5,
		'height': 400,
		'regions': {
		    'high-right': {'elt': 'polygon', 'xyz': [2, 3],
				   'points': '0,0 58,0 58,135 0,135' },
		    'above-right-shoulder': {'elt': 'polygon', 'xyz': [1, 3],
				       'points': '59,0 93,0 93,100 59,130' },
		    'right': {'elt': 'polygon', 'xyz': [2, 0],
			      'points': '0,137 55,137 55,200 0,200' },
		    'low-right': {'elt': 'polygon', 'xyz': [2, -1],
			      'points': '0,202 55,202 55,250 0,250' },
			
			'high-left': {'elt': 'polygon', 'xyz': [-2, 3],
				   'points': '192,0 255,0 255,135 192,135' },
		    'above-left-shoulder': {'elt': 'polygon', 'xyz': [-1, 3],
				       'points': '191,0 160,0 160,100 191,130' },
		    'left': {'elt': 'polygon', 'xyz': [-2, 0],
			      'points': '255,137 200,137 200,200 255,200' },
		    'low-left': {'elt': 'polygon', 'xyz': [-2, -1],
			      'points': '255,202 200,202 200,250 255,250' },
			      
		    'neck-front': {'elt': 'polygon', 'xyz': [0, 1, 1],
			     'points': '110,110 145,110 145,125 110,125' },
		    'neck': {'elt': 'polygon', 'xyz': [0, 1],
			     'points': '110,110 145,110 145,125 110,125' },
		    'r-shoulder': {'elt': 'polygon', 'xyz': [1, 0],
				   'points': '68,131 105,115 105,141 60,141' },
		    'l-shoulder': {'elt': 'polygon', 'xyz': [-1, 0],
				   'points': '150,115 186,130 195,141 150,141' },
		    'chest-front': {'elt': 'polygon', 'xyz': [0, 0, 1],
			      'points': '90,138 164,138 164,192 90,192' },
		    'chest': {'elt': 'polygon', 'xyz': [0, 0],
			      'points': '90,138 164,138 164,192 90,192' },
			'stomach-front': {'elt': 'polygon', 'xyz': [0, -1, 1],
				'points': '90,193 165,193 165,246 90,246' },
		    'stomach': {'elt': 'polygon', 'xyz': [0, -1],
				'points': '90,193 165,193 165,246 90,246' },
			'waist-front': {'elt': 'polygon', 'xyz': [0, -2, 1],
			      'points': '87,250 168,250 173,290 82,290' },
		    'waist': {'elt': 'polygon', 'xyz': [0, -2],
			      'points': '87,250 168,250 173,290 82,290' },
		    'thigh': {'elt': 'polygon', 'xyz': [1, -3],
			      'points': '82,305 125,305 123,355 87,355' },
			      
		    'upper-arm': {'elt': 'polygon', 'xyz': [-1, 0, 0],
				  'points': '170,150 196,150 192,190 169,190'},
		    'elbow': {'elt': 'polygon', 'xyz': [-1, 0, 1],
			      'points': '169,190 192,190 192,220 169,220' },
		    'arm': {'elt': 'polygon', 'xyz': [-0.5, 0, 1],
			    'points': '169,220 192,220 203,265 185,270' },
		    'wrist': {'elt': 'polygon', 'xyz': [0, 0, 1],
			      'points': '185,270 200,265 207,280 194,290' },
		    'hand': {'elt': 'polygon', 'xyz': [0.5, 0, 1],
			     'points': '193,293 208,280 235,300 198,320' },
			     
			'r-ear': {'elt': 'ellipse', 'c': [100, 72],
			      'r': [5, 7], 'xyz': [1, 2.5, -1] },
			'l-ear': {'elt': 'ellipse', 'c': [155, 72],
			      'r': [5, 7], 'xyz': [-1, 2.5, -1] },
		    'forehead': {'elt': 'polygon', 'xyz': [0, 3],
				 'points': '115,40 140,40 140,55 115,55' },
			'temple': {'elt': 'polygon', 'xyz': [1, 2.5, -.5],
				 'points': '105,50 113,39 113,55 103,55' },
			//'low-temple': {'elt': 'polygon', 'xyz': [2, 4, -1],
			//	 'points': '103,55 110,55 110,65 103,65' },
			// there should only be one temple- doesn't make sense to have 2	 
				 
			'r-eye-front': {'elt': 'ellipse', 'c': [116, 71], 'r': [6, 5, 1],
			      'xyz': [0.5, 2.5]},
		    'l-eye-front': {'elt': 'ellipse', 'c': [138, 71], 'r': [6, 5, 1],
			      'xyz': [-0.5, 2.5]},	 
		    'r-eye': {'elt': 'ellipse', 'c': [116, 71], 'r': [6, 5],
			      'xyz': [.5, 2.5]},
		    'l-eye': {'elt': 'ellipse', 'c': [138, 71], 'r': [6, 5],
			      'xyz': [-.5, 2.5]},
		    'r-cheek': {'elt': 'ellipse', 'c': [113, 83], 'r': [6, 7],
				'xyz': [1, 2.2]},
		    'l-cheek': {'elt': 'ellipse', 'c': [142, 83], 'r': [6, 7],
				'xyz': [1, 2.2]},
			'nose-front':  {'elt': 'ellipse', 'c': [129, 83], 'r': [7, 6],
			      'xyz': [0, 2.2, 1]},
		    'nose':  {'elt': 'ellipse', 'c': [129, 83], 'r': [7, 6],
			      'xyz': [0, 2.2]},
			'mouth-front': {'elt': 'polygon', 'xyz': [0, 2, 1],
			      'points': '118,90 140,90 140,98 118,98' },
		    'mouth': {'elt': 'polygon', 'xyz': [0, 2],
			      'points': '118,90 140,90 140,98 118,98' },
			'chin-front': {'elt': 'polygon', 'xyz': [0, 1.5, 1],
			     'points': '115,100 140,100 140,110 115,110' },
			'chin': {'elt': 'polygon', 'xyz': [0, 1.5],
			     'points': '115,100 140,100 140,110 115,110' },
		   
		}};
		

// Array of Sign objects.  For ease of finding things, these are added in
// alphabetical order of sign name.  Each Sign object has the following members:
//    sign: name of the sign, as found in 
//          http://www.bu.edu/asllrp/dai-asllvd-BU_glossing_with_variations_HS_information-extended-urls-RU.xlsx
//    hands: number of hands required to make the sign.  For two-henaded signs
//           where the non-dominant hand is passive, use 1.5.
//    handshape: array of arrays of handshape ID's.  For a one-handed sign, there is
//               only one subarray.  For a 1.5-handed or two-handed sign, there are two
//               subarrays, the first for the dominant hand and the second for the non-dominant
//               hand.  Each subarray has two numbers; the first is the ID of the handshape
//               at the beginning of the sign, and the second is the ID of the handshape
//               at the end of the sign.
//    position: Array of positions taken by the dominant hand at the beginning and the end of
//              the sign.  The positions are (generally) strings, the same strings used to
//              identify regions in the headregions and bodyregions arrays, although [x,y,z]
//              triples can be used as well.  For the purposes of the
//              triple, the origin is in the middle of the signer's chest; the X axis is 
//              horizontal, increasing across the signer's body from right to left; the Y axis
//              is vertical, increasing upwards; and the Z axis is horizontal, increasing with
//              increasing distance forward from the signer.
//    palmFace: Value indicating which direction the dominant hand's palm faces during the
//              sign.  The value should be one of those used as values for the #palm <select>
//              element in index.html.  If you need to add a value, make sure it gets added in
//              index.html as well.
//    motion: An object representing a motion.  This object has two members of its own:
//            type: One of the strings used as values for the #movetype <select> element in
//                  index.html.
//            dir: An [x,y,z] triple indicating the initial direction of motion.
//    video: The relative URL of an MP4 video depicting the sign.

