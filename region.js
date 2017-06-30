/* global $ */

function setEllipseAttributes(elt, spec) {
    elt.setAttribute('cx', spec['c'][0]);
    elt.setAttribute('cy', spec['c'][1]);
    elt.setAttribute('rx', spec['r'][0]);
    elt.setAttribute('ry', spec['r'][1]);
}

var moveClearSelected = function(event) {
    //$('#locdiv path').removeClass('selected');
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
    //console.log(elt);
    //console.log(elt['0']);
    //console.log('SVG: ' + elt.ownerSVGElement);
    var pt = elt.ownerSVGElement.createSVGPoint();
    //console.log(elt.tagName);
    if (elt.tagName === "ellipse") { // Ellipse
        pt.x = elt.getAttribute('cx');
        pt.y = elt.getAttribute('cy');
    }
    else if (elt.tagName === "polygon") { // Polygon
        pt.x = pt.y = 0;
        //console.log(elt.points);
        var numPts = elt.points.length;
        for (var i = 0; i < numPts; i++) {
            var vertex = elt.points.getItem(i);
            pt.x += vertex.x;
            pt.y += vertex.y;
        }
        pt.x /= numPts;
        pt.y /= numPts;
    }
    
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
    console.log('this: ' + $(this).parent());
    console.log($(elt).parent());
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
    //console.log(targName);
    //console.log($('#locstartend').val());
    
    moveClearSelected(undefined);

    var control = document.getElementById('loc' + $('#locstartend').val());
    if (control.value.length === 0 || targName !== control.value) {
        //var offset = $(event.target).offset();        
        console.log(targName + ': ' + $("[name='" + targName + "']").length);
        //var center = getRegionCenter($(event.target)['0']);
        //console.log('center: ' + center + ' ' + center.x + ',' + center.y);
        //$(event.target).parent().append(makeMark(, center));
        removeMarks(($('#locstartend').val() == 0));
	    $("[name='" + targName + "']").each(addMark);
	    control.value = targName;
    }
    else {
	    control.value = "";
    }
};

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
        //case 'path':
    	//    elt.setAttribute('d', spec['d']); break;
    	case 'polygon':
    	    elt.setAttribute('points', spec['points']); break;
    }

    elt.setAttribute('name', id);
    elt.appendChild(makeTitleElt(id));
    
    return elt;
}

