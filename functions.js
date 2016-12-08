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

var moveClearSelected = function(event) {
    $('#locdiv path').removeClass('selected');
    $('#locdiv ellipse').removeClass('selected');
    
    if (event) {
        var locvalue = $("#loc" + $('#locstartend').val()).val();
        if (locvalue !== "") {
            $("[name='" + locvalue + "']").addClass('selected');
        }
    }
}

var handleImgClick = function(event) {
    var targName = $(event.target).attr('name');
    //console.log(targName);
    //console.log($('#locstartend').val());
    
    moveClearSelected(undefined);

    var control = document.getElementById('loc' + $('#locstartend').val());
    if (control.value.length === 0 || targName !== control.value) {
        console.log(targName + ': ' + $("[name='" + targName + "']").length);
	    $("[name='" + targName + "']").addClass('selected');
	    control.value = targName;
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
    endButton.type = 'button';
    endButton.name = handStr + 'EndButton';
    endButton.id = endButton.name;
    $(endButton).data('showText', 'Ending handshape is different');
    $(endButton).data('hideText', 'Ending handshape is the same');
    $(endButton).text($(endButton).data('showText'));
    
    startDiv.appendChild(endButton);
    divElt.appendChild(startDiv);

    var endDiv = document.createElement('div');
    endDiv.id = handStr + 'shape1div';
    $(endDiv).append('<h4>Ending:</h4>');
    $(endDiv).append(makeHandshapeSelect(handStr + 'shape1'));
    $(endDiv).hide();

    var endButtonFn = function() {
	if ($(endButton).text() === $(endButton).data('showText')) {
	    $(endDiv).show();
	    $(endButton).text($(endButton).data('hideText'));
	}
	else {
	    $(endDiv).hide();
	    $(endButton).text($(endButton).data('showText'));
	}
    };
    endButton.onclick = endButtonFn;
    
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
	    if ($('#hand1EndButton').text()
		=== $('#hand1EndButton').data('showText')) {
		$('#hand1shape1div').hide();
	    }
	    else {
		$('#hand1shape1div').show();
	    }
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

function makeImageNode(regions) {
    var imgElt = document.createElementNS('http://www.w3.org/2000/svg',
					  'image');
    imgElt.setAttribute('x', '0');
    imgElt.setAttribute('y', '0');
    imgElt.setAttribute('width', regions['width']);
    imgElt.setAttribute('height', regions['height']);
    imgElt.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
			  regions['image']);
    return imgElt;
}

function setEllipseAttributes(elt, spec) {
    elt.setAttribute('cx', spec['c'][0]);
    elt.setAttribute('cy', spec['c'][1]);
    elt.setAttribute('rx', spec['r'][0]);
    elt.setAttribute('ry', spec['r'][1]);
}

function makeTitleElt(id) {
    var title = id;
    // Strip off the 'L-' or 'R-', if present
    if (id.startsWith('R') || id.startsWith('L')) {
	title = title.substr(2);
    }
    title = title.replace('-', ' ');
    title = title.substr(0, 1).toUpperCase() + title.substr(1);

    var elt = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    var textNode = document.createTextNode(title);
    elt.appendChild(textNode);
    return elt;
}

function makeRegion(id, spec) {
    var elt = document.createElementNS('http://www.w3.org/2000/svg',
				       spec['elt']);
    switch(spec['elt']) {
    case 'ellipse':
	setEllipseAttributes(elt, spec); break;
    case 'path':
	elt.setAttribute('d', spec['d']); break;
    }

    elt.setAttribute('name', id);
    elt.appendChild(makeTitleElt(id));
    
    return elt;
}

function makeLocSVG(eltID, regions) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('id', eltID);
    svg.setAttribute('width', regions['width']);
    svg.setAttribute('height', regions['height']);
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); 
    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink",
		       "http://www.w3.org/1999/xlink");
    svg.appendChild(makeImageNode(regions));

    var regionsSpec = regions['regions'];
    for (id in regionsSpec) {
	    var regionElt = makeRegion(id, regionsSpec[id]);
	    svg.appendChild(regionElt);
    }
    return svg;
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
    //alert(JSON.stringify(guess));
    
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
	    $(".one, .moving, .two").hide();
	    $('.' + classToShow).show();
    }
    $("#numhands").change(changeHands);

    //fillHandshapeDiv(document.getElementById('hand0div'));
    //$("#hand1div").append(makeHand1Button());
    //fillHandshapeDiv(document.getElementById('hand1div'));
    //$('#hand1shape0div').hide();
    //$('#hand1div').hide();
    
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

    $('#locstartend').bind('change', moveClearSelected);
    $('#sideimgitem').append(makeLocSVG('sideimg', sideregions));
    $('#frontimgitem').append(makeLocSVG('frontimg', frontregions));

    $('ul.locimg path').bind("click", handleImgClick);
    $('ul.locimg ellipse').bind("click", handleImgClick);

    $('#lookupbutton').bind('click', evalGuess);
});
