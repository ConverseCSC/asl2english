//var observer; // Simple serial number
//var trialset = 1; // Set of trials.  The first time through for a given observer
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

function setParameters(){
    if (window.sessionStorage.getItem('observer')) {
        $('#observer').val(window.sessionStorage.getItem('observer'));
        startObserver();
    }
    else {
        $('#paramSubmit').click(startObserver);
        $('#parameters').show();
        $('#trialparams').hide();
    }
}

function startObserver() {
    var observer = parseInt($('#observer').val(), 10);
    console.log(window.sessionStorage.getItem('observer'));
    window.sessionStorage.setItem('observer', observer);
    console.log(window.sessionStorage.getItem('observer'));
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
    //console.log(window.sessionStorage.getItem('observer'));
    var observer = parseInt(window.sessionStorage.getItem('observer'), 10);
    var trialset = 1;
    if (window.sessionStorage.getItem("trialset")) {
        trialset = parseInt(window.sessionStorage.getItem("trialset"), 10);
    }
    else {
        window.sessionStorage.setItem('trialset', trialset);
    }
    $('#trialset').text(trialset);
    
    var signidx = parseInt(window.sessionStorage.getItem('signidx'), 10);
    if (signidx) {
        var site = window.sessionStorage.getItem('site');
    }
    else {
        var conditionnum = observer % 4;
        if (trialset === 2) {
           conditionnum = 3 - conditionnum;
        }
        
        site = conditionlist[conditionnum][0];
        window.sessionStorage.setItem('site', site);
        signidx = conditionlist[conditionnum][1];
        window.sessionStorage.setItem('signidx', signidx);
    }

    //$('#site').val(conditionlist[conditionnum][0]);
    //$('#signnum').val(conditionlist[conditionnum][1]);
    //$('#trialnum').text(0);
    $('#trialparams').show();
    startTrial();
}

function startTrial() {
    var videocount = 4;
    if (window.sessionStorage.getItem('videocount')) {
        videocount = parseInt(window.sessionStorage.getItem('videocount'), 10);
    }
    else {
        window.sessionStorage.setItem('videocount', videocount);
    }
    
    var signidx = parseInt(window.sessionStorage.getItem('signidx'), 10);
    $('#trialnum').text(Math.floor(signidx/2) + 1);
    $('#videoelt').attr('src', signurls[signidx]);
    //$('#videocount').val(3);
    //$('#videoelt').attr('src', signurls[parseInt($('#signnum').val(), 10)]);
    //$('#nextvideo').attr('value', 'Play');
    $('#videodiv').show();
    //$('#videoinstr').text(videoinstructions[2]);
    showNextVideo();
}

function showNextVideo() {
    var videoinstructions = ['When the video is done, click the button at the bottom.',
        'Play the video again by clicking the button at the bottom.',
        'Play the video again by clicking the button at the bottom.',
        'Play the video by clicking the button at the bottom.'
        ];
    var nextVideoText = ['Find the sign', 'Play video again', 'Play video again',
                            'Play video'];
        
    var videocount = parseInt(window.sessionStorage.getItem('videocount'), 10);

    if (videocount <= 0) {
        window.sessionStorage.removeItem('videocount');
        $('#videodiv').hide();
        $('#lookupdiv').show();
        $('#lookupbutton').off('click')
            .on('click', openLookup)
            .attr('value', 'Start lookup');
    }
    else {
        $('#nextvideo').attr('value', nextVideoText[videocount - 1]);
        $('#videoinstr').text(videoinstructions[videocount - 1]);
        if (videocount < 4) {
            $('#nextvideo').prop('disabled', true);
            setTimeout(function () {
                $('#nextvideo').prop('disabled', false);
            }, 1500);
            $('#videoelt')[0].play();
        }
        window.sessionStorage.setItem('videocount', videocount - 1);
    }
}

function openLookup() {
    window.sessionStorage.setItem('startTime', new Date().toISOString());
    //$('#startTime').val(new Date().toISOString());
    var lookupTab = window.open(sites[window.sessionStorage.getItem('site')],
                                'lookupTab');

    var goToQuestions = function() {
        window.sessionStorage.setItem('endTime', new Date().toISOString());
        //$('#endTime').val(new Date().toISOString());
        $('#lookupdiv').hide();
        $('#questiondiv').show();
        if (lookupTab) {
            lookupTab.close();
            lookupTab = undefined;
        }
    };
    
    $('#lookupbutton').off('click')
        .on('click', goToQuestions)
        .attr('value', 'Go to questions');
}

function nextSign(){
    // Gathering data and sending it to CSV
    writeOutData();
    clearForms();
    
    var signidx = parseInt(window.sessionStorage.getItem('signidx'), 10);
    signidx += 2;
    //$('#signnum').val(signnum);
    window.sessionStorage.setItem('signidx', signidx);
    if (signidx >= signurls.length) {
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

    if (parseInt(window.sessionStorage.getItem('trialset'), 10) === 1) {
        window.sessionStorage.setItem('trialset', 2);
        window.sessionStorage.removeItem('signidx');
        startTrialSet();
    }
    else {
        $('#inputmessage').show();
        window.sessionStorage.clear();
    }
}

function writeOutData() {
    var data;
    var signidx = parseInt(window.sessionStorage.getItem('signidx'), 10);
    if (signidx < signurls.length) {
        //console.log(observer);
        data = [window.sessionStorage.getItem('observer'),
                window.sessionStorage.getItem('site'), signNames[signidx], 
                $('#sign').val(), 
                $('#questiondiv [type=radio]:checked').val(),
                window.sessionStorage.getItem('startTime'),
                window.sessionStorage.getItem('endTime'),
                ,,,];
    }
    else {
        data = [window.sessionStorage.getItem('observer'),
                window.sessionStorage.getItem('site'), ,,,,,
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

