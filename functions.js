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

//    $('ul.locimg path').bind("click", handleImgClick);
    $('ul.locimg polygon').bind("click", handleImgClick);
    $('ul.locimg ellipse').bind("click", handleImgClick);

    $('#lookupbutton').bind('click', evalGuess);
});
