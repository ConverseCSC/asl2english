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
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1195.gif'},
	      undefined,
	      undefined,
	      { shape: '5', id: 4, group: '5',
	        img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1202.gif'},
	      { shape: '5-C', id: 5, group: '5',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1204.gif'},
	      { shape: '5-C-L', id: 6, group: '5',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1277.gif'},
	      { shape: '5-C-tt', id: 7, group: '5',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1207.gif'},
	      undefined,
	      undefined,
	      { shape: '8', id: 10, group: '8',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1247.gif'},
	      undefined,
	      { shape: '10', id: 12, group: 'A',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1190.gif' },
	      { shape: '25', id: 13, group: '8',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1231.gif'},
	      { shape: 'A', id: 14, group: 'A',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1189.gif' },
	      undefined,
	      undefined,
	      undefined,
	      { shape: 'B-L', id: 18, group: 'B',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1186.gif'},
	      { shape: 'B-xd', id: 19, group: 'B',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1253.gif'},
	      { shape: 'B', id: 20, group: 'B',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1185.gif'},
	      { shape: 'baby-O', id: 21, group: 'O',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1215.gif'},
	      { shape: 'bent-1', id: 22, group: '1',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1275.gif'},
	      { shape: 'bent-B', id: 23, group: 'B',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1255.gif'},
	      { shape: 'bent-B-L', id: 24, group: 'B',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1256.gif'},
	      { shape: 'bent-Horns', id: 25, group: 'I',
	      	img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1276.gif'},
	      { shape: 'alt-G', id: 26, group: '1',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1262.gif'},
	      undefined,
	      undefined,
	      undefined,
	      { shape: 'C', id: 30, group: 'C',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1187.gif'},
	      undefined,
	      { shape: 'cocked-8', id: 32, group: '8',
	        img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1234.gif'},
	      undefined,
	      { shape: 'cocked-S', id: 34, group: 'A',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1280.gif'},
	      { shape: 'crvd-5', id: 35, group: '5',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1205.gif'},
	      { shape: 'crvd-B', id: 36, group: 'B',
	        img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1257.gif'},
	      { shape: 'crvd-flat-B', id: 37, group: 'B',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1258.gif'},
	      undefined,
	      { shape: 'crvd-sprd-B', id: 39, group: 'B',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1208.gif'},
	      undefined,
	      { shape: 'crvd-V', id: 41, group: 'V',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1210.gif'},
	      { shape: 'D', id: 42, group: '1',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1196.gif'},
	      undefined,
	      undefined,
	      { shape: 'fanned-flat-O', id: 45, group: 'O',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1279.gif'},
  	      { shape: 'flat-B', id: 46, group: 'B',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1254.gif'},
	      undefined,
	      undefined,
	      { shape: 'flat-G', id: 49, group: '1',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1198.gif'},
	      { shape: 'flat-O/2', id: 50, group: 'O',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1223.gif'},
	      { shape: 'flat-O', id: 51, group: 'O',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1213.gif'},
	      undefined,
	      { shape: 'G/Q', id: 53, group: '1',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1197.gif'},
	      undefined,
	      { shape: 'Horns', id: 55, group: 'I',
	      	img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1229.gif'},
	      { shape: 'I-L-Y', id: 56, group: 'I',
	      	img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1228.gif'},
	      { shape: 'I', id: 57, group: 'I',
	      img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1236.gif'},
	      undefined,
	      undefined,
	      undefined,
	      undefined,
	      undefined,
	      undefined,
	      { shape: 'O/2-Horns', id: 64, group: 'I',
	      	img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1230.gif'},
	      { shape: 'O', id: 65, group: 'O',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1212.gif'},
	      { shape: 'open-8', id: 66, group: '8',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1233.gif'},
	      undefined,
	      undefined,
	      undefined,
	      undefined,
	      { shape: 'sml-C/3', id: 71, group: 'C',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1199.gif'},
	      { shape: 'T', id: 72, group: 'A',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1192.gif'},
	      { shape: 'tight-C/2', id: 73, group: 'C',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1222.gif'},
	      { shape: 'tight-C', id: 74, group: 'C',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1214.gif'},
	      undefined,
	      undefined,
	      { shape: 'V/2', id: 77, group: 'V',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1209.gif'},
	      undefined,
	      { shape: 'X', id: 79, group: '1',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1220.gif'},
	      { shape: 'X-over-thumb', id: 80, group: 'A',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1271.gif'},
	      {shape: 'Y', id: 81, group: 'I',
	      	img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1227.gif'},
	      { shape: 'S', id: 82, group: 'A',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1191.gif' },
	      undefined,
	      undefined,
	      undefined,
	      undefined,
	      undefined,
	      { shape: 'bent-V', id: 88, group: 'V',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/bent-v.gif' },
	      undefined,
	      undefined,
	      { shape: 'bent-B-xd', id: 91, group: 'B',
		img: 'http://www.bu.edu/asllrp/cslgr/pages/images/bent-B-xd.gif'},
	      { shape: 'Vulcan', id: 92, group: 'B',
	      img: 'http://www.bu.edu/asllrp/cslgr/pages/images/Vulcan.gif'},
	      undefined,
	      undefined,
	      { shape: 'bent-I-L-Y', id: 95, group: 'I',
	    	img: 'http://www.bu.edu/asllrp/cslgr/pages/images/_1266.gif'}
	     ];

headregions = { 'image': 'images/220px-AlCaponemugshotCPD-vertical.png',
		'width': 107,
		'height': 277,
		'regions': {
		    'ear': {'elt': 'ellipse', 'c': [43, 192],
			      'r': [8, 11], 'xyz': [-2, 4, -2] },
		    'temple': {'elt': 'path', 'xyz': [-2, 5, -1],
			       'd': 'M 53 160 L 68 160 68 177 57 177 z'},
		    'low-temple': {'elt': 'path', 'xyz': [-2, 5, -1],
				   'd': 'M 57 178 L 68 178 68 188 57 188 z'},
		    'forehead': {'elt': 'path', 'xyz': [0, 6],
				 'd': 'M 40 17 L 72 17 72 33 40 33 z' },
		    'R-eye': {'elt': 'ellipse', 'c': [46, 42], 'r': [6, 5],
			      'xyz': [-1, 5]},
		    'L-eye': {'elt': 'ellipse', 'c': [66, 43], 'r': [6, 5],
			      'xyz': [1, 5]},
		    'R-cheek': {'elt': 'ellipse', 'c': [39, 56], 'r': [6, 7],
				'xyz': [-2, 3]},
		    'L-cheek': {'elt': 'ellipse', 'c': [73, 56], 'r': [6, 7],
				'xyz': [2, 3]},
		    'nose':  {'elt': 'ellipse', 'c': [55, 52], 'r': [7, 6],
			      'xyz': [0, 4]},
		    'mouth': {'elt': 'path', 'xyz': [0, 3],
			      'd': 'M 45 61 L 56 59 67 62 67 67 45 67 z' },
		    'chin': {'elt': 'path', 'xyz': [0, 2],
			     'd': 'M 42 71 L 67 71 67 82 42 82 z' }
		}};

bodyregions = { 'image': 'images/Wikiman.svg',
		'width': 200,
		'height': 400,
		'regions': {
		    'high-right': {'elt': 'path', 'xyz': [-2, 2],
				   'd': 'M 0 0 L 49 0 49 94 0 94 z' },
		    'above-shoulder': {'elt': 'path', 'xyz': [-1, 2],
				       'd': 'M 50 0 L 83 0 83 80 50 94 z' },
		    'right': {'elt': 'path', 'xyz': [-2, 0],
			      'd': 'M 0 95 L 49 95 49 152 0 152 z' },
		    'low-right': {'elt': 'path', 'xyz': [-2, -1],
			      'd': 'M 0 158 L 49 158 49 200 0 200 z' },
		    'neck': {'elt': 'path', 'xyz': [0, 1],
			     'd': 'M 86 68 L 118 68 118 78 86 78 z' },
		    'R-shoulder': {'elt': 'path', 'xyz': [-1, 0],
				   'd': 'M 50 95 L 83 81 83 101 50 101 z' },
		    'L-shoulder': {'elt': 'path', 'xyz': [1, 0],
				   'd': 'M 124 83 L 154 97 156 106 124 106 z' },
		    'chest': {'elt': 'path', 'xyz': [0, 0],
			      'd': 'M 66 108 L 133 108 133 152 66 152 z' },
		    'stomach': {'elt': 'path', 'xyz': [0, -1],
				'd': 'M 66 158 L 136 158 136 186 66 186 z' },
		    'waist': {'elt': 'path', 'xyz': [0, -2],
			      'd': 'M 64 188 L 138 188 140 200 64 200 z' },
		    'thigh': {'elt': 'path', 'xyz': [-1, -3],
			      'd': 'M 64 250 L 100 250 95 275 68 275 z' },
		    'upper-arm': {'elt': 'path', 'xyz': [3, 0],
				  'd': 'M 136 120 L 155 120 155 147 136 148 z'},
		    'elbow': {'elt': 'path', 'xyz': [3, -1],
			      'd': 'M 136 153 L 155 148 162 165 140 170 z' },
		    'arm': {'elt': 'path', 'xyz': [3, -2],
			    'd': 'M 140 171 L 162 166 174 208 158 214 z' },
		    'wrist': {'elt': 'path', 'xyz': [3, -3],
			      'd': 'M 158 215 L 174 209 178 221 164 228 z' },
		    'hand': {'elt': 'path', 'xyz': [3, -4],
			     'd': 'M 164 229 L 178 222 199 235 184 263 172 252 z' },
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
	 { sign: 'hello',
	   hands: 1,
	   handshape: [ [20, 20] ],
	   position: ['forehead', [-1, 6, 1]],
	   palmFace: 'outward',
	   motion: { type: 'arc',
		     dir: [-1, 0, 1] },
	   video: 'images/hello.mp4'},
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
