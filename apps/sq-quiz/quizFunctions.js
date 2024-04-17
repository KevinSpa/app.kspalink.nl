// quizFunctions.js

let questions = [];
let currentQuestion = 0;

let answerBox, restartButton;

function initializeQuiz(quizQuestions) {
    console.log("Initialized");
    questions = quizQuestions;
    answerBox = document.getElementById('answerBox');
    restartButton = document.getElementById('restartQuiz');
    displayQuestion();
}

function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    // Initialize matrix
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Calculate Levenshtein distance
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // Replace
                    matrix[i][j - 1] + 1,     // Insert
                    matrix[i - 1][j] + 1      // Delete
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

function displayQuestion() {
    document.getElementById('question').innerText = questions[currentQuestion].question;
    document.getElementById('answer').value = '';
    document.getElementById('feedback').innerText = '';
}

function restartQuiz() {
    currentQuestion = 0;
    displayQuestion();
    showAnswerBox();
}

function hideAnswerBox() {
    answerBox.style.display = 'none';
    restartButton.style.display = 'block';
}

function showAnswerBox() {
    answerBox.style.display = 'block';
    restartButton.style.display = 'none';
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function checkAnswer() {
    const userAnswer = document.getElementById('answer').value.trim().toLowerCase();
    const correctAnswer = questions[currentQuestion].answer.toLowerCase();
    const distance = levenshteinDistance(userAnswer, correctAnswer);
    const similarityPercentage = Math.floor((1 - distance / Math.max(correctAnswer.length, userAnswer.length)) * 100);

    if (similarityPercentage >= 87) {
        // If similarity is greater than or equal to 87%, treat as correct answer
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
            document.getElementById('feedback').innerText = `Correct! ${capitalizeFirstLetter(correctAnswer)}`;
        } else {
            hideAnswerBox();
            document.getElementById('feedback').innerText = 'Gefeliciteerd! Je hebt ' + questions.length + ' / ' + questions.length +  ' vragen voltooid.';
        }
    } else {
        restartQuiz();
        document.getElementById('feedback').innerText = `Helaas, het antwoord was: ${capitalizeFirstLetter(correctAnswer)}`;
    }
}
