
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
var correctAnswer;
var incorrectAnswer;
var unAnswered;
var answered;
var currentQuestion;
var userChoice;
var seconds=20;

var gifArray = ["gif1","gif2","gif3","gif4","gif5"];

//==================FUNCTIONS=============//


// Start The game by using onclick event//
$("#start").on("click", function(){
        $("#start").hide();
        newGame();
});

$("#startOverBtn").on("click", function(){
    $("#startOverBtn").hide();
    newGame();
});

function newGame(){
    $("#finalMessage").empty();
    $("#correctAnswers").empty();
    $("#incorrectAnswers").empty();
    $("#unAnswered").empty();
    correctAnswer= 0;
    incorrectAnswer=0;
    unAnswered=0;
    currentQuestion=0;
    newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#rightAnswer').empty();
	$('#gif').empty();
    answered = true;
    seconds=20;
	//Question  will be asked in a loop, and answers will be added.
	$('#currentQuestion').html('Question Number: '+(currentQuestion+1) +' of '+triviaQuestions.length);
	$('#question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var theOptions = $('<div>');
		theOptions.text(triviaQuestions[currentQuestion].choices[i]);
		theOptions.attr('data-index', i );
		theOptions.addClass('thisOptions');
        $('#choices').append(theOptions);
        
	}
    countdown();
   // stop the time when user make a choice  
	$(".thisOptions").on('click',function(){
        userChoice = $(this).data("index");
        clearInterval(time);
		answerPage();
    });
}
// set time to go down every 1 second
function countdown(){
    
    $("#remainingTime").html("<h3>Time Remaining: " + seconds + "</h3>");
    answered = true;
    time = setInterval(showCountdown, 1000);
}

function showCountdown(){
    seconds--;
    $("#remainingTime").html("<h3>Time Remaining: " + seconds + "</h3>");
    if(seconds < 1){

        clearInterval(time);
        answered=false;
        answerPage();
    }
}

function answerPage(){

    $("#currentQuestion").empty();
    $(".thisOptions").empty();
    $("#question").empty();

    var correctAnswerText = triviaQuestions[currentQuestion].choices[triviaQuestions[currentQuestion].answer];
    var correctAnswerIndex = triviaQuestions[currentQuestion].answer;
    $('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
    // if it is correct, incorrect, or unanswered question
    if ((userChoice == correctAnswerIndex) && (answered == true)){
        correctAnswer++;
        $("#message").text("Yes, that's right!");
    }
        else if((userChoice!=correctAnswerIndex)&&(answered==true)){
            incorrectAnswer++;
            $("#message").text("No, that is not correct!");
            $('#rightAnswer').html('The correct answer is: ' + correctAnswerText);
            answered=true;
        }

        else{
            unAnswered++;
            $('#message').text("You didn't answer the question!");
            $('#rightAnswer').html('The correct answer is: ' + correctAnswerText);
            answered=false;
        }

        if(currentQuestion==(triviaQuestions.length-1)){
            setTimeout(scoreboard,3000);
        }
        else{
            currentQuestion++;
            setTimeout(newQuestion,3000);
        }

}

function scoreboard(){
	$("#remainingTime").empty();
	$("#message").empty();
	$("#rightAnswer").empty();
	$("#gif").empty();

	$("#finalMessage").html("Here is your final score!!!");
	$("#correctAnswers").html("Correct Answers: " + correctAnswer);
	$("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
	$("#unAnswered").html("Unanswered: " + unAnswered);
	$("#startOverBtn").addClass("reset");
	$("#startOverBtn").show();
	$("#startOverBtn").html("Start Over?");
}


