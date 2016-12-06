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
        var offset = $(event.target).offset();        
        console.log(targName + ': ' + $("[name='" + targName + "']").length);
        console.log($(event.target).get().ownerSVGElement);
        console.log(event.pageX + ',' + event.pageY 
                    + ' - ' + offset.left + ',' + offset.top);
	    $("[name='" + targName + "']").addClass('selected');
	    control.value = targName;
    }
    else {
	    control.value = "";
    }
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
