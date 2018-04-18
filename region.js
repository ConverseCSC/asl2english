/* global $ */

function setEllipseAttributes(elt, spec) {
    elt.setAttribute('cx', spec['c'][0]);
    elt.setAttribute('cy', spec['c'][1]);
    elt.setAttribute('rx', spec['r'][0]);
    elt.setAttribute('ry', spec['r'][1]);
}

var moveClearSelected = function(event) {
    $('#locdiv polygon').removeClass('selected');
    $('#locdiv ellipse').removeClass('selected');
    
    if (event) {
        var locvalue = $("#loc" + $('#locstartend').val()).val();
        if (locvalue !== "") {
            $("[name='" + locvalue + "']").addClass('selected');
        }
    }
};

function getRegionCenter(elt) {
    var svg = elt.ownerSVGElement;
    var rect = elt.getBoundingClientRect();
    var pt = svg.createSVGPoint();
    var svgrect = svg.getBoundingClientRect();

    pt.x = rect.left - svgrect.left + rect.width/2;
    pt.y = rect.top - svgrect.top + rect.height/2;
    
    return pt;
}

var markSize = 5;

function makeStartMark(pt) {
    var elt = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    var dString = 'M' + (pt.x - markSize) + ' ' + (pt.y - markSize);
    dString += ' l' + (2*markSize) + ' ' + (2*markSize);
    dString += ' m' + (-2*markSize) + ' 0' ;
    dString += ' l' + (2*markSize) + ' ' + (-2*markSize);
    elt.setAttribute('d', dString);
    return elt;
}

function makeEndMark(pt) {
    var elt = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    elt.setAttribute('cx', pt.x);
    elt.setAttribute('cy', pt.y);
    elt.setAttribute('r', markSize);
    return elt;
}

function markName(startp) {
    var name = 'loc-end-mark';
    if (startp) {
        name = 'loc-start-mark';
    }
    return name;
}

function removeMarks(startp) {
    $("[name='" + markName(startp) + "']").remove();
    
}

function addMark(idx, elt) {
    var pt = getRegionCenter(elt);
    var startp = ($('#locstartend').val() == 0);
    
    var mark;
    if (startp) {
        mark = makeStartMark(pt);
    }
    else {
        mark = makeEndMark(pt);
    }
    mark.setAttribute('name', markName(startp));
    mark.setAttribute('class', 'mark');
    $(elt).parent().append(mark);
    
    return mark;
}

var handleImgClick = function(event) {
    var targName = $(event.target).attr('name');
    
    moveClearSelected(undefined);

    var control = document.getElementById('loc' + $('#locstartend').val());
    if (control.value.length === 0 || targName !== control.value) {
        removeMarks(($('#locstartend').val() == 0));
	    $("[name='" + targName + "']").each(addMark);
	    control.value = targName;
    }
    else {
	    control.value = "";
	   removeMarks(($('#locstartend').val() == 0));
    }
};

function makeTitleElt(id) {
    var title = id;
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
    	case 'polygon':
    	    elt.setAttribute('points', spec['points']); break;
    }

    elt.setAttribute('name', id);
    elt.appendChild(makeTitleElt(id));
    
    return elt;
}

