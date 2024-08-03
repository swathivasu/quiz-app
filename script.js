const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const resultsContainerElement = document.getElementById('results-container')
const scoreElement = document.getElementById('score')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex
let score = 0

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    score = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (correct) {
        score++
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        questionContainerElement.classList.add('hide')
        resultsContainerElement.classList.remove('hide')
        scoreElement.innerText = `${score} out of ${shuffledQuestions.length}`
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
{
    question: 'WhO invented python?',
    answers: [
        { text: 'guido van rossum', correct: true },
        { text: 'james gosling', correct: false }
    ]
},
{
    question: 'What is the capital of France?',
    answers: [
        { text: 'Paris', correct: true },
        { text: 'London', correct: false }
    ]
},
{
    question: 'Who is the President of the USA?',
    answers: [
        { text: 'Joe Biden', correct: true },
        { text: 'Donald Trump', correct: false }
    ]
},
{
    question: 'Which keyword is used to inherit a class in Java?',
    answers: [
        { text: 'inherits', correct: true },
        { text: 'extends', correct: false }
    ]
},
{
    question: 'How do you create a list in Python?',
    answers: [
        { text: 'my_list = []', correct: true },
        { text: 'my_list = {}', correct: false }
    ]
},
{
    question: 'Which of the following is a correct way to define a method in Java?',
    answers: [
        { text: 'void methodName()', correct: true },
        { text: 'public void methodName', correct: false }
    ]
},
{
    question: 'What is the chemical symbol for gold?',
    answers: [
    { text: 'au', correct: true },
    { text: 'ag', correct: false }
    ]
},
]

