// EDIT HERE TO SET CONDITION
var observer = 1; // Simple serial number
var condition = ['asl2english', 0]; 

/* global $ */

var sites = { 'asl2english': 'https://moodle.converse.edu/asl2english/',
    'handspeak': 'https://www.handspeak.com/word/asl-eng/' };

var signurls = [ 'https://www.signingsavvy.com/signs/mp4/7/7291.mp4', // fork
                'https://www.signingsavvy.com/signs/mp4/7/7168.mp4', // coat
                'https://www.signingsavvy.com/signs/mp4/9/9373.mp4', // for
                'https://www.signingsavvy.com/signs/mp4/7/7073.mp4', // grow
                'https://www.signingsavvy.com/signs/mp4/9/9371.mp4', // urge
                'https://www.signingsavvy.com/signs/mp4/1/1127.mp4' // argue
    ];

var videocount = 3;

function showNextVideo() {
    if (videocount <= 0) {
        $('#videodiv').hide();
        $('#' + condition[0] + 'div').show();
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

function goToQuestions() {
    $('#' + condition[0] + 'div').hide();
    $('#questiondiv').show();
}

$(document).ready(function() {
    
    $('#videoelt').attr('src', signurls[condition[1]]);
    $('#videodiv').show();
    $('#nextvideo').click(showNextVideo);
    $('input[value="Done with lookup"]').click(goToQuestions);
    
});

