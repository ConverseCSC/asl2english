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
    if ((value === "") || (value === null)) {
	return undefined;
    }
    else return value;
}

function parseHandShape(numHands, hand0start, hand0end,
			hand1start, hand1end) {
    var result = [];
    var start = valueOrUndefined(hand0start);
    var end = valueOrUndefined(hand0end);
    result.push([start, end]);
    
    if (numHands > 1) {
	start = valueOrUndefined(hand1start);
	end = valueOrUndefined(hand1end);
	result.push([start, end]);
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
    case 'L-eye': // [1, 5, z]
	result[0] = 1; result[1] = 5; break;
    case 'R-eye': // [-1, 5, z]
	result[0] = -1; result[1] = 5; break;
    case 'temple': // [-2, 5, -1]
	result[0] = -2; result[1] = 5; result[2] = -1; break;
    case 'ear':  // [-2, 4, -2]
	result[0] = -2; result[1] = 4; result[2] = -2; break;
    case 'nose': // [0, 4, z]
	result[1] = 4; break;
    case 'L-cheek': // [2, 3, z]
	result[0] = 2; result[1] = 3; break;
    case 'R-cheek': // [-2, 3, z]
	result[0] = -2; result[1] = 3; break;
    case 'mouth': // [0, 3, z]
	result[1] = 3; break;
    case 'chin': // [0, 2, z]
	result[1] = 2; break;
    case 'neck': // [0, 1, z]
	result[1] = 1; break;
    case 'L-shoulder': // [1, 0, z]
	result[0] = 1; break;
    case 'R-shoulder': // [-1, 0, z]
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

    this.handshape = parseHandShape(this.hands,
	                            $('#hand0shape0').val(),
	                            $('#hand0shape1').val(),
	                            $('#hand1shape0').val(),
	                            $('#hand1shape1').val());
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
    var diff = CLEARLY_DIFFERENT;
    if (shape1 === shape2) {
	diff = 0;
    }
    else if (shape1 === 'undefined' || shape2 === 'undefined') {
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
	var d = Math.abs(v1[i] - v2[1]);
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
    return result;
}


function makeHandshapeSelect(id) {
    var selectElt = document.createElement('select');
    selectElt.id = id;
    selectElt.name = id;
    selectElt.className = 'handshape';

    var optElt = document.createElement('option');
    optElt.innerHTML = '&mdash;Select&mdash;';
    optElt.value = "";
    selectElt.appendChild(optElt);
    
    var makeShapeGroup = function(idx, group) {
	var groupElt = document.createElement('optgroup');
	groupElt.label = '';
	$.each(group, function(i, shapeIdx) {
	    var shape = handshapes[shapeIdx];
	    var optElt = document.createElement('option');
	    optElt.text = shape.shape;
	    optElt.value = shape.id;
	    optElt.setAttribute('data-img-src', shape.img);
	    groupElt.appendChild(optElt);
	});

	selectElt.appendChild(groupElt);
    };
    
    $.each(shapegroups, makeShapeGroup);

    return selectElt;
}

var handleImgClick = function(event) {
    var targName = event.target.id;
    //alert(targName);
    
    var control = document.getElementById('loc0');
    if (targName.endsWith('1')) {
	control = document.getElementById('loc1');
	$('#locdiv1 path').removeClass('selected');
	$('#locdiv1 ellipse').removeClass('selected');
    }
    else {
	$('#locdiv0 path').removeClass('selected');
	$('#locdiv0 ellipse').removeClass('selected');
    }

    if (control.value.length == 0 || !(targName.startsWith(control.value))) {
	$('#' + targName).addClass('selected');
	control.value = targName.slice(0, -1);
    }
    else {
	control.value = "";
    }
}

function fillHandshapeDiv(divElt) {
    $(divElt).append('<h4>Beginning:</h4>');
    var handStr = divElt.id.substring(0, 5);
    $(divElt).append(makeHandshapeSelect(handStr + 'shape0'));

    var endButton = document.createElement('button');
    var showText = 'Ending handshape is different';
    var hideText = 'Ending handshape is the same';
    endButton.type = 'button';
    endButton.name = handStr + 'EndButton';
    endButton.id = endButton.name;
    $(endButton).text(showText);
    divElt.appendChild(endButton);

    var endDiv = document.createElement('div');
    $(endDiv).append('<h4>Ending:</h4>');
    $(endDiv).append(makeHandshapeSelect('hand0shape1'));
    $(endDiv).hide();

    var endButtonFn = function() {
	$(endDiv).toggle();
	if ($(endButton).text() == showText) {
	    $(endButton).text(hideText);
	}
	else {
	    $(endButton).text(showText);
	}
    };
    endButton.onclick = endButtonFn;
    
    divElt.appendChild(endDiv);
}

function evalGuess() {
    var sign = Sign();

    for (var s = 0; s < signs.length; s++) {
	signs[s].diff = compareSigns(sign, signs[s]);
    }
    var possibles = signs.filter(function(elt, idx, arr) {
	return (elt.diff < CLEARLY_DIFFERENT);
    });
    possibles.sort(function(a, b) {
	return a.diff - b.diff;
    })
    
    // Display the possibilities
    
}

$(document).ready( function() {
    var changeHands = function() {
	var classToShow = $("#numhands option:selected").val();
	//alert(classToShow);
	$(".one, .moving, .two").hide();
	$('.' + classToShow).show();
    }
    $("#numhands").change(changeHands);

    fillHandshapeDiv(document.getElementById('hand0div'));
    fillHandshapeDiv(document.getElementById('hand1div'));
    
    $("select.handshape").imagepicker({
	/*hide_select: false,*/
	show_label: true
    });

    // Add appropriate ALT text to the picker images
    $("img.image_picker_image").each(function(i) {
	var text = $(this).next('p').text();
	$(this).attr('alt',text);
	$(this).attr('title',text);
    });

    $('ul.locimg path').bind("click", handleImgClick);
    $('ul.locimg ellipse').bind("click", handleImgClick);

    $('#lookupbutton').bind('click', evalGuess);
});
