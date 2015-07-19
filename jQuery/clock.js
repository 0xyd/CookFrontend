"use strict";

/* The unit is mm */
var second = 1000,
	minute = 60000,
	hour = 3600000;

/* The hand objects */
var secondHand = document.getElementById("secondHand"),
	minuteHand = document.getElementById("minuteHand"),
	hourHand = document.getElementById("hourHand");

function rotateAnimation(rotateObj, time, degree) {

	var currentDeg = getRotateDeg(rotateObj);

	$({deg: currentDeg}).animate({deg: currentDeg + degree}, {
        duration: time,
        step: function(now) {

            // in the step-callback (that is fired each step of the animation),
            // you can use the `now` paramter which contains the current
            // animation-position (`0` up to `angle`)
            $(rotateObj).css({
                transform: 'rotate(' + now + 'deg)'
            });
        },
        complete: function() {
        	rotateAnimation(rotateObj, time, degree);
        }
    });
}

/* Translate the matrix to degree which is much readable */
function getRotateDeg(rotateObj) {

	var matrix = $(rotateObj).css("transform");

	if(matrix !== 'none') {

        var values = matrix.split('(')[1].split(')')[0].split(','),
        	a = values[0],
        	b = values[1],
        	angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

    } else { var angle = 0; }

    return (angle < 0) ? angle + 360 : angle;
}

/* Initiate the Clock */
function initiateClock(hourHand, minuteHand, secondHand) {

	$(hourHand).css({"transform": "rotate(180deg)"});
	$(minuteHand).css({"transform": "rotate(180deg)"});
	$(secondHand).css({"transform": "rotate(180deg)"});

}

/* Translate the current time to degree */
function currentTimeToDegree(hourHand, minuteHand, secondHand) {

	var date = new Date(),
		s = date.getSeconds(),
		m = date.getMinutes(),
		h = date.getHours();

	var sDeg = s * 6,
		mDeg = m * 6 + s * 1 / 10,
		hDeg = (h > 12) ? (h - 12) * 30 + m * 0.5 + s / 120 : h * 30 + m * 0.5 + s / 120;
		
	// Add the rotation's offset
	sDeg += 180;
	mDeg += 180;
	hDeg += 180;
	
	$(hourHand).css({"transform": "rotate(" + hDeg + "deg)"});
	$(minuteHand).css({"transform": "rotate(" + mDeg + "deg)"});
	$(secondHand).css({"transform": "rotate(" + sDeg + "deg)"});

}

$(document).ready(function() {

	/* The unit is mm */
	var second = 1000,
		minute = 60000,
		hour = 3600000;

	/* The hand objects */
	var secondHand = document.getElementById("secondHand"),
		minuteHand = document.getElementById("minuteHand"),
		hourHand = document.getElementById("hourHand");

	var date = new Date();

	// Intiate the Clock to 12:00 am
	initiateClock(hourHand, minuteHand, secondHand);

	// Abjust the clock to the current time.
	currentTimeToDegree(hourHand, minuteHand, secondHand);

	rotateAnimation(secondHand, second, 1);
	rotateAnimation(minuteHand, minute, 6);
	rotateAnimation(hourHand, hour, 30);

});