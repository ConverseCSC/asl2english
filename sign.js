/* global $ */

// From data.js:
/* global handshapes */
/* global frontregions */
/* global sideregions */

// Defined here, used elsewhere:
/* global CLEARLY_DIFFERENT */

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
    var result = value;
    if ((value === "") || (value === null)) {
    	result = undefined;
    }
    else if (typeof value === "string") {
	    result = value.toLowerCase();
    }
    return result;
}

function parseOneHandShape(startSpec, endSpec) {
    var start = valueOrUndefined(startSpec);
    var end = valueOrUndefined(endSpec);
    if (end === undefined) {  // End defaults to the value of start
        end = start;
    }
    return [start, end];
}

function parseHandShape(numHands) {
    var result = [];
    var hand0start = $('#hand0shape0').val();
    var hand0end = $('#hand0shape1').val();
    if ( $('#hand0shape1div').is(':hidden')) {
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

function parsePositionXYZ(loc) {
    // This uses a left-handed coordinate system centered on the chest.
    // +X is toward the signer's dominant side (usually the viewer's
    // left).  +Y is up.  +Z is away from the signer, towards the viewer.
    var result = [undefined, undefined, undefined];    
    // Set X and Y from loc
    if ([0, 'sightline'].includes(loc)) {
	   loc = 'chest';
    }

    if (Array.isArray(loc)) {
	    result = loc.slice();
    }
    else if (loc in frontregions.regions) {
	    result = frontregions.regions[loc]['xyz'].slice();
    }
    else if (loc in sideregions.regions) {
	    result = sideregions.regions[loc]['xyz'].slice();
    }
    // Set Z, if not done already (defaults to 0)
    if (result.length === 2) {
	    result.push(0);
    }
    return result;
}


function parseMotion(movetype, loc0, loc1) {
    var result = {};
    result.type = valueOrUndefined(movetype);

    var start = parsePositionXYZ(valueOrUndefined(loc0));
    var end = parsePositionXYZ(valueOrUndefined(loc1));

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

    this.handshape = parseHandShape(this.hands);
    
    this.position = parsePositionText($('#loc0').val(),
				      $('#loc1').val());
    
    this.palmface = valueOrUndefined($('#palm').val());

    this.motion = parseMotion($('#movetype').val(),
			      $('#loc0').val(),
			      $('#loc1').val());
}

CLEARLY_DIFFERENT = 1000;

function compareHandshapes(shape1, shape2) {
    // Shape1 is a integer as a string or undefined.  Shape2 is an integer, an array, or null.
    var diff = CLEARLY_DIFFERENT;
    
    // FIX THIS
    if (shape1 === undefined || shape2 === undefined) {
        diff = 2;
    }
    else if (shape1 === null || shape2 === null) {
        diff = 0;
    }
    else {
        var s1 = parseInt(shape1, 10);
        //console.log('Handshapes: ' + JSON.stringify(shape1) + ', ' + JSON.stringify(shape2));
        if (shape2.constructor === Array) {
            diff = Math.min(...shape2.map(function(hs) { return compareHandshapes(s1, hs);} ));
        }
        else {
            var s2 = parseInt(shape2, 10);
            if (s1 === s2) {
                diff = 0;
            }
            // BASE HAND matches anything
            else if ((s1 === 93) || (s2 === 93)) {
                diff = 0;
            }
            else {
                if (s1 > s2) {
                    var temp = s1;
                    s1 = s2;
                    s2 = temp;
                }
                if (shape_dist_overrides[s1][s2]) {
                    diff = shape_dist_overrides[s1][s2];
                }
                else if (handshapes[s1].group === handshapes[s2].group) {
    	           diff = 1;
                }
            }
        }
        /*
        else if (shape2 !== null && shape2.constructor === Array){
            if (shape2.indexOf(shape1) >= 0) {
	            diff = 0;
            }
            else {
                for (var i = 0; i < shape2.length; i++) { 
                    if (shape2[i] !== null && handshapes[shape1].group === handshapes[shape2[i]].group) {
                        diff = 1;
                    }
                }
            }
        }
        else {
            if (shape1 == shape2) {
	            diff = 0;
            }
            else if (handshapes[shape1].group === handshapes[shape2].group) {
    	        diff = 1;
            }
        }
        */
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

function comparePositions(pos1, pos2, tolerance, weight) {
    var pt1 = parsePositionXYZ(pos1, false);
    var pt2 = parsePositionXYZ(pos2, false);
    var diff = cmpVec3(pt1, pt2, tolerance);
    if (diff < CLEARLY_DIFFERENT) {
        diff = diff * weight;
    }
    return diff;
}

function compareNumHands(sign1, sign2) {
    // Weighting factor; difference between one- and two-handed signs
    var HAND_DIFF = 0.5;
    var result = HAND_DIFF * Math.abs(sign1.hands - sign2.hands); // 0, 0.25, or 0.5;
    if (result === 0.5 * HAND_DIFF) {
        result = 3;
    }
    return result;
}

function compareSignHandshapes(sign1, sign2) {
    // FIX HANDSHAPE COMPARISON

    // Length of the handshape arrays is 1 for 1-handed signs,
    //   and 2 for everything else.  Ignore an unmatched second hand.
    var numHands = Math.min(sign1.handshape.length, sign2.handshape.length);

    // Dominant
    var result = compareHandshapes(sign1.handshape[0][0], sign2.handshape[0][0]);
    result += compareHandshapes(sign1.handshape[0][1], sign2.handshape[0][1]);
    
    // Allow non-dominant to be de-weighted
    if (numHands > 1) {
        var nd = compareHandshapes(sign1.handshape[1][0], sign2.handshape[1][0]);
        nd += compareHandshapes(sign1.handshape[0][1], sign2.handshape[0][1]);
        result += nd;
    }

    return result;
}

function compareSigns(sign1, sign2) {
    // Compare number of hands
    var result = compareNumHands(sign1, sign2);

    result += compareSignHandshapes(sign1, sign2);

    // Compare positions
    // Starting position has a big tolerance, and differences matter less
    var weight = 1;
    result += comparePositions(sign1.position[0], sign2.position[0], 8, weight);
    // Ending position defaults to starting position
    var endpos1 = sign1.position[1];
    var endpos2 = sign2.position[1];
    if (endpos1 === undefined || endpos2 === undefined) {
        weight = weight / 2; // If the endpoint defaults, count it as only half of the beginning point
    }
    else {
        weight = 1; // If endpoints are specified, they get full weight
    }
    if (endpos1 == undefined) {
        endpos1 = sign1.position[0];
    }
    if (endpos2 == undefined) {
        endpos2 = sign2.position[0];
    }
    result += comparePositions(endpos1, endpos2, 4, weight);

    // Compare palm faces - increased to 2 from 1
    if (sign1.palmface !== sign2.palmface) {
        result += 2;
    }
    // Compare motions
    if (sign1.motion.type !== sign2.motion.type) {
        result += 2;
    }
    result += cmpVec3(sign1.motion.dir, sign2.motion.dir, 2); // Increased tolerance, direction is too nebulous

    return result;
}
