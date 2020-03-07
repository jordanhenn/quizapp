const STORE = [
    {
        question: ["https://upload.wikimedia.org/wikipedia/commons/8/86/Volcano_rabbit_droppings.jpg", "A picture of small, round droppings in dirt. They look like very old cocoa puffs."],
        choices: ["Rabbit", "Frog", "Lemur", "Bonobo"],
        correctAnswer: "Rabbit"
    },
    {
        question: ["https://blog.nationalgeographic.org/wp-content/uploads/2014/12/madewithOver-3.jpg", "A picture of a wet, orange dropping contained in what appears to be a measuring cup. It almost looks like very, very wet sand. A body of water can be seen in the background of the image."],
        choices: ["Flamingo", "Great White Shark", "Blue Whale", "Seagull"],
        correctAnswer: "Blue Whale"
    },
    {
        question: ["https://us.123rf.com/450wm/brm1949/brm19491302/brm1949130200050/18081388-whitetail-deer-droppings-on-the-woods-floor-.jpg?ver=6", "Round, brown droppings. They almost look like brown grapes."],
        choices: ["Bobcat", "Deer", "Meerkat", "Racoon"],
        correctAnswer: "Deer"
    },
    {
        question: ["https://naturallycuriouswithmaryholland.files.wordpress.com/2014/08/8-25-14-black-bear-blueberry-scat-062.jpg?w=590", "A mound of feces about the size of a large man's hand. Nearly pitch black on the outside with a purplish tint on the inside."],
        choices: ["Polar Bear", "Grizzly Bear", "Black Bear", "House Cat"],
        correctAnswer: "Black Bear"
    },
    {
        question: ["http://www.canadianoffthegrid.com/wp-content/uploads/2014/05/Turkey_Scat.jpg", "A little semi-white, curved dropping. Almost looks like a half-burnt snake firework."],
        choices: ["Chicken", "Jackdaw", "Pigeon", "Wild Turkey"],
        correctAnswer: "Wild Turkey"
    }
];

let score = 0;
let questionNumber = 0;


function generateQuestion(qNum) {
    $('.question-area').html(`<img class="question" src="${STORE[qNum].question[0]}" alt="${STORE[qNum].question[1]}"/>`);
    $('.choice-area').html(
        `<div class="answer-area">
            <form class="answers">
                    <div class="input-label">
                        <input type="radio" id="answer1" name="answer" value="${STORE[qNum].choices[0]}">
                        <label for="answer1">${STORE[qNum].choices[0]}</label>
                    </div>
                    <div class="input-label">
                        <input type="radio" id="answer2" name="answer" value="${STORE[qNum].choices[1]}">
                        <label for="answer2">${STORE[qNum].choices[1]}</label>
                    </div>
                    <div class="input-label">
                        <input type="radio" id="answer3" name="answer" value="${STORE[qNum].choices[2]}">
                        <label for="answer3">${STORE[qNum].choices[2]}</label>
                    </div>
                    <div class="input-label">
                        <input type="radio" id="answer4" name="answer" value="${STORE[qNum].choices[3]}">
                        <label for="answer4">${STORE[qNum].choices[3]}</label>
                    </div>
                    <div class="submitbutton">
                        <input type="submit" value="Submit Answer">
                    </div>
            </form>
        </div>`);
}


function determineFlusherAction() {
    $('.js-flusher').click(function () {
        if (questionNumber === 0) {
            beginQuiz();
        }
        else if (questionNumber > 0 && questionNumber < STORE.length) {
            $('.js-flusher').hide()
            generateQuestion(questionNumber);
            $('.questionNum').text(questionNumber+1);
        }
        else {
            finalResults();
        }
    });
}

function beginQuiz() {
    //clicking the flusher will begin the quiz by rendering the first photo and the answer area
        $('.js-flusher').hide();
        $('.scoring-question-count').show();
        $('.instructions').fadeOut();
        $('.instructions').remove();
        $('.questionNum').html(1);
        generateQuestion(0);
}


function submitAnswer() {
    //upon clicking submit answer, this function will determine whether or not the answer was
    //correct or incorrect, and show a message stating whether or not the answer is correct
    //submit button will disappear
        $('body').on('submit', '.answers', function() {
            event.preventDefault();
            $('.answers').hide()
            let selected = $('input:checked');
            let answer = selected.val();
            let correct = STORE[questionNumber].correctAnswer;
            if (answer === correct) {
                rightAnswer();
            } else {
                wrongAnswer();
            }
            updateQuestionNumber();
            $('.questionNum').text(questionNumber);
            $('.js-flusher').show();
        });
}

function wrongAnswer() {
    if (questionNumber < STORE.length - 1) {
        $('.question-area').html(`<img class="question" src="https://i.imgur.com/kUXMyVN.png" alt="Wrong!"/>`);
        $('.answer-area').html(`
            <p>The correct answer was ${STORE[questionNumber].correctAnswer}</p>
            <p>Click the flusher to proceed to the next question.</p>`
        );
    }
    else {
        $('.question-area').html(`<img class="question" src="https://i.imgur.com/kUXMyVN.png" alt="Wrong!"/>`);
        $('.answer-area').html(`
            <p>The correct answer was ${STORE[questionNumber].correctAnswer}</p>
            <p>Click the flusher to see your final results.</p>`
        )}
}

function rightAnswer() {
    if (questionNumber < STORE.length - 1) {
        $('.question-area').html(`<img class="question" src="https://i.imgur.com/uS0CrHG.png" alt="Right!"/>`);
        $('.answer-area').html(`
            <p>Nice job! That was indeed the droppings of a ${STORE[questionNumber].correctAnswer}</p>
            <p>Click the flusher to proceed to the next question.</p>`
        );
        updateScore();
    }
    else {
        $('.question-area').html(`<img class="question" src="https://i.imgur.com/uS0CrHG.png" alt="Right!"/>`);
        $('.answer-area').html(`
            <p>Nice job! That was indeed the droppings of a ${STORE[questionNumber].correctAnswer}</p>
            <p>Click the flusher to see your final results.</p>`
        );
        updateScore();
    }
}

function updateScore() {
    score++;
    $('.correct').text(score);
}

function updateQuestionNumber() {
    questionNumber++;
    $('.questionNum').text(questionNumber + 1);
}

function finalResults() {
    //loads final result page based on total correct
    //clicking flusher runs beginQuiz
    if (score === 5) {
        $('.scoring-question-count').hide();
        $('.question-area').html(`<img class="question" src="https://i.imgur.com/VoqcF2F.png" alt="Final Score: 5 out of 5"/>`);
        $('.answer-area').html(`
            <p>You scored ${score} out of 5. A perfect score. An adequate score.</p>
            <p>Click the flusher to start a new quiz</p>`
        );
        score = 0;
        $('.correct').text(0);
        questionNumber = 0;
    }
    else if (score === 4) {
        $('.scoring-question-count').hide();
        $('.question-area').html(`<img class="question" src="https://i.imgur.com/KfIXPhj.png" alt="Final Score: 4 out of 5"/>`);
        $('.answer-area').html(`
            <p>You scored ${score} out of 5. At least you got more than half right.</p>
            <p>Click the flusher to start a new quiz</p>`
        );
        score = 0;
        $('.correct').text(0);
        questionNumber = 0;
    }
    else if (score === 3) {
        $('.scoring-question-count').hide();
        $('.question-area').html(`<img class="question" src="https://i.imgur.com/hX0KGdZ.png" alt="Final Score: 3 out of 5"/>`);
        $('.answer-area').html(`
            <p>You scored ${score} out of 5. At least you got more than half right.</p>
            <p>Click the flusher to start a new quiz</p>`
        );
        score = 0;
        $('.correct').text(0);
        questionNumber = 0;
    }
    else if (score === 2) {
        $('.scoring-question-count').hide();
        $('.question-area').html(`<img class="question" src="https://i.imgur.com/dd4MB9c.png" alt="Final Score: 2 out of 5"/>`);
        $('.answer-area').html(`
        <p>You scored ${score} out of 5. You got less than half right. You are pathetic.</p>
        <p>Click the flusher to start a new quiz</p>`
        );
        score = 0;
        $('.correct').text(0);
        questionNumber = 0;
    }
    else if (score === 1) {
        $('.scoring-question-count').hide();
        $('.question-area').html(`<img class="question" src="https://i.imgur.com/9gh8ZWy.png" alt="Final Score: 1 out of 5"/>`);
        $('.answer-area').html(`
        <p>You scored ${score} out of 5. You got less than half right. You are pathetic.</p>
        <p>Click the flusher to start a new quiz</p>`
        );
        score = 0;
        $('.correct').text(0);
        questionNumber = 0;
    }
    else {
        $('.scoring-question-count').hide();
        $('.question-area').html(`<img class="question" src="https://i.imgur.com/dADA7Wp.png" alt="Final Score: 0 out of 5"/>`);
        $('.answer-area').html(`
        <p>You scored ${score} out of 5. You are worthless and a failure.</p>
        <p>Click the flusher to start a new quiz</p>`
        );
        score = 0;
        $('.correct').text(0);
        questionNumber = 0;
    }
}

determineFlusherAction();
submitAnswer();
$('.scoring-question-count').hide();