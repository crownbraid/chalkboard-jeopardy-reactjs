$(function() {

	$('.new-game').click(function() {
		$(this).removeClass("flashgreen");
		newGame();
		$(this).addClass("flashgreen");
	});

	$('main').on('click', '.answer', function(e) {
		if (haltClick == 'off') {
			haltAni = 'off';
			haltClick= 'on';
			e.preventDefault();
			// checks answer
			var correctAnswer = $(this).text() == gameQuests[0].answer;
			if (correctAnswer) {
				numCorr++;
				scoreAni('.scoreboard', scInc);
				$(this).addClass("flashgreen");
			} else {
				$(this).addClass("flashred");
			}
			// advances to next question or end game
			if (gameQuests.length > 1) {
				transition(function() {
					if (haltAni == 'off') {
						scoreAni('.turn-count', scInc);
						gameQuests.shift();	
						newQuestion();
					}
				});
			} else {
				transition(function() {
					endGame();
				});
			}
		}
	});
});

var gameQuests; 
var numQuests = 5;
var scInc = '+=' + (16.18/numQuests) + 'em';
var haltClick = 'off';
var haltAni = 'off';
var numCorr = 0;

// NEW GAME
function newGame() {
	haltAni = 'on';
	resetGame();
	questsGet();
}
function resetGame() {
	$('.erase').finish().css('padding-top', '35em').show();
	$('*').clearQueue();
	haltClick = 'off';
	numCorr = 0;
	scoreAni('.turn-count', '24em');
	scoreAni('.scoreboard', '24em');
	scoreAni('.turn-count', scInc);
}
function questsGet() {
	$.get( "/questions/" + numQuests, function(data) {
		gameQuests = data;
		newQuestion();
	});
}

// DISPLAY QUESTION
function newQuestion() {
	$('#question').text(gameQuests[0].question);
	$('main .answers').remove();
	$('.interactive').after(makeAnswerTemplate());
}
function makeAnswerTemplate() {
	var template = $('.templates .answers').clone();
	var answers = gameQuests[0].answers.slice();
	for (var i = 1; i <= 4; i++) {
		var randomAns = Math.floor(Math.random()*answers.length);
		randomAns = answers.splice(randomAns, 1);
		template.find('#ans' + i).text(randomAns);
		if (randomAns == gameQuests[0].answer) {
			$('#erase' + i).hide();
		}
	}
	return template;
}

// TRANSITION BETWEEN QUESTIONS
function transition(callback) {
	$('#erase1').animate({'padding-top': '0em'}, 1900, function() {
	});
	$('#erase2').delay(600).animate({'padding-top': '0em'}, 1900);
	$('#erase3').delay(1200).animate({'padding-top': '0em'}, 1900);
	$('#erase4').delay(1800).animate({'padding-top': '0em'}, 1900, function() {
		$('.erase').animate({'padding-top': '35em'}, 300);
		$('.erase').show();
		callback();
		haltClick = 'off';
	});
	for (var i = 1; i <= 4; i++) {
		const ans = $('#ans' + i);
		if (ans.text() != gameQuests[0].answer) {
			ans.delay((700 * i)).animate({'opacity': '0', 'letter-spacing': '.1em'}, 500);
		} else {ans.addClass("flashgreen");}
	}
}

// ANIMATE SCOREBOARD
function scoreAni(obj, left) {
	$(obj).animate({'margin-left': left}, 390);
}

// END GAME
function endGame() {
	$('main .answers').html($('.templates .answers').clone());
	$('#question').text("You scored " + numCorr + " out of " + numQuests + "!");
}
