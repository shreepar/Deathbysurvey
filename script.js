const surveyContainer = document.getElementById('survey-container');
const totalQuestions = 4;

function createQuestion(questionText, questionNumber, answers) {
    surveyContainer.innerHTML = `
        <div id="question-number" class="text-gray-500 text-sm absolute top-4 left-4">
            ${questionNumber} of ${totalQuestions}
        </div>
        <h1 class="text-4xl md:text-5xl lg:text-6xl mb-8 font-bold">${questionText}</h1>
        <div class="flex flex-col md:flex-row justify-center gap-4">
            <button class="bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 transition duration-300 transform hover:scale-105" data-answer="yes">
                ${answers.yes}
            </button>
            <button class="bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 transition duration-300 transform hover:scale-105" data-answer="no">
                ${answers.no}
            </button>
        </div>
    `;

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', handleAnswer);
    });
}

function handleAnswer(event) {
    const answer = event.target.dataset.answer;
    
    // Simple progression based on the answer
    if (answer === 'yes') {
        // Here, you would progress to the next question or outcome
        alert('You have chosen to proceed. The survey ends here for now.');
    } else {
        alert('You have chosen to refuse. The survey ends here for now.');
    }
}

function handleNoClick() {
    window.location.href = 'https://www.google.com';
}

function startSurvey() {
    createQuestion('Do you feel a presence behind you?', 1, { yes: 'Yes', no: 'No' });
}

document.getElementById('yes-btn').addEventListener('click', startSurvey);
document.getElementById('no-btn').addEventListener('click', handleNoClick);