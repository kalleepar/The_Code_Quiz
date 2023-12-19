$(document).ready(function() {
  "use strict";

  var questions = [{
      question: "Which will kitty do?",
      choices: ['stay awake for 4 days and then sleep for 15 hours', 'sleep 3 hours a night for 4 days'],
      correctAnswer: 0
    }, {
      question: "What is the capital of Australia?",
      choices: ["Melbourne", "Sydney", ],
      correctAnswer: 1
    }, {
      question: "Who is the prime minister of the U.K.?",
      choices: ['Tony Blair', 'Kane'],
      correctAnswer: 0
    }, {
      question: "What is the first perfect number?",
      choices: [38, 6, 0],
      correctAnswer: 0
    },
    {
      question: "two plus 1?",
      choices: [1, 2, 3],
      correctAnswer: 1
    },
    {
      question: "Is kenyain africa?",
      choices: ['Yes', 'No'],
      correctAnswer: 0
    }
  ];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('.content'); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function(e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if (quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      $('#warning').text('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
      $('#warning').text('');
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function(e) {
    e.preventDefault();

    if (quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function(e) {
    e.preventDefault();

    if (quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    // this is new
    var warningText = $('<p id="warning">');
    qElement.append(warningText);

    return qElement;

  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="checkbox" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if (questionCounter < questions.length) {
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if (questionCounter === 1) {
          $('#prev').show();
        } else if (questionCounter === 0) {

          $('#prev').hide();
          $('#next').show();
        }
      } else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    console.log(selections);
    var score = $('<h3>', {
      id: 'question'
    });
    $("#result-input").removeClass('hide-input');
    $("#result-input").addClass('show-input');
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    // Calculate score and display relevant message
    var percentage = numCorrect / questions.length;
    if (percentage >= 0.9) {
      score.append('Incredible! You got ' + numCorrect + ' out of ' +
        questions.length + ' questions right!');
    } else if (percentage >= 0.7) {
      score.append('Good job! You got ' + numCorrect + ' out of ' +
        questions.length + ' questions right!');
    } else if (percentage >= 0.5) {
      score.append('You got ' + numCorrect + ' out of ' +
        questions.length + ' questions right.');
    } else {
      score.append('You only got ' + numCorrect + ' out of ' +
        questions.length + ' right. Want to try again?');
    }
    return score;
  }
});