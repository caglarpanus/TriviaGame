
//============VARIABLES========//


var triviaQuestions = [
    {question: "Which country won the 2012 UEFA European Championship?",
    choices: ["Italy","Germany","Spain","England"],
    answer:2
    },
    {question: "Which athlete has won the most Olympic medals?",
    choices: ["Michael Phelps","Usain Bolt","Nadia Comaneci","Carl Lewis"],
    answer:0
    },
    {question:"How old must a person be to run for President of the United States?",
    choices:["30","33","35","40"],
    answer:2
    },
    {question:"Who is the former drummer for Nirvana that went on to become the frontman for the Foo Fighters?",
    choices:["Taylor Hawkins","Dave Grohl","Pat Smear","Kurt Cobain"],
    answer:1
    },
    {question:"What is the longest running U.S. primetime television show of all time?",
    choices:["Family Guy","CSI","Dallas","The Simpsons"],
    answer:3
    }
]

var time;
var correctAnswers;
var wrongAnswers;
var unAnswered;
var answered;
var currentQuestion;
var userChoice;
var seconds

var gifArray = ["gif1","gif2","gif3","gif4"];

//==================FUNCTIONS=============//


// Start The game by using onclick event//
$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
    $("#finalMessage").empty();
    $("#correctAnswers").empty();
    $("#wrongAnswers").empty();
    $("#unAnswered").empty();
    correctAnswers= 0;
    wrongAnswers=0;
    unAnswered=0;
    currentQuestion=0;
    newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#rightAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisOption');
		$('#choices').append(options);
	}
    countdown();
    
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
    answered = true;
    seconds = 20;
    $("#time").html("<h3>Time Remaining: " + seconds + "</h3>");
    time = setInterval(showCountdown, 1000);
}

function showCountdown(){
    time--;
    $("#time").html("<h3>Time Remaining: " + time + "</h3>");
    if(time<1){
        clearInterval(time);
        answered=false;
        answerPage();
    }
}

function answerPage(){

    $("#currentQuestion").empty();
    $("#theOptions").empty();
    $("question").empty();

    var correctAnswerText = triviaQuestions[currentQuestion].choices[triviaQuestions[currentQuestion].answer];
    var correctAnswerIndex = triviaQuestions[currentQuestion].answer;
    $('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
    
    if ((userChoice == correctAnswerIndex) && (answered == true)){
        correctAnswers++;
        $("#message").text("Yes, that's right!");
    }
        else if((userChoice!=correctAnswerIndex)&&(answered==true)){
            wrongAnswers++;
            $("#message").text("No, that is not correct!");
            $('#rightAnswer').html('The correct answer was: ' + rightAnswerText);
            answered=true;
        }

        else{
            unAnswered++;
            $('#message').text("You didn't answer the question!");
            $('#rightAnswer').html('The correct answer was: ' + rightAnswerText);
            answered=true;
        }

        if(currentQuestion==(triviaQuestions.length-1)){
            setTimeout(scoreBoard,5000);
        }
        else{
            currentQuestion++;
            setTimeout(newQuestion,5000);
        }

}

function scoreboard(){
	$("#time").empty();
	$("#message").empty();
	$("#rightAnswer").empty();
	$("#gif").empty();

	$("#finalMessage").html(messages.finished);
	$("#correctAnswers").html("Correct Answers: " + correctAnswer);
	$("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
	$("#unanswered").html("Unanswered: " + unanswered);
	$("#startOverBtn").addClass("reset");
	$("#startOverBtn").show();
	$("#startOverBtn").html("Start Over?")
