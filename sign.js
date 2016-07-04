function parseNumHands(val) {
    var result = 0;
    switch (val) {
    case 'one':
	result = 1;
	break;
    case 'two':
	result = 2;
	break;
    case 'moving':
	result = 1.5;
	break;
    }
    return result;
}

function valueOrUndefined(value) {
    result = value;
    if ((value === "") || (value === null)) {
	result = undefined;
    }
    else if (typeof(value) === "string") {
	result = value.toLowerCase();
    }
    return result;
}

function parseOneHandShape(startSpec, endSpec) {
    var start = valueOrUndefined(startSpec);
    var end = valueOrUndefined(endSpec);
    return [start, end];
}

function parseHandShape(numHands) {
    var result = [];
    var hand0start = $('#hand0shape0').val();
    var hand0end = $('#hand0shape1').val();
    if ($('#hand0shape1div').is(':hidden')) {
	hand0end = hand0start;
    }
    result.push(parseOneHandShape(hand0start, hand0end));

    if (numHands > 1) {
	var hand1start = $('#hand1shape0').val();
	var hand1end = $('#hand1shape1').val();
	if ($('#hand1shape0div').is(':hidden')) {
	    hand1start = hand0start;
	    hand1end = hand0end;
	}
	else if ($('#hand1shape1div').is(':hidden')) {
	    hand1end = hand1start;
	}
	result.push(parseOneHandShape(hand1start, hand1end));
    }
    
    return result;
}

function parsePositionText(loc0val, loc1val) {
    var result = [];
    result.push(valueOrUndefined(loc0val));
    result.push(valueOrUndefined(loc1val));
    return result;
}

function parsePositionXYZ(loc, inFront) {
    // This uses a left-handed coordinate system centered on the chest.
    // +X is toward the signer's non-dominant side (usually the viewer's
    // right).  +Y is up.  +Z is away from the signer, towards the viewer.
    var result = [0, 0, 0];    
    //alert(loc);
    // Set X and Y from loc
    switch (loc) {
    case undefined:
	result[0] = result[1] = result[2] = undefined; break; 
    case 'forehead': // [0, 6, z]
	result[1] = 6; break;
    case 'l-eye': // [1, 5, z]
	result[0] = 1; result[1] = 5; break;
    case 'r-eye': // [-1, 5, z]
	result[0] = -1; result[1] = 5; break;
    case 'temple': // [-2, 5, -1]
	result[0] = -2; result[1] = 5; result[2] = -1; break;
    case 'ear':  // [-2, 4, -2]
	result[0] = -2; result[1] = 4; result[2] = -2; break;
    case 'nose': // [0, 4, z]
	result[1] = 4; break;
    case 'l-cheek': // [2, 3, z]
	result[0] = 2; result[1] = 3; break;
    case 'r-cheek': // [-2, 3, z]
	result[0] = -2; result[1] = 3; break;
    case 'mouth': // [0, 3, z]
	result[1] = 3; break;
    case 'chin': // [0, 2, z]
	result[1] = 2; break;
    case 'neck': // [0, 1, z]
	result[1] = 1; break;
    case 'l-shoulder': // [1, 0, z]
	result[0] = 1; break;
    case 'r-shoulder': // [-1, 0, z]
	result[0] = -1; break;
    case 0:
    case 'sightline':
    case 'chest': // [0, 0, z]
	break;
    case 'stomach': // [0, -1, z]
	result[1] = -1; break;
    case 'waist': // [0, -2, z]
	result[1] = -2; break;
    case 'elbow': // [1, -1, z]
	result[0] = 3; result[1] = -1; break;
    case 'arm': // [1, -2, z]
	result[0] = 3; result[1] = -2; break;
    case 'wrist': // [1, -3, z]
	result[0] = 3; result[1] = -3; break;
    case 'hand': // [1, -4, z]
	result[0] = 3; result[1] = -4; break;
    }

    // Set Z, if not done already
    if (result[2] === 0 && inFront === true) {
	result[2] = 1;
    }
    return result;
}


function parseMotion(movetype, infront0, loc0, infront1, loc1) {
    var result = {};
    result.type = valueOrUndefined(movetype);

    var start = parsePositionXYZ(valueOrUndefined(loc0), infront0);
    var end = parsePositionXYZ(valueOrUndefined(loc1), infront1);

    if (start[0] === undefined || end[0] === undefined) {
	result.dir = [undefined, undefined, undefined];
    }
    else {
	result.dir = [Math.sign(end[0] - start[0]),
		      Math.sign(end[1] - start[1]),
		      Math.sign(end[2] - start[2])];
    }
    
    return result;
}

function Sign() {
    var formElt = document.getElementById('lookupform');
    this.hands = parseNumHands(formElt.numhands.value);
    //alert(this.hands);

    this.handshape = parseHandShape(this.hands);
    //alert(JSON.stringify(this.handshape));
    
    this.position = parsePositionText($('#loc0').val(),
				      $('#loc1').val());
    //alert(JSON.stringify(this.position));
    
    this.palmFace = valueOrUndefined($('#palm').val());
    //alert(this.palmFace);

    this.motion = parseMotion($('#movetype').val(),
			      $('#locinfront0')[0].checked,
			      $('#loc0').val(),
			      $('#locinfront1')[0].checked,
			      $('#loc1').val());
    //alert(JSON.stringify(this.motion));
}

var CLEARLY_DIFFERENT = 1000;

function compareHandshapes(shape1, shape2) {
    //alert('Handshapes: ' + JSON.stringify(shape1) + ', ' + JSON.stringify(shape2));
    var diff = CLEARLY_DIFFERENT;
    if (shape1 == shape2) {
	diff = 0;
    }
    else if (shape1 === undefined || shape2 === undefined) {
	diff = 1;
    }
    else if (handshapes[shape1].group === handshapes[shape2].group) {
	diff = 1;
    }
    return diff;
}

function cmpVec3(v1, v2, tolerance) {
    var diff = 0;
    for (var i = 0; i < 3; i++) {
	var d = Math.abs(v1[i] - v2[i]);
	if (d > tolerance) {
	    diff = CLEARLY_DIFFERENT;
	}
	else if (d > 0 && diff < CLEARLY_DIFFERENT) {
	    diff = 1;
	}
    }
    return diff;
}    

function comparePositions(pos1, pos2) {
    var pt1 = parsePositionXYZ(pos1, false);
    var pt2 = parsePositionXYZ(pos2, false);
    return cmpVec3(pt1, pt2, 2);
}

function compareSigns(sign1, sign2) {
    // if (sign1.hands === 1.5 && sign2.hands === 1.5) {
    // 	alert('sign1: ' + JSON.stringify(sign1));
    // 	alert('sign2: ' + JSON.stringify(sign2));
    // }
    var result = 2 * Math.abs(sign1.hands - sign2.hands); // 0, 1, or 2
    if (result > 1) { // One-handed vs. two-handed 
	result = CLEARLY_DIFFERENT;
    }
    else {
	// Compare handshapes
	var numHands = sign1.handshape.length;
	if (sign1.handshape.length != sign2.handshape.length) {
	    // Number of hands must differ
	    result += 2; // Treat the missing values as undefined
	    numHands = 1; // Minimum value
	}
	for (var hand = 0; hand < numHands; hand++) {
	    for (var end = 0; end < 2; end++) {
		result += compareHandshapes(sign1.handshape[hand][end],
					    sign2.handshape[hand][end]);
	    }
	}

	// Compare positions
	for (end = 0; end < 2; end++) {
	    result += comparePositions(sign1.position[end],
				       sign2.position[end]);
	}

	// Compare palm faces
	if (sign1.palmFace !== sign2.palmFace) {
	    result += 1;
	}

	// Compare motions
	// Make this more intelligent later
	if (sign1.motion.type !== sign2.motion.type) {
	    result += 1;
	}
	result += cmpVec3(sign1.motion.dir, sign2.motion.dir, 1);
    }

    // if (sign1.hands === 1.5 && sign2.hands === 1.5) {
    // 	alert('Final result: ' + result);
    // }
    return result;
}
