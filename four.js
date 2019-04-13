var greenSquare = $('#green');
var redSquare = $('#red');
var yellowSquare = $('#yellow');
var blueSquare = $('#blue');

var userChoices = [];
var cpuChoices = [];

var score = 0;
var numPicks = 0;
var gameOn = true;
var i;
var didLose = false;
var validator = setInterval(validationFunc, 300);

// 1 2 3
// 1 12 123

$(document).on('keydown', function(){
	restart();
});

function restart() {
	userChoices = [];
	cpuChoices = [];
	numPicks = 0;
	score = 0;
	revalidator = setInterval(validationFunc, 300);
	$('h6').html('Score: <span id="score">0</span>');
	$('body').css('backgroundColor', '#011F3F');
	on();
	game();
	$('h1').text('Good luck!');
	setInterval(function() {
		if (numPicks == cpuChoices.length) {
			if (arrayChecker(cpuChoices,userChoices)) {
				score++;
				$('#score').text(score);
				setTimeout(game, 300);
				numPicks = 0;
				userChoices = [];
			}
		}
	}, 300);
	$(document).off('keydown');
}

function game() {
	var randomNumber = randNumGen();
	cpuChoices.push(randomNumber);
	var lenCpu = cpuChoices.length;
	playAnim(cpuChoices[lenCpu - 1]);
	return true;
}

function playAnim(num) {
	switch (num) {
		case 1:
			playThatSound('green', 'mp3');
			greenSquare.addClass('pressed');
			pressedDel(greenSquare);
			break;
		case 2:
			playThatSound('red', 'mp3');
			redSquare.addClass('pressed');
			pressedDel(redSquare);
			break;
		case 3:
			playThatSound('yellow', 'mp3');
			yellowSquare.addClass('pressed');
			pressedDel(yellowSquare);
			break;
		case 4:
			playThatSound('blue', 'mp3');
			blueSquare.addClass('pressed');
			pressedDel(blueSquare);
			break;
	}
}

function validationFunc() {
	if (numPicks >= 1) {
		i=0;
		while(i<numPicks) {
			if (userChoices[i] !== cpuChoices[i]) {
				playThatSound('wrong', 'mp3');
				myStopFunction();
				off();
				$('h6').text('Press any button to play again');
				$('h1').text('Fail!!!');
				$('body').css('backgroundColor', 'red');
				$(document).on('keydown', function() {
					setTimeout(restart, 500);
				});
				i += 999;
			} else {
				i++
			}
		}
	}
}

function myStopFunction() {
	clearInterval(validator);
	clearInterval(revalidator);
}

function on() {
	green();
	red();
	yellow();
	blue();
}

function green() {
	greenSquare.on('click', function() {
		userChoices.push(1);
		playAnim(1);
		numPicks++;
	});
}

function red() {
	redSquare.on('click', function() {
		userChoices.push(2);
		playAnim(2);
		numPicks++;
	});
}

function yellow() {
	yellowSquare.on('click', function() {
		userChoices.push(3);
		playAnim(3);
		numPicks++;
	});
}

function blue() {
	blueSquare.on('click', function() {
		userChoices.push(4);
		playAnim(4);
		numPicks++;
	});
}

function off() {
	blueSquare.off();
	yellowSquare.off();
	redSquare.off();
	greenSquare.off();
}


function pressedDel(square) {
	setTimeout(function() {
		square.removeClass('pressed');
	}, 125);
}
function playThatSound(filename, extension) {
	var audio = new Audio('sounds/'+filename+'.'+extension);
	audio.play();
}

function randNumGen() {
	return Math.floor(Math.random() * 4 + 1);
}

function arrayChecker(arr1, arr2) {
	if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}