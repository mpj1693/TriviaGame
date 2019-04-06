$(document).ready(function () {

    var correctCount = 0;
    var incorrectCount = 0;
    var unansweredCount = 0;
    var userPick = "";
    var running = false;

    var questions = [{
            question: "Who vetoes bills?",
            choices: [
                "Vice President",
                "Speaker of the House",
                "President",
                "Supreme Court"
            ],
            answer: 2,
            photo: "assets/images/image1.gif"
        },
        {
            question: "Before he was President, Eisenhower was a general. What war was he in?",
            choices: [
                "Vietnam War",
                "World War 2",
                "World War 1",
                "Spanish-American War"
            ],
            answer: 1,
            photo: "assets/images/image2.jpg"
        },
        {
            question: "What did the Declaration of Independence do?",
            choices: [
                "Declared Independence from France",
                "Gave women right to vote",
                "Freed the slaves",
                "Declared Independence from Great Britain"
            ],
            answer: 3,
            photo: "assets/images/image3.jpg"
        },
        {
            question: "Name one state that borders Mexico.",
            choices: ["Florida", "Alabama", "Arkansas", "California"],
            answer: 3,
            photo: "assets/images/image4.jpg"
        },
        {
            question: "Who was President during World War I?",
            choices: [
                "Theodore Roosevelt",
                "Franklin Roosevelt",
                "Woodrow Wilson",
                "Warren Harding"
            ],
            answer: 2,
            photo: "assets/images/image5.jpg"
        },
        {
            question: "When do we celebrate Independence Day?",
            choices: ["July 4", "January 1", "March 4", "June 30"],
            answer: 0,
            photo: "assets/images/image6.gif"
        },
        {
            question: "What territory did the United States buy from France in 1803?",
            choices: ["Alaska", "Quebec", "The Louisiana Territory", "Hawaii"],
            answer: 2,
            photo: "assets/images/image7.png"
        },
        {
            question: "What is one promise you make when you become a United States citizen?",
            choices: [
                "not defend the Constitution",
                "give up loyalty to other countries",
                "never leave United States",
                "disobey the laws"
            ],
            answer: 1,
            photo: "assets/images/image8.gif"
        }
    ];

    var totalqCount = questions.length;
    var pick;
    var index;
    var intervalId;

    //this will hide the reset button until the quiz has ended
    $("#reset").hide();

    /* Once the start button is clicked
      hide the start button
      display the first question and options
      start timer
      */
    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        // for (var i = 0; i < questions.length; i++) {
        //   var holder = holder.push(questions[i]);
        // }
    });

    // creating a funtion to decrease time every second
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }

    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;
     // when time reaches 0, timer stops and unansweredCount goes up by 1 and the right answer is displayed
        if (timer === 0) {
            unansweredCount++;
            stop();
            $("#answerblock").html(
                "<h3>Time's up! The correct answer is: " +pick.choices[pick.answer] +"</h3>"
            );
            displayImage();
        }
    }

    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    // this will display the questions and their options randomly
    function displayQuestion() {
        index = Math.floor(Math.random() * questions.length);
        pick = questions[index];

        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choices.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice h4 btn btn-outline-light btn-block btn-lg font-weight-bold");
            userChoice.html(pick.choices[i]);
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
        }

    // convert users pick to integer to compare it with the actual answer
        $(".answerchoice").on("click", function () {
            userPick = parseInt($(this).attr("data-guessvalue"));

            if (userPick === pick.answer) {
                stop();
                correctCount++;
                userPick = "";
                $("#answerblock").html("<h2>That's Correct!</h2>" + pick.answer);
                displayImage();
            } else {
                stop();
                incorrectCount++;
                userPick = "";
                $("#answerblock").html("<h2>Wrong! The correct answer is: " +pick.choices[pick.answer] + "</h2>");
                displayImage();
            }
        });
    }

    var timer = 10;
    var newArray = [];
    //this will display corresponding image after user has picked the answer
    function displayImage() {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
    //this will add the image at the index position and remove 1 item from the array
        questions.splice(index, 1);

        setTimeout(function () {
            $("#answerblock").empty();
    //this will reset the timer back to 15 after every question
            timer = 10;

    // when all questions are answered or when the time's up display result and the Try Again button 
            if ((correctCount + incorrectCount + unansweredCount) === totalqCount) {
                $("#questionblock").empty();
                $("#questionblock").html("<h2>Game Over!</h2>");
                $("#reset").show();
                $("#correctAnswers").append("Correct Answers:   " + correctCount);
                $("#incorrectAnswers").append("Incorrect Answers:   " + incorrectCount);
                $("#unAnswered").append("Not Attempted:   " + unansweredCount); 
                correctCount = 0;
                incorrectCount = 0;
                unansweredCount = 0;

            } else {
                runTimer();
                displayQuestion();

            }
        }, 4000);

    }

})