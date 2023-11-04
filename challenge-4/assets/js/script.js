const startButton = document.getElementById('start-button');
const quizContainer = document.getElementById('quiz');
const endScreen = document.getElementById('end-screen');
const scoreDisplay = document.getElementById('score');
const saveButton = document.getElementById('save-button');

let currentQuestionIndex = 0;
let score = 0;
let timer;
const questions = [
    {
        question:'What is JavaScript?',
        choices: ['a coffee shop', 'a programming language that is used to make web pages interactive and dynamic', 'a written language from the Javeans', 'the script to a hit movie known as Java'],
        Answer: 'a programming language that is used to make web pages interactive and dynamic',
    },
    {
        question:'What is the difference between let, const, and var for variable declaration in JavaScript?',
        Answer:"let and const are block-scoped, and var is function-scoped. const cannot be reassigned, let can be reassigned, and var can be reassigned and used before it's declared.",
        choices: ["let and const are block-scoped, and var is function-scoped. const cannot be reassigned, let can be reassigned, and var can be reassigned and used before it's declared.",
     "var block-scoped, and let and const are function-scoped. let cannot be reassigned, var can be reassigned, and const can be reassigned and used before it's declared.", "nothing", "they change according to the browser"],
    },
    {
        question:'What is a closure',
        Answer:'a function that has access to the variables from its outer function, even after the outer function has finished executing.',
        choices: ['a function that has access to the variables from its outer function, even after the outer function has finished executing.', 'a coworker tasked with closing the establishment',
    'a road that has been blocked off', 'the closing bracket on a function'],
    },
    {
        question:'What is the purpose of the this keyword in JavaScript?',
        Answer:'this refers to the object it belongs to. Its value depends on where it is used.',
        choices: ['this refers to the object it belongs to. Its value depends on where it is used.','this question','the acronym Truly Honest, Im Shocked',
     'confusing your instructor, Derek, when he is trying to explain the subject'],
    },
    {
        question: 'What is the difference between null and undefined in JavaScript',
        Answer: 'null is an assignment value that represents the intentional absence of an object value, while undefined indicates that a variable has been declared but has not been assigned a value.',
        choices: ['null is an assignment value that represents the intentional absence of an object value, while undefined indicates that a variable has been declared but has not been assigned a value.',
     'undefined is an assignment value that represents the intentional absence of an object value, while null indicates that a variable has been declared but has not been assigned a value.',
    'nothing', 'my mom told me null is the devil'],
    },
    ];

startButton.addEventListener('click', startQuiz);
saveButton.addEventListener('click', saveScore);

function startQuiz() {
    document.getElementById('start-screen').style.display = 'none';
    quizContainer.style.display = 'block';
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        document.querySelector('#quiz h2').textContent = question.question;
        const choices = document.querySelectorAll('#choices button');

        for (let i = 0; i < choices.length; i++) {
            choices[i].textContent = question.choices[i];
            choices[i].addEventListener('click', () => checkAnswer(i, questions[currentQuestionIndex].correctIndex));

        }
    } else {
        endQuiz();
    }
}

function checkAnswer(selectedIndex, correctIndex) {
    if (selectedIndex === correctIndex) {
        score += 10; // Increase the score for a correct answer
    } else {
        score -= 5; // Decrease the score for an incorrect answer
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}


function startTimer() {
    let time = 60;
    timer = setInterval(() => {
        document.getElementById('timer').textContent = time;
        if (time <= 0) {
            clearInterval(timer);
            endQuiz();
        }
        time--;
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    quizContainer.style.display = 'none';
    endScreen.style.display = 'block';
    scoreDisplay.textContent = score;
}

function saveScore() {
    const initials = document.getElementById('initials').value;
    console.log(`Initials: ${initials}, Score: ${score}`);
}
