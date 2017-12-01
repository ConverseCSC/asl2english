// EDIT HERE TO SET CONDITION
var observer = 1; // Simple serial number
var trialset = 1; // Set of trials.  The first time through for a given observer
                  // is set 1.  The second time is set 2.

var conditionlist = [['asl2english', 0],
                    ['handspeak', 0],
                    ['asl2english', 1],
                    ['handspeak', 1]];

// pairs:  1 -> 0, 3; 2 -> 1, 2; 3, -> 2, 1; 4 -> 3, 0

var conditionnum = observer - 1;
if (trialset === 2) {
    conditionnum = 3 - conditionnum;
}

var condition = conditionlist[conditionnum]; // options: asl2english or handspeak, 0 or 1
alert("Condition number " + conditionnum);

/* global $ */

var sites = { 'asl2english': 'https://moodle.converse.edu/asl2english/',
    'handspeak': 'https://www.handspeak.com/word/asl-eng/' };

// Even: Group 0
// Odd: Group 1
var signurls = [ 'https://www.signingsavvy.com/signs/mp4/7/7291.mp4', // fork
                'https://www.signingsavvy.com/signs/mp4/14/14094.mp4', // emphasize
                'https://www.signingsavvy.com/signs/mp4/7/7168.mp4', // coat
                'https://www.signingsavvy.com/signs/mp4/9/9373.mp4', // for
                'https://www.signingsavvy.com/signs/mp4/7/7073.mp4', // grow
                'https://www.signingsavvy.com/signs/mp4/9/9371.mp4', // urge
                'https://www.signingsavvy.com/signs/mp4/1/1127.mp4', // argue
                'https://www.signingsavvy.com/signs/mp4/14/14342.mp4', // addicted
                'https://www.signingsavvy.com/signs/mp4/5/5659.mp4', //sheep
                'https://www.signingsavvy.com/signs/mp4/5/5573.mp4' //hurry
                
    ];
var signNames = ['fork', 'emphasize', 'coat', 'for', 'grow', 'urge', 'argue', 'addicted', 'sheep', 'hurry'];
var videocount = 3;
var startTime;
var endTime;
var signAnswer;
var formAnswers = [];

function goToQuestions() {
    endTime = new Date().toString();
    $('#lookupdiv').hide();
    $('#questiondiv').show();
}

function openLookup() {
    $('#lookupbutton').off('click')
        .on('click', goToQuestions)
        .attr('value', 'Go to questions');
    window.open(sites[condition[0]], condition[0]);
}

function showNextVideo() {
    if (videocount <= 0) {
        $('#videodiv').hide();
        $('#lookupdiv').show();
        $('#lookupbutton').off('click')
            .on('click', openLookup)
            .attr('value', 'Start lookup');
        //$('#' + condition[0] + 'div').show();
        //
        startTime = new Date().toString();
    }
    else {
        if (videocount == 1) {
            $('#nextvideo').attr('value', 'Find the sign');
        }
        else {
            $('#nextvideo').attr('value', 'Play video again');
        }
        $('#videoelt')[0].play();
    }
    videocount = videocount - 1;
}


function nextSign(){
    // Gathering data and sending it to CSV
    var signinput = document.getElementById('sign');
    signAnswer = signinput.value;
    var radio = $('#questiondiv input');
    for (var i in radio) {
        if (radio[i].checked){
            var confid = radio[i].value;
        }
    }
    
    
    // Saving individual sign data to csv
    var data = [observer, condition[0], signNames[condition[1]], signAnswer, confid, startTime, endTime,,,,];
    
    data = data.join(',');
    $.post('form.php', {data: data})
    
    videocount = 3;
    condition[1] = condition[1] + 2;
    
    signinput.value = "";
    
    if (condition[1] == signurls.length || condition[1] == signurls.length + 1){
        // Last cycle of a single group!
        $('#questiondiv').hide();
        $("#questiondivlong").show();
    } else {
        $('#questiondiv').hide();
        
        // Reset the forms
        //$('#' + condition[0] + 'div iframe').attr('src', sites[condition[0]]);
        $("input[name='confid']").prop('checked', false);

        $('#videoelt').attr('src', signurls[condition[1]]);
        $('#videodiv').show();
        $('#nextvideo').attr('value', 'Play');
    }
    
}

function submit(){
    // Saving survey information to csv
    var radio = $('#questiondivlong input');
    for (var i in radio) {
        if (radio[i].checked && radio[i].name == "usediff"){
            var usediff = radio[i].value;
        } else if (radio[i].checked) {
            var finddiff = radio[i].value;
        }
    }
    var text = $('textarea');
    
    var data = [observer, condition[0], , , , , ,usediff, finddiff, text[0].value, text[1].value];
    data = data.join(',');
    $.post('form.php', {data: data})
    $('#questiondivlong').hide();
    
    $('#inputmessage').show();
 

}

$(document).ready(function() {
    
    $('#videoelt').attr('src', signurls[condition[1]]);
    $('#videodiv').show();
    $('#nextvideo').click(showNextVideo);
    $('#nextSign').click(nextSign);
    $('#submitlong').click(submit);
    $('input[value="Done with lookup"]').click(goToQuestions);
    
});

