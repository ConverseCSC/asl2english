var observer; // Simple serial number
var trialset = 1; // Set of trials.  The first time through for a given observer
                  // is set 1.  The second time is set 2.

var conditionlist = [['asl2english', 0],
                    ['handspeak', 0],
                    ['asl2english', 1],
                    ['handspeak', 1]];

// pairs:  1 -> 0, 3; 2 -> 1, 2; 3, -> 2, 1; 4 -> 3, 0

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
var videocount;
var conditionnum;
var condition; // options: asl2english or handspeak, 0 or 1
var startTime;
var endTime;
var lookupTab;
var trialnum;

function setParameters(){
    $('#paramSubmit').click(startObserver);
    $('#parameters').show();
    $('.trialparams').hide();
}

function startObserver() {
    var observer = parseInt($('#observer').val(), 10);
    //console.log(observer);
    if (observer >= 0) {
        $('#parameters').hide();
        $('#paramErr').hide();
        $('#paramSubmit').hide();
        $('#observer').prop('disabled','disabled');
        startTrialSet();
    }
    else {
        $('#paramErr').show();
        $('#observer').focus();
    }
    
}

function startTrialSet() {
    var observer = parseInt($('#observer').val(), 10);
    var trialset = parseInt($('#trialset').val(), 10);
    var conditionnum = observer % 4;
    if (trialset === 2) {
        conditionnum = 3 - conditionnum;
    }
    $('#conditionnum').val(conditionnum);
    $('#site').val(conditionlist[conditionnum][0]);
    $('#signnum').val(conditionlist[conditionnum][1]);
    $('#trialnum').text(0);
    $('.trialparams').show();
    startTrial();
}

var videoinstructions = ['When the video is done, click the button at the bottom.',
        'Play the video again, and then click the button at the bottom.',
        'Play the video, and then click the button at the bottom.',
        ];

function startTrial() {
    $('#videocount').val(3);
    $('#videoelt').attr('src', signurls[parseInt($('#signnum').val(), 10)]);
    $('#nextvideo').attr('value', 'Play');
    $('#videodiv').show();
    $('#partnum').text(trialset);
    $('#videoinstr').text(videoinstructions[2]);
    
    $('#trialnum').text(parseInt($('#trialnum').text(), 10) + 1);
}

function showNextVideo() {
    var videocount = parseInt($('#videocount').val(), 10)
    if (videocount <= 0) {
        $('#videodiv').hide();
        $('#lookupdiv').show();
        $('#lookupbutton').off('click')
            .on('click', openLookup)
            .attr('value', 'Start lookup');
    }
    else {
        if (videocount == 1) {
             $('#nextvideo').attr('disabled', true);
            setTimeout(function() {
                $('#videoinstr').text(videoinstructions[0]);
                $('#nextvideo').attr('disabled', false);
                $('#nextvideo').attr('value', 'Find the sign');
            }, 1500);
        }
        else {
            $('#nextvideo').attr('disabled', true);
            $('#videoinstr').text(videoinstructions[1]);
            setTimeout(function() {
                $('#nextvideo').attr('disabled', false)
                $('#nextvideo').attr('value', 'Play video again');
            }, 1500);
        }
        $('#videoelt')[0].play();
    }
    $('#videocount').val(videocount - 1);
}

function openLookup() {
    $('#lookupbutton').off('click')
        .on('click', goToQuestions)
        .attr('value', 'Go to questions');
    $('#startTime').val(Date.now().toISOString());
    window.open(sites[$('#site').val()], 'lookupTab');
}

function goToQuestions() {
    $('#endTime').val(Date.now().toISOString());
    $('#lookupdiv').hide();
    $('#questiondiv').show();
    if (lookupTab) {
        console.log('Closing');
        lookupTab.close();
        lookupTab = undefined;
    }
}

function nextSign(){
    // Gathering data and sending it to CSV
    writeOutData();
    clearForms();
    
    condition[1] = condition[1] + 2;
    if (condition[1] == signurls.length || condition[1] == signurls.length + 1) {
        // Last cycle of a single group!
        $("#questiondivlong").show();
    } else {
        startTrial();
    }
}

function submit(){
    // Saving survey information to csv
    writeOutData();
    clearForms();

    if (trialset === 1) {
        trialset = 2;
        startTrialSet();
    }
    else {
        $('#inputmessage').show();
    }
}

function writeOutData() {
    var data;
    if (condition[1] < signurls.length) {
        console.log(observer);
        data = [observer, condition[0], signNames[condition[1]], 
                $('#sign').val(), 
                $('#questiondiv [type=radio]:checked').val(),
                startTime, endTime,,,,];
    }
    else {
        data = [observer, condition[0], ,,,,,
                $('#questiondivlong [type=radio][name=usediff]:checked').val(),
                $('#questiondivlong [type=radio][name=finddiff]:checked').val(),
                $('#useful').val(), $('#to_change').val()];
    }
    data = data.join('::');
    $.post('form.php', {data: data});
}

function clearForms() {
    $('input[type=radio]:checked').prop('checked', false);
    $('#sign').val('');
    $('textarea').val('');
    $('#questiondiv').hide();
    $('#questiondivlong').hide();
}

$(document).ready(function() {
    $('.errmsg').hide();
    $('#nextvideo').click(showNextVideo);
    $('#nextSign').click(nextSign);
    $('#submitlong').click(submit);
    setParameters();
});

