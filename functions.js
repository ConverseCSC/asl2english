/* global $ */

// From sign.js
/* global Sign */
/* global compareSigns */
/* global CLEARLY_DIFFERENT */

// From data.js
/* global handshapes */
/* global shapegroups */
/* global sideregions */
/* global frontregions */

// From signdata.js
/* global signs */

// From region.js
/* global handleImgClick */
/* global makeRegion */
/* global moveClearSelected */


// NUM HANDS FUNCTIONS
// changeHands

function changeHands() {
    var classToShow = $("#numhands option:selected").val();
    $(".one, .moving, .two").hide();
    $('.' + classToShow).css( "display", "inline" );
};

// HANDSHAPE UI FUNCTIONS
// makeHandshapeSelect, showMoreHandshapes, addShowMoreButton.
//   fillHandshapeDiv, handshapePopUp, open, close, lockFocus, 
//     popUpControls, imagePickerSet

var i = 0; // Show more handshapes counter

function makeHandshapeSelect(i, id) {
    if (i > 0) {
        var selectElt = document.getElementById(id);
        var optElt = document.getElementById(id);
        
    } else {
        var selectElt = document.createElement('select');
        selectElt.id = id;
        selectElt.name = id;
        selectElt.className = 'handshape';
        

        var optElt = document.createElement('option');
        optElt.innerHTML = '&mdash;Select&mdash;';
        optElt.value = "";
        selectElt.appendChild(optElt);
    }
    
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
    
    if ($(window).width() > 435) {     
        // groups of 6, 23 so 3 groups of 6, one group of 5
       if (i > 4){
           return;
       }
       else if(i == 1) {
          for (var j = 4; j < 9; j++) {
            makeShapeGroup(0, shapegroups[j]);
            } 
       } else if (i == 2) {
          for (var j = 9; j < 14; j++) {
            makeShapeGroup(0, shapegroups[j]);
            }
       } else if (i == 3) {
          for (var j = 14; j < 19; j++) {
            makeShapeGroup(0, shapegroups[j]);
            }
       } else if (i == 4) {
           for (var j = 19; j < 24; j++) {
            makeShapeGroup(0, shapegroups[j]);
            }
        }
       else {
        for (var j = 0; j < 4; j++) {
            makeShapeGroup(0, shapegroups[j]);
        }
       }
    }
    else { 
        //groups of 2, usually
    // Default shape groups 1 & 2
        if (i > 4){
           return;
        }
        else if (i == 0) {
           makeShapeGroup(0, shapegroups[i]);
           makeShapeGroup(0, shapegroups[i + 1]);
        } 
        else if (i == 1) {
          for (var j = 2; j < 7; j++) {
            makeShapeGroup(0, shapegroups[j]);
            }
       } else if (i == 2) {
          for (var j = 7; j < 12; j++) {
            makeShapeGroup(0, shapegroups[j]);
            }
       } else if (i == 3) {
          for (var j = 12; j < 17; j++) {
            makeShapeGroup(0, shapegroups[j]);
            }
       } else if (i == 4) {
           for (var j = 17; j < 22; j++) {
            makeShapeGroup(0, shapegroups[j]);
            }
        }
    }
    return selectElt;
}

function showMoreHandshapes(id){
    i++;
    if (i > 3){
        $('.popup button').hide();
    }
    makeHandshapeSelect(i, 'hand0shape0');
    makeHandshapeSelect(i, 'hand0shape1');
    makeHandshapeSelect(i, 'hand1shape0');
    makeHandshapeSelect(i, 'hand1shape1');
    
    imagePickerSet();
}

function addShowMoreButton(id) {
    var moreButton = document.createElement('button');
    moreButton.type = "button";
    moreButton.innerHTML = "Show more handshapes";
    moreButton.addEventListener("click", showMoreHandshapes);
    moreButton.addEventListener("keypress", showMoreHandshapes);
    return moreButton;
}

function fillHandshapeDiv(){
    $('#hand0div').append(makeHandshapeSelect(0, 'hand0shape0'));
        var moreButton = addShowMoreButton('hand0shape0');
        $("#hand0div").append(moreButton);
    $('#hand1div').append(makeHandshapeSelect(0, 'hand0shape1'));
        var moreButton = addShowMoreButton('hand0shape1');
        $("#hand1div").append(moreButton);
    $('#hand2div').append(makeHandshapeSelect(0, 'hand1shape0'));
        var moreButton = addShowMoreButton('hand1shape0');
       $("#hand2div").append(moreButton);
    $('#hand3div').append(makeHandshapeSelect(0, 'hand1shape1'));
        var moreButton = addShowMoreButton('hand1shape1');
        $("#hand3div").append(moreButton); 
}

function handshapePopUp(){
    // Attaching handshapes to popup divs
    var pop = document.getElementById('popup');
    var pop1 = document.getElementById('popup1');
    var pop2 = document.getElementById('popup2');
    var pop3 = document.getElementById('popup3');
    var pop3 = document.getElementById('popup3');
    
    if (pop.style.display == "block"){
        if (handshapes[$('#hand0shape0').val()] == undefined){
            $("#hand0shape0img").attr('src', 'images/handshape-set.svg');
            if (handshapes[$('#hand0shape1').val()] == undefined){
                $("#hand0shape1img").attr('src', 'images/handshape-set.svg');
            }
        }
        else {
            var image0 = handshapes[$('#hand0shape0').val()].img;
            if (handshapes[$('#hand0shape1').val()] == undefined){
                $("#hand0shape1img").attr('src', image0);
            }
            $("#hand0shape0img").attr('src', image0);
        
            pop.style.display = "none";
            $('body').css('overflow','auto');
        }
    }
    
    if (pop1.style.display == "block"){
        if (handshapes[$('#hand0shape1').val()] == undefined){
             $("#hand0shape1img").attr('src', 'images/handshape-set.svg'); 
        }
        else{
            var image1 = handshapes[$('#hand0shape1').val()].img;
            $("#hand0shape1img").attr('src', image1);
            pop1.style.display = "none";
            $('body').css('overflow','auto');
        }
       
    }
    
    if (pop2.style.display == "block"){
        if (handshapes[$('#hand1shape0').val()] == undefined){
             $("#hand1shape0img").attr('src', 'images/handshape-set.svg');  
        }
        else{
            var image2 = handshapes[$('#hand1shape0').val()].img;
            if (handshapes[$('#hand1shape1').val()] == undefined){
                $("#hand1shape1img").attr('src', image2);
            }
            $("#hand1shape0img").attr('src', image2);
            pop2.style.display = "none";
            $('body').css('overflow','auto');
        }
    }
    
    if (pop3.style.display == "block"){
        if (handshapes[$('#hand1shape1').val()] == undefined){
            $("#hand1shape1img").attr('src', 'images/handshape-set.svg');  
        }
        else{
            var image3 = handshapes[$('#hand1shape1').val()].img;
            $("#hand1shape1img").attr('src', image3);
            pop3.style.display = "none";
            $('body').css('overflow','auto');
        }
    }    

}

function open(popup){
    popup.style.display = "block";
    $('body').css('overflow','hidden')
}

function close(popup){
    $(popup).hide();
    $('body').css('overflow','auto') 
}

function lockFocus(popup){
    var focusableEls = $(popup).find('a, object, :input, iframe, [tabindex]');
        var firstFocusableEl = focusableEls.first()[0];  
        var lastFocusableEl = focusableEls.last()[0];
        
        var KEYCODE_TAB = 9;

        $(popup).on('keydown', function(e) {
        if (e.key === 'Tab' || e.keyCode === KEYCODE_TAB) {
            if ( e.shiftKey ) /* shift + tab */ {
                if (document.activeElement === firstFocusableEl) {
                    lastFocusableEl.focus();
                    e.preventDefault();
                }
            } else /* tab */ {
                if (document.activeElement === lastFocusableEl) {
                    firstFocusableEl.focus();
                    e.preventDefault();
                }
            }
        }
        });
    
}

function popUpControls() {
    // Opening and closing handshape popups
    // Get the popups
    var pop = document.getElementById('popup');
    var pop1 = document.getElementById('popup1');
    var pop2 = document.getElementById('popup2');
    var pop3 = document.getElementById('popup3');
    
    var btn = document.getElementById('btn');

    $("#lookupform").keypress(function(event) {

       for (var i = 0; i < 4; i++) {
           var btn = document.getElementsByClassName("btn")[i];
           var x = document.getElementsByClassName("close")[i];
           
           var isXFocused = document.activeElement === x;
           var isBtnFocused = document.activeElement === btn;
           
           if (isXFocused) {
               close(".popup");
           } else if (isBtnFocused){
               return true;
           } else if (!isBtnFocused && i == 3) {
               return false;
           }
       }
    });

    // Specific cases
    
    // STARTING DOMINANT

    // When the user clicks on the button, open the modal 
    $( "#btn" ).click(function() {
        lockFocus("#popup");
        open(pop);
        return false;
    });

    // ENDING DOMINANT

    // When the user clicks on the button, open the modal 
    $( "#btn1" ).click(function() {
        lockFocus("#popup1");
        open(pop1);
        return false;
    });
    // STARTING NON-DOMINANT
    
    // When the user clicks on the button, open the modal 
    $( "#btn2" ).click(function() {
        lockFocus("#popup2");
        open(pop2);
        return false;
    });

    // ENDING NON DOMINANT
    
    // When the user clicks on the button, open the modal 
    $( "#btn3" ).click(function() {
        lockFocus("#popup3");
        open(pop3);
        return false;
    });
    
    // General cases
    
    // When the user clicks on <span> (x), close the modal
    $( ".close" ).click(function() {
        close('.popup');
    });
    
    // When the user clicks outside modal, close the modal
    $(".popup").click(function(e) {
        if (e.target.className == "popup") {
            close('.popup');
        }
    });
    
}

function imagePickerSet(){
    $("select.handshape").imagepicker({
        show_label: true
    });
    
    // Add appropriate ALT text and tab navigation to the picker images
    $("img.image_picker_image").each(function(i) {
        var text = $(this).next('p').text();
        $(this).attr('alt',text);
        $(this).attr('title',text);
        
        $(this).attr('tabindex', '0');
    });
}

// LOCATION UI FUNCTIONS
// makeImageNode, makeLocSVG, attachLocHandlers

function makeImageNode(regions) {
    var imgElt = document.createElementNS('http://www.w3.org/2000/svg',
                      'image');
    imgElt.setAttribute('x', '0');
    imgElt.setAttribute('y', '0');
    imgElt.setAttribute('width', regions['width']);
    imgElt.setAttribute('height', regions['height']);
    imgElt.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', regions['image']);
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

function attachLocHandlers() {
    $('#locstartend').change(moveClearSelected);
    $('#sideimgitem').append(makeLocSVG('sideimg', sideregions));
    $('#frontimgitem').append(makeLocSVG('frontimg', frontregions));
    $('ul.locimg polygon').click(handleImgClick);
    $('ul.locimg ellipse').click(handleImgClick);
    
    $('ul.locimg polygon').keypress(handleImgClick);
    $('ul.locimg ellipse').keypress(handleImgClick);
}

// For IE 8 and older and Android 3 and older
function makeLocationSelect() {
    var labelStart = $("<label for='loc0nosvg'><b>Starting location:</b></label>").appendTo('#locdiv');
    var selectStart = $("<select id='loc0nosvg' name='loc0nosvg'>").appendTo('#locdiv');
    var labelEnd = $("<br><label for='loc1nosvg'><b>Ending location:</b></label>").appendTo('#locdiv');
    var selectEnd = $("<select id='loc1nosvg' name='loc1nosvg'>").appendTo('#locdiv');
    
    var regionsSpec = frontregions['regions'];
    for (var id in regionsSpec) {
        var title = id;
        var title = id.toString();
        if (id.charAt(0) == 'R' || id.charAt(0) == 'L') {
	        title = title.substr(2);
        }
        title = title.replace('-', ' ');
        title = title.substr(0, 1).toUpperCase() + title.substr(1);
        selectStart.append($("<option>").attr('value',title).text(title));
        selectEnd.append($("<option>").attr('value',title).text(title));
    }
    
}

// SEARCH RESULTS FUNCTIONS
// makeSignRow, showSigns, evalGuess, displayResults

function makeSignRow(sign) {
    // Creating the row where a sign is placed
    var video_path = "https://moodle.converse.edu/asl2english/videos/";
    
    var row = document.createElement('tr');
    row.id = sign.sign.replace(/\s/g, '') + '-row';
    row.className = 'signrow';

    var th = document.createElement('th');
    th.id = sign.sign.replace(/\s/g, '') + '-title';
    th.className = 'signtitle';
    $(th).text(sign.sign);

    var signSrc = document.createElement('source');

    signSrc.src = video_path + sign.video.replace('#', '%23');
    signSrc.type = 'video/mp4';

    var signVid = document.createElement('video');
    signVid.id = sign.sign + '-video';
    signVid.className = 'signvideo';
    
    signVid.appendChild(signSrc);
    $(signVid).attr('controls', 'on');
    $(signVid).attr('onmouseenter', 'playvid(this)');
    $(signVid).attr('onmouseout', 'pausevid(this)');

    var td = document.createElement('td');
    td.appendChild(th);
    td.appendChild(signVid);
    row.appendChild(td);

    return row;
}

function showSigns(signsToShow) {
    // Shows sign results for a single page, including variant signs
    signsToShow.forEach(function(item, idx, arrayVar) {
        
        if (item.sign.indexOf(": ") != -1) {
             // Creating and appending signrow, variantbtn, and a break tag
            var signrow = makeSignRow(item);
            $('#results').append(signrow);
           
            var br = document.createElement('br');
            signrow.firstChild.appendChild(br);
 
            var variantbtn = document.createElement('button');
            signrow.firstChild.appendChild(variantbtn);

            variantbtn.innerHTML = "Show sign variation(s)";

            var variantcontain = document.createElement('div');
            variantcontain.id = item.sign.replace(/\s/g, '') + '-div';
            variantcontain.className = "variantdiv";
            $('#results').append(variantcontain);
            
            var signIndex = item.sign.indexOf(": ");
            var slice = item.sign.slice(0, signIndex);
            
            for (var j in signs) {
                if (signs[j].sign.indexOf(": ") != -1 && 
                    slice == signs[j].sign.slice(0, signIndex) && 
                        signs[j].sign !== item.sign){
                    var signrows = makeSignRow(signs[j]);
                    variantcontain.appendChild(signrows); 
                }
            }
            
            variantcontain.style.display = 'none';
            variantbtn.addEventListener ("click", function() {
                if (variantcontain.style.display === 'none') {
                    variantcontain.style.display = 'table-row-group';
                    variantbtn.innerHTML = "Hide sign variation(s)";
                } else {
                    variantcontain.style.display = 'none';
                    variantbtn.innerHTML = "Show sign variation(s)";
                }
            });
         }
        else {
           $('#results').append(makeSignRow(item));
        }
    });
}

var submit = false;

function evalGuess() {
    var guess = new Sign();
    
    for (var s = 0; s < signs.length; s++) {
        signs[s].diff = compareSigns(guess, signs[s]);
    }
    var possibles = signs.filter(function(elt, idx, arr) {
        return (elt.diff < CLEARLY_DIFFERENT);
    });
    possibles.sort(function(a, b) {
        return a.diff - b.diff;
    });
    
    var len = possibles.length;
    
    var numpages = len / $('#displaynum').val();
    numpages = Math.ceil(numpages);
    
    displayResults(possibles, numpages);
    
    return possibles;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayResults(possibles, numpages){
    // Display the possibilities, deals with pagination
    submit = true;
    var currentpage = 1;
    var prevbtn = document.createElement('button');
    
    if (numpages == 1){
        $('#results').empty();
        $('#results').append('<p>' + numberWithCommas(possibles.length) + ' results found </p> <hr/>');
        showSigns(possibles);
        $('#results').append('<p>' + 'Page ' + currentpage + ' of ' + numpages + '</p>');
    } else if (numpages > 1) {
        $('#results').empty();
        $('#results').append('<p>' + numberWithCommas(possibles.length) + ' results found </p> <hr/>');
        var num = $('#displaynum').val();
        var page = possibles.slice(0, num);
        showSigns(page);
        
        var nextbtn = document.createElement('button');
        $('#results').append("<hr/><br/>");
        $('#results').append(nextbtn);
        nextbtn.innerHTML = "Next page -->";
        
        $('#results').append('<p>' + 'Page ' + currentpage + ' of ' + numpages + '</p>');

        // Clicking next page button
        nextbtn.addEventListener ("click", function() {
            $('html, body').animate({
                scrollTop: $("#displaynum").offset().top
            }, 0);
            currentpage += 1
            $('#results').empty();
            $('#results').append('<p>' + numberWithCommas(possibles.length) + ' results found </p> <hr/>');
            var nextnum = $('#displaynum').val();
            nextnum = parseInt(nextnum) + parseInt(num);
                
            var nextpage = possibles.slice(num, nextnum);
            num = nextnum;
            showSigns(nextpage);
                
            $('#results').append("<hr/><br/>");
            $('#results').append(prevbtn);
            prevbtn.innerHTML = "<-- Previous page";
            
            if (currentpage < numpages) { 
                $('#results').append(nextbtn);
            }
            
            $('#results').append('<p>' + 'Page ' + currentpage + ' of ' + numpages + '</p>');

            });
            
        prevbtn.addEventListener ("click", function() {
            $('html, body').animate({
                scrollTop: $("#displaynum").offset().top
            }, 0);
            currentpage -= 1;
            $('#results').empty();
            $('#results').append('<p>' + numberWithCommas(possibles.length) + ' results found </p> <hr/>');
            var prevnum = $('#displaynum').val();
            prevnum = parseInt(num) - parseInt(prevnum);
            num = parseInt(prevnum) - parseInt($('#displaynum').val());

            var prevpage = possibles.slice(num, prevnum);
            num = prevnum;
            showSigns(prevpage);
            
            $('#results').append("<hr/><br/>");    
            
            if (currentpage !== 1) {
                $('#results').append(prevbtn);
            } 
            
            if (currentpage < numpages) { 
                $('#results').append(nextbtn);
            }
                
            $('#results').append('<p>' + currentpage + ' of ' + numpages + '</p>');
        });
    }
}

function resultsUpdate(value){
    if (submit == true) {
        var possibles = evalGuess();
        var len = possibles.length;
    
        var numpages = len / value;
        numpages = Math.ceil(numpages);
    }
}

// Make option text shorter -- Go over these again
function altOptionText() {
    $("#numhands option:contains('Dominant')").text('One hand moving, one stationary');
    $("#movetype option:contains('Single movement in one direction')").text('Single direction');
    $("#movetype option:contains('change in direction')").text('Change in direction/handshape');
    $("#movetype option:contains('double, back-and-forth')").text('Repeated');
    $("#movetype option:contains('moving in one direction')").text('Repeated directional');
}

 // Video playback controls
function playvid(video) {
    if (video.paused) {
        video.play();
    }
}

function pausevid(video) {
    if (video.playing){
        video.pause();
    }
}

// Reset entire form
function resetForm() {
    $('#results').empty();
    submit = false;
    var classToHide = $("#numhands option:selected").val();
    $('.' + classToHide).hide();
    $('#numhands').prop('selectedIndex',0);
    $('#hand0shape0 option').prop('selected', false);
    $('#hand0shape1 option').prop('selected', false);
    $('#hand1shape0 option').prop('selected', false);
    $('#hand1shape1 option').prop('selected', false);
      
    $('.thumbnail').removeClass('selected');
      
    $('#hand0shape0li button img').prop('src', 'images/handshape-set.svg');
    $('#hand0shape1li button img').prop('src', 'images/handshape-set.svg');
     
    $('#hand1shape0li button img').prop('src', 'images/handshape-set.svg');
    $('#hand1shape1li button img').prop('src', 'images/handshape-set.svg');
     
    $('#palm option').prop('selectedIndex', 0);
     
    $('#locdiv input').prop('value', '');
    $('.mark').remove();
     
    $('#movetype option').prop('selectedIndex', 0);
    $('#displaynum option').prop('selectedIndex', 0);
}

$(document).ready( function() {
    // Update handshape UI based on number of hands
    $("#numhands").change(changeHands);
    
    // Filling handshape div with handshapes
    fillHandshapeDiv();
    
    // Attaching handshapes to popup divs
    $("select.handshape").change(handshapePopUp); 
    
    // Opening and closing handshape popup
    popUpControls();
    
    // Image picker settings for handshapes
    imagePickerSet();
    
    // Make option text shorter
    if ( $(window).width() < 435) { altOptionText(); }
    
    // Attach various location functions to divs
    
    // SVG supported
    if (typeof SVGRect !== "undefined") { 
        attachLocHandlers();
    }
    // SVG not supported
    else {
        $("#locimgdiv").hide();
        $("#locdiv").append("<p>Your browser or device does not support Scalable Vector Graphics (SVG)."
        + " A modified, non-SVG based version of the location selector is available below." +
        " Please upgrade to a modern browser to view the unmodified selector.")
        makeLocationSelect()
    }

    // Submit button
    $('#lookupbutton').click(evalGuess);
    $('#lookupbutton').keypress(evalGuess);
    
    // Reset button
    $('#resetbutton').click(resetForm);
    $('#resetbutton').keypress(resetForm);
    
});