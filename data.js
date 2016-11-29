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
    [ 57, 81, 56,   95,        55,   25,        64]    ];

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
handshapes = [undefined,
	      { shape: '1', id: 1, group: '1',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1195.gif'},
	      undefined,
	      undefined,
	      { shape: '5', id: 4, group: '5',
	        img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1202.gif'},
	      { shape: '5-C', id: 5, group: '5',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1204.gif'},
	      { shape: '5-C-L', id: 6, group: '5',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1277.gif'},
	      { shape: '5-C-tt', id: 7, group: '5',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1207.gif'},
	      undefined,
	      undefined,
	      { shape: '8', id: 10, group: '8',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1247.gif'},
	      undefined,
	      { shape: '10', id: 12, group: 'A',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1190.gif' },
	      { shape: '25', id: 13, group: '8',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1231.gif'},
	      { shape: 'A', id: 14, group: 'A',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1189.gif' },
	      undefined,
	      undefined,
	      undefined,
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
	      undefined,
	      undefined,
	      undefined,
	      { shape: 'C', id: 30, group: 'C',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1187.gif'},
	      undefined,
	      { shape: 'cocked-8', id: 32, group: '8',
	        img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1234.gif'},
	      undefined,
	      { shape: 'cocked-S', id: 34, group: 'A',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1280.gif'},
	      { shape: 'crvd-5', id: 35, group: '5',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1205.gif'},
	      { shape: 'crvd-B', id: 36, group: 'B',
	        img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1257.gif'},
	      { shape: 'crvd-flat-B', id: 37, group: 'B',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1258.gif'},
	      undefined,
	      { shape: 'crvd-sprd-B', id: 39, group: 'B',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1208.gif'},
	      undefined,
	      { shape: 'crvd-V', id: 41, group: 'V',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1210.gif'},
	      { shape: 'D', id: 42, group: '1',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1196.gif'},
	      undefined,
	      undefined,
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
	      undefined,
	      { shape: 'G/Q', id: 53, group: '1',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1197.gif'},
	      undefined,
	      { shape: 'Horns', id: 55, group: 'I',
	      	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1229.gif'},
	      { shape: 'I-L-Y', id: 56, group: 'I',
	      	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1228.gif'},
	      { shape: 'I', id: 57, group: 'I',
	      img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1236.gif'},
	      undefined,
	      undefined,
	      undefined,
	      undefined,
	      undefined,
	      undefined,
	      { shape: 'O/2-Horns', id: 64, group: 'I',
	      	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1230.gif'},
	      { shape: 'O', id: 65, group: 'O',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1212.gif'},
	      { shape: 'open-8', id: 66, group: '8',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1233.gif'},
	      undefined,
	      undefined,
	      undefined,
	      undefined,
	      { shape: 'sml-C/3', id: 71, group: 'C',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1199.gif'},
	      { shape: 'T', id: 72, group: 'A',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1192.gif'},
	      { shape: 'tight-C/2', id: 73, group: 'C',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1222.gif'},
	      { shape: 'tight-C', id: 74, group: 'C',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1214.gif'},
	      undefined,
	      undefined,
	      { shape: 'V/2', id: 77, group: 'V',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1209.gif'},
	      undefined,
	      { shape: 'X', id: 79, group: '1',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1220.gif'},
	      { shape: 'X-over-thumb', id: 80, group: 'A',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1271.gif'},
	      {shape: 'Y', id: 81, group: 'I',
	      	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1227.gif'},
	      { shape: 'S', id: 82, group: 'A',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1191.gif' },
	      undefined,
	      undefined,
	      undefined,
	      undefined,
	      undefined,
	      { shape: 'bent-V', id: 88, group: 'V',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/bent-v.gif' },
	      undefined,
	      undefined,
	      { shape: 'bent-B-xd', id: 91, group: 'B',
		img: 'https://www.bu.edu/asllrp/cslgr/pages/images/bent-B-xd.gif'},
	      { shape: 'Vulcan', id: 92, group: 'B',
	      img: 'https://www.bu.edu/asllrp/cslgr/pages/images/Vulcan.gif'},
	      undefined,
	      undefined,
	      { shape: 'bent-I-L-Y', id: 95, group: 'I',
	    	img: 'https://www.bu.edu/asllrp/cslgr/pages/images/_1266.gif'}
	     ];

sideregions = { 'image': 'images/side.svg',
		'width': 150,
		'height': 400,
		'regions': {
		    'R-ear': {'elt': 'ellipse', 'c': [34, 72],
			      'r': [8, 11], 'xyz': [-2, 4, -2] },
		    'temple': {'elt': 'path', 'xyz': [-2, 5, -1],
				   'd': 'M 30 50 L 50 50 50 60 30 60 z'},
		    'low-temple': {'elt': 'path', 'xyz': [-2, 5, -1],
			       'd': 'M 40 60 L 45 60 45 75 40 75 z'},
		    'forehead': {'elt': 'path', 'xyz': [0, 6],
				 'd': 'M 45 40 L 60 48 60 57 45 57 z' },
		    'R-eye': {'elt': 'ellipse', 'c': [57, 64], 'r': [6, 5],
			      'xyz': [-1, 5]},
		   // 'L-eye': {'elt': 'ellipse', 'c': [66, 43], 'r': [6, 5],
			 //     'xyz': [1, 5]},
		    'R-cheek': {'elt': 'ellipse', 'c': [53, 72], 'r': [6, 7],
				'xyz': [-2, 3]},
		    //'L-cheek': {'elt': 'ellipse', 'c': [73, 56], 'r': [6, 7],
			//	'xyz': [2, 3]},
		    'nose':  {'elt': 'ellipse', 'c': [63, 75], 'r': [7, 6],
			      'xyz': [0, 4]},
		    'mouth': {'elt': 'path', 'xyz': [0, 3],
			      'd': 'M 45 82 L 56 82 65 82 65 92 45 92 z' },
		    'chin': {'elt': 'path', 'xyz': [0, 2],
			     'd': 'M 42 93 L 65 93 65 98 42 98 z' },
			'neck': {'elt': 'path', 'xyz': [0, 2],
			     'd': 'M 43 99 L 48 99 48 113 43 113 z' },
			'high-front': {'elt': 'path', 'xyz': [2, 2],
				   'd': 'M 75 0 L 150 0 150 69 75 69 z' },
			'front': {'elt': 'path', 'xyz': [2, 2],
				   'd': 'M 75 70 L 150 70 150 99 75 99 z' },
			'chest': {'elt': 'path', 'xyz': [2, 2],
				   'd': 'M 66 135 L 100 135 100 194 72 194 z' },
			'chest-front': {'elt': 'path', 'xyz': [2, 2],
				   'd': 'M 100 135 L 150 135 150 194 100 194 z' },
			'stomach': {'elt': 'path', 'xyz': [2, 2],
				   'd': 'M 70 195 L 100 195 100 249 70 249 z' },
			'waist': {'elt': 'path', 'xyz': [2, 2],
				   'd': 'M 75 250 L 150 250 150 290 75 290 z' },
		    'R-shoulder': {'elt': 'ellipse', 'c': [36, 147],
			       'r': [12, 14], 'xyz': [-2, 4, -2] },
			'thigh': {'elt': 'path', 'xyz': [0, 2],
				   'd': 'M 50 292 L 70 292 70 306 52 350 z' },
			'above-right-shoulder': {'elt': 'path', 'xyz': [0, 0],
				   'd': 'M 23 0 L 50 0 50 120 23 120' },
		    'high-right': {'elt': 'path', 'xyz': [0, 0],
				   'd': 'M 23 0 L 50 0 50 130 23 130 z' },
		    'right': {'elt': 'path', 'xyz': [-2, 0],
			      'd': 'M 0 137 L 58 137 58 200 0 200 z' },
			'low-right': {'elt': 'path', 'xyz': [-2, -1],
			      'd': 'M 0 202 L 69 202 69 250 0 250 z' },
	
			}
		};
		

frontregions = { 'image': 'images/front.svg',
		'width': 250,
		'height': 400,
		'regions': {
		    'high-right': {'elt': 'path', 'xyz': [-2, 2],
				   'd': 'M 0 0 L 58 0 58 135 0 135 z' },
		    'above-right-shoulder': {'elt': 'path', 'xyz': [-1, 2],
				       'd': 'M 59 0 L 93 0 93 100 59 130 z' },
		    'right': {'elt': 'path', 'xyz': [-2, 0],
			      'd': 'M 0 137 L 58 137 58 200 0 200 z' },
		    'low-right': {'elt': 'path', 'xyz': [-2, -1],
			      'd': 'M 0 202 L 58 202 58 250 0 250 z' },
			
			'high-left': {'elt': 'path', 'xyz': [2, 2],
				   'd': 'M 192 0 L 250 0 250 135 192 135 z' },
		    'above-left-shoulder': {'elt': 'path', 'xyz': [1, 2],
				       'd': 'M 191 0 L 160 0 160 100 191 130 z' },
		    'left': {'elt': 'path', 'xyz': [2, 0],
			      'd': 'M 250 137 L 196 137 196 200 250 200 z' },
		    'low-left': {'elt': 'path', 'xyz': [2, -1],
			      'd': 'M 250 202 L 196 202 196 250 250 250 z' },
			      
		    'neck-front': {'elt': 'path', 'xyz': [0, 1, 1],
			     'd': 'M 110 110 L 145 110 145 125 110 125 z' },
		    'neck': {'elt': 'path', 'xyz': [0, 1],
			     'd': 'M 110 110 L 145 110 145 125 110 125 z' },
		    'R-shoulder': {'elt': 'path', 'xyz': [-1, 0],
				   'd': 'M 68 131 L 105 115 105 141 60 141 z' },
		    'L-shoulder': {'elt': 'path', 'xyz': [1, 0],
				   'd': 'M 150 115 L 186 130 195 141 150 141 z' },
		    'chest-front': {'elt': 'path', 'xyz': [0, 0, 1],
			      'd': 'M 90 138 L 164 138 164 192 90 192 z' },
		    'chest': {'elt': 'path', 'xyz': [0, 0],
			      'd': 'M 90 138 L 164 138 164 192 90 192 z' },
			'stomach-front': {'elt': 'path', 'xyz': [0, -1, 1],
				'd': 'M 90 193 L 165 193 165 246 90 246 z' },
		    'stomach': {'elt': 'path', 'xyz': [0, -1],
				'd': 'M 90 193 L 165 193 165 246 90 246 z' },
			'waist-front': {'elt': 'path', 'xyz': [0, -2, 1],
			      'd': 'M 87 250 L 168 250 173 290 82 290 z' },
		    'waist': {'elt': 'path', 'xyz': [0, -2],
			      'd': 'M 87 250 L 168 250 173 290 82 290 z' },
		    'thigh': {'elt': 'path', 'xyz': [-1, -3],
			      'd': 'M 82 305 L 125 305 123 355 87 355 z' },
			      
			      
		    'upper-arm': {'elt': 'path', 'xyz': [3, 0],
				  'd': 'M 170 150 L 196 150 192 190 169 190 z'},
		    'elbow': {'elt': 'path', 'xyz': [3, -1],
			      'd': 'M 169 190 L 192 190 192 220 169 220 z' },
		    'arm': {'elt': 'path', 'xyz': [3, -2],
			    'd': 'M 169 220 L 192 220 203 265 185 270 z' },
		    'wrist': {'elt': 'path', 'xyz': [3, -3],
			      'd': 'M 185 270 L 200 265 207 280 194 290 z' },
		    'hand': {'elt': 'path', 'xyz': [3, -4],
			     'd': 'M 193 293 L 208 280 235 300 198 320 z' },
			     
			'R-ear': {'elt': 'ellipse', 'c': [100, 72],
			      'r': [5, 7], 'xyz': [-2, 4, -2] },
			'L-ear': {'elt': 'ellipse', 'c': [155, 72],
			      'r': [5, 7], 'xyz': [2, 4, -2] },
		    'forehead': {'elt': 'path', 'xyz': [0, 6],
				 'd': 'M 115 40 L 140 40 140 55 115 55 z' },
			'temple': {'elt': 'path', 'xyz': [-2, 5, -1],
				 'd': 'M 105 50 L 113 39 113 55 103 55 z' },
			'low-temple': {'elt': 'path', 'xyz': [-2, 4, -1],
				 'd': 'M 103 55 L 110 55 110 65 103 65 z' },
				 
				 
			'R-eye-front': {'elt': 'ellipse', 'c': [116, 71], 'r': [6, 5, 1],
			      'xyz': [-1, 5]},
		    'L-eye-front': {'elt': 'ellipse', 'c': [138, 71], 'r': [6, 5, 1],
			      'xyz': [1, 5]},	 
		    'R-eye': {'elt': 'ellipse', 'c': [116, 71], 'r': [6, 5],
			      'xyz': [-1, 5]},
		    'L-eye': {'elt': 'ellipse', 'c': [138, 71], 'r': [6, 5],
			      'xyz': [1, 5]},
		    'R-cheek': {'elt': 'ellipse', 'c': [113, 83], 'r': [6, 7],
				'xyz': [-2, 3]},
		    'L-cheek': {'elt': 'ellipse', 'c': [142, 83], 'r': [6, 7],
				'xyz': [2, 3]},
			'nose-front':  {'elt': 'ellipse', 'c': [129, 83], 'r': [7, 6],
			      'xyz': [0, 4, 1]},
		    'nose':  {'elt': 'ellipse', 'c': [129, 83], 'r': [7, 6],
			      'xyz': [0, 4]},
			'mouth-front': {'elt': 'path', 'xyz': [0, 3, 1],
			      'd': 'M 118 90 L 140 90 140 98 118 98 z' },
		    'mouth': {'elt': 'path', 'xyz': [0, 3],
			      'd': 'M 118 90 L 140 90 140 98 118 98 z' },
			'chin-front': {'elt': 'path', 'xyz': [0, 2, 1],
			     'd': 'M 115 100 L 140 100 140 110 115 110 z' },
			'chin': {'elt': 'path', 'xyz': [0, 2],
			     'd': 'M 115 100 L 140 100 140 110 115 110 z' },
		   
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

signs = [{ sign: 'accept',
	   hands: 2,
	   handshape: [ [4, 51], [4, 51] ],
	   position: [ 0, 0 ],
	   palmFace: 'inward',
	   motion: { type: 'straight',
		     dir: [0, 0, -1] },
	   video: 'images/accept.mp4'
	 },
	 { sign: 'afraid',
	   hands: 2,
	   handshape: [ [82, 4], [82, 4] ],
	   position: [ 'right', 'chest' ],
	   palmFace: 'inward',
	   motion: { type: 'straight',
				 dir: [1, 0] },
	   video: 'images/afraid.mp4' },
	 { sign: 'alone',
	   hands: 1,
	   handshape: [ [1, 1] ],
	   position: [ 0, 0 ],
	   palmFace: 'inward',
	   motion: { type: 'flat-circle',
		     dir: [0, 0, 0] },
	   //video: 'http://csr.bu.edu/ftp/asl/asllvd/demos/verify_start_end_handshape_annotations/test_auto_move/signs_mov/26_3933_merged.mov'
	   //video: 'images/26_3933_merged.mov'
	   video: 'images/alone.mp4'
	 },
	  { sign: 'angry',
	   hands: 1,
	   handshape: [ [6, 5] ],
	   position: [ 'chest', 'R-shoulder'],
	   palmFace: 'inward',
	   motion: { type: 'twist',
			dir: [-1, 1, 0 ] },
	   video:'images/angry.mp4'
	 },
	 { sign: 'blame',
	   hands: 2,
	   handshape: [ [12, 14], [12, 14] ],
	   position: ['chin', 'sightline'],
	   palmFace: 'inward',
	   motion: { type: 'arc',
		     dir: [0, -1, 1] },
	   video: 'images/blame.mp4' },
	 { sign: 'bridge',
	   hands: 1.5,
	   handshape: [ [77, 77], [18, 18] ],
	   position: ['hand', 'elbow'],
	   palmFace: 'toward-palm',
	   motion: { type: 'arc',
		     dir: [0, 1, 0] },
	   video: 'images/bridge.mp4'},
	 { sign: 'deaf',
	   hands: 1,
	   handshape: [ [1, 1] ],
	   position: [['ear', 'mouth']],
	   palmFace: 'inward',
	   motion: { type: 'arc',
	         dir: [-1, 0, 1] },
	   video: 'images/deaf.mp4'},
	 { sign: 'fine',
	   hands: 1,
	   handshape: [ [4, 4] ],
	   position: [[0,0,0], [0,0,0]],
	   palmFace: 'horizontal',
	   motion: { type:'in-and-out',
	   		  dir: [0,0,-1] },
	   video: 'images/fine.mp4'},
	 { sign: 'good/thank you',
	   hands: 1,
	   handshape: [ [18, 18] ],
	   position: ['chin', 'sightline'],
	   palmFace: 'inward',
	   motion: { type: 'arc',
		     dir: [0, -1, 1] },
	   video: 'images/good-thank-you.mp4'},
	 { sign: 'hearing',
	   hands: 1,
	   handshape: [ [1, 1] ],
	   position: ['chin'],
	   palmFace: 'inward',
	   motion: { type: 'facing-circle',
		     dir: [0, -1, 1] },
	   video: 'images/hearing.mp4'},
	 { sign: 'hello',
	   hands: 1,
	   handshape: [ [20, 20] ],
	   position: ['forehead', [-1, 6, 1]],
	   palmFace: 'outward',
	   motion: { type: 'arc',
		     dir: [-1, 0, 1] },
	   video: 'images/hello.mp4'},
	 { sign: 'know',
	   hands: 1,
	   handshape: [ [24, 24] ],
	   position: ['low-temple'],
	   palmFace: 'inward',
	   motion: { type: 'in-and-out',
			   dir: [0, 1, 1] },
	   video: 'images/know.mp4'}, 
	 { sign: 'not',
	   hands: 1,
	   handshape: [ [12, 12] ],
	   position: ['chin', 'sightline'],
	   palmFace: 'horizontal',
	   motion: { type: 'arc',
		     dir: [0, -1, 1] },
	   video: 'images/not.mp4'},
	   
	 { sign: 'same-old',
	   hands: 2,
	   handshape: [[81, 81], [81, 81]],
	   position: ['neutral', 'low-right'],
	   palmFace: 'outward',
	   motion: {type: 'two-lines',
	   		 dir: [-1, -1, 0]},
	   video: 'images/same-old.mp4'},
	 { sign: 'sorry',
	   video: 'images/sorry.mp4',
	   hands: 1,
	   handshape: [ [14, 14] ],
	   position: ['chin', 'sightline'],
	   palmFace: 'inward',
	   motion: { type: 'facing-circle',
		     dir: [0, 0, 0] }},
	 { sign: 'thrill/whats-up',
	 	video: 'images/whats-up.mp4',
	 	hands: 2,
	 	handshape: [ [13, 13], [13, 13] ],
	 	position: [ 'chest', 'right-shoulder'],
	 	palmFace: 'inward',
	 	motion: { type: 'arc',
	 	          dir: [-1, 1, 0]}
	 }
	];
