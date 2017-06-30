/* global $ */

// From sign.js
/* global Sign */
/* global compareSigns */
/* global CLEARLY_DIFFERENT */

// From data.js
/* global handshapes */
/* global shapegroups */
/* global signs */
/* global sideregions */
/* global frontregions */

// From region.js
/* global handleImgClick */
/* global makeRegion */
/* global moveClearSelected */


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

function fillHandshapeDiv(divElt) {
    var handStr = divElt.id.substring(0, 5);
    
    var startDiv = document.createElement('div');
    startDiv.id = handStr + 'shape0div';
    $(startDiv).append(makeHandshapeSelect(handStr + 'shape0'));

    var endButton = document.createElement('button');
    endButton.type = 'button';
    endButton.name = handStr + 'EndButton';
    endButton.id = endButton.name;
    $(endButton).data('showText', 'Ending handshape is different');
    $(endButton).data('hideText', 'Ending handshape is the same');
    $(endButton).text($(endButton).data('showText'));
    $(endButton).hide();
    
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
    for (var id in regionsSpec) {
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
    
    // Change way file path is done
    var video_path = "https://moodle.converse.edu/asl2english/videos/";
    
    var signSrc = document.createElement('source');
    signSrc.src = video_path + sign.video;
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
    };
    $("#numhands").change(changeHands);
   
   $('#hand0div').append(makeHandshapeSelect('hand0shape0'));
   $('#hand1div').append(makeHandshapeSelect('hand0shape1'));
   $('#hand2div').append(makeHandshapeSelect('hand1shape0'));
   $('#hand3div').append(makeHandshapeSelect('hand1shape1'));
   
    
    $("select.handshape").imagepicker({
	    /*hide_select: false,*/
	    show_label: true
	    
    });
    
    $( "select.handshape" ).change(function() {
        
        var pop = document.getElementById('popup');
        var pop1 = document.getElementById('popup1');
        var pop2 = document.getElementById('popup2');
        var pop3 = document.getElementById('popup3');
        
        if (pop.style.display == "block"){
            var image0 = handshapes[$('#hand0shape0').val()].img;
            if (handshapes[$('#hand0shape1').val()] == undefined){
                 $("#hand0shape1img").attr('src', image0);
            }
            $("#hand0shape0img").attr('src', image0);
            pop.style.display = "none";
        }
        
         if (pop1.style.display == "block"){
            var image1 = handshapes[$('#hand0shape1').val()].img;
            $("#hand0shape1img").attr('src', image1);
            pop1.style.display = "none";
        }
        
        if (pop2.style.display == "block"){
            var image2 = handshapes[$('#hand1shape0').val()].img;
             if (handshapes[$('#hand1shape1').val()] == undefined){
                 $("#hand1shape1img").attr('src', image2);
            }
            $("#hand1shape0img").attr('src', image2);
            pop2.style.display = "none";
        }
        
         if (pop3.style.display == "block"){
            var image3 = handshapes[$('#hand1shape1').val()].img;
            $("#hand1shape1img").attr('src', image3);
            pop3.style.display = "none";
        }
        
        
        

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


window.onload = function(){ 
    // Get the modal
    
    //Starting Dom
var pop = document.getElementById('popup');
var pop1 = document.getElementById('popup1');
var pop2 = document.getElementById('popup2');
var pop3 = document.getElementById('popup3');

// Get the button that opens the modal
var btn = document.getElementById("btn");
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span1 = document.getElementsByClassName("close")[1];
var span2 = document.getElementsByClassName("close")[2];
var span3 = document.getElementsByClassName("close")[3];


// STARTING DOMINANT

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    pop.style.display = "block";
    return false;
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    pop.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == pop) {
        pop.style.display = "none";
    }
};


// ENDING DOMINANT


// When the user clicks on the button, open the modal 
btn1.onclick = function() {
    pop1.style.display = "block";
    return false;
};

// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
    pop1.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == pop1) {
        pop1.style.display = "none";
    }
};


// STARTING NON-DOMINANT


// When the user clicks on the button, open the modal 
btn2.onclick = function() {
    pop2.style.display = "block";
    return false;
};

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
    pop2.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == pop2) {
        pop2.style.display = "none";
    }
};


// ENDING NON DOMINANT

// When the user clicks on the button, open the modal 
btn3.onclick = function() {
    pop3.style.display = "block";
    return false;
};

// When the user clicks on <span> (x), close the modal
span3.onclick = function() {
    pop3.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == pop3) {
        pop3.style.display = "none";
    }
};


};