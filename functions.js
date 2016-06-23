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
    alert(targName);
    
    var control = document.getElementById('loc0');
    if (targName.endsWith('1')) {
	control = document.getElementById('loc1');
    }

    control.value = targName.slice(0, -1);
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

$(document).ready( function() {
    var changeHands = function() {
	var classToShow = $("#numhands option:selected").val();
	alert(classToShow);
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

    $('ul.locimg area').bind("click", handleImgClick);
});
