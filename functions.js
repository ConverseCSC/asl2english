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
    var result = []
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

function Sign() {
    var formElt = document.getElementById('lookupform');
    this.hands = parseNumHands(formElt.numhands.value);
    //alert(this.hands);
    this.handshape = parseHandShape(this.hands,
	                            $('#hand0shape0').val(),
	                            $('#hand0shape1').val(),
	                            $('#hand1shape0').val(),
	                            $('#hand1shape1').val());
    alert(JSON.stringify(this.handshape));

    
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
