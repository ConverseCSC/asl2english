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
    var handStr = divElt.id.substring(0, 5);
    
    var startDiv = document.createElement('div');
    startDiv.id = handStr + 'shape0div';
    $(startDiv).append('<h4>Beginning:</h4>');
    $(startDiv).append(makeHandshapeSelect(handStr + 'shape0'));

    var endButton = document.createElement('button');
    var showText = 'Ending handshape is different';
    var hideText = 'Ending handshape is the same';
    endButton.type = 'button';
    endButton.name = handStr + 'EndButton';
    endButton.id = endButton.name;
    $(endButton).text(showText);
    startDiv.appendChild(endButton);
    divElt.appendChild(startDiv);

    var endDiv = document.createElement('div');
    endDiv.id = handStr + 'shape1div';
    $(endDiv).append('<h4>Ending:</h4>');
    $(endDiv).append(makeHandshapeSelect(handStr + 'shape1'));
    $(endDiv).hide();

    var endButtonFn = function() {
	$(endDiv).toggle();
	if ($(endButton).text() === showText) {
	    $(endButton).text(hideText);
	}
	else {
	    $(endButton).text(showText);
	}
    };
    endButton.onclick = endButtonFn;

    // This doesn't trigger properly.  Why Not?
    var endButtonReset = function() {
	$(endButton).text(showText);
	$(endDiv).hide();
    }
    endButton.onreset = endButtonReset;
    
    divElt.appendChild(endDiv);
}

function makeHand1Button() {
    var hand1Button = document.createElement('button');
    hand1Button.type = 'button';
    hand1Button.id = 'showHand1ShapeButton';
    $(hand1Button).data('showText', 'Non-dominant handshape is different');
    $(hand1Button).data('hideText', 'Non-dominant handshape is the same');
    $(hand1Button).text($(hand1Button).data('showText'));

    var hand1ButtonFn = function () {
	if ($(hand1Button).text() === $(hand1Button).data('showText')) {
	    $('#hand1shape0div').show();
	    $('#hand1shape1div').hide();
	    $(hand1Button).text($(hand1Button).data('hideText'));
	}
	else {
	    $('#hand1shape0div').hide();
	    $('#hand1shape1div').hide();
	    $(hand1Button).text($(hand1Button).data('showText'));
	}      
    };
    hand1Button.onclick = hand1ButtonFn;

    return hand1Button;
}

function makeSignRow(sign) {
    var row = document.createElement('tr');
    row.id = sign.sign + '-row';
    row.className = 'signrow';
    
    var th = document.createElement('th');
    th.id = sign.sign + '-title';
    th.className = 'signtitle';
    $(th).text(sign.sign);
    row.appendChild(th);
    
    var signSrc = document.createElement('source');
    signSrc.src = sign.video;
    signSrc.type = 'video/mp4';
    
    var signVid = document.createElement('video');
    signVid.id = sign.sign + '-video';
    signVid.className = 'signvideo';
    signVid.appendChild(signSrc);
    $(signVid).attr('controls', 'on');

    var td = document.createElement('td');
    td.appendChild(signVid);
    row.appendChild(td);
    
    return row;
}

function showSigns(signsToShow) {
    $('#results').empty();
    signsToShow.forEach(function(item, idx, arrayVar) {
	$('#results').append(makeSignRow(item));
    });
}

function evalGuess() {
    var guess = new Sign();
    alert(JSON.stringify(guess));
    
    for (var s = 0; s < signs.length; s++) {
	signs[s].diff = compareSigns(guess, signs[s]);
    }
    var possibles = signs.filter(function(elt, idx, arr) {
	return (elt.diff < CLEARLY_DIFFERENT);
    });
    possibles.sort(function(a, b) {
	return a.diff - b.diff;
    })
    
    //alert(JSON.stringify(possibles));

    // Display the possibilities
    showSigns(possibles);
}

$(document).ready( function() {
    var changeHands = function() {
	var classToShow = $("#numhands option:selected").val();
	if (classToShow === 'one') {
	    $('#hand1shape0div').hide();
	    $('#hand1shape1div').hide();
	    $('#showHand1ShapeButton').text(
		$('#showHand1ShapeButton').data('showText'));
	    $('#hand1div').hide();
	}
	//alert(classToShow);
	$(".one, .moving, .two").hide();
	$('.' + classToShow).show();
    }
    $("#numhands").change(changeHands);

    fillHandshapeDiv(document.getElementById('hand0div'));
    $("#hand1div").append(makeHand1Button());
    fillHandshapeDiv(document.getElementById('hand1div'));
    $('#hand1div').hide();
    
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
