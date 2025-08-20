const surveyContainer = document.getElementById('survey-container');

// We'll replace this dynamically with real IP + time
let userData = {
    ip: "unknown",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

// Fetch IP address for creepiness
fetch("https://api.ipify.org?format=json")
    .then(res => res.json())
    .then(data => {
        userData.ip = data.ip;
    });

// Creepy questions flow
const questions = [
    { text: "Do you feel safe right now?", answers: { yes: "Yes", no: "No" } },
    { text: `It’s ${userData.time} where you are. Why are you still awake?`, answers: { yes: "Because I can’t sleep", no: "It doesn’t matter" } },
    { text: "Have you noticed anyone watching you today?", answers: { yes: "Yes", no: "No" } },
    { text: "Do you remember locking your front door?", answers: { yes: "Yes", no: "No" } },
    { text: "Would you recognize the sound of your own screams?", answers: { yes: "Yes", no: "No" } },
    { text: "If something was standing behind you right now, would you turn around?", answers: { yes: "Yes", no: "No" } },
    { text: `We know your IP is ${userData.ip}. Do you think we’re close?`, answers: { yes: "Yes", no: "No" } },
    { text: "Do you believe your reflection in the mirror is always really you?", answers: { yes: "Yes", no: "No" } },
    { text: "When was the last time you dreamed about your own death?", answers: { yes: "Last night", no: "I don’t remember" } },
    { text: "If you disappeared tonight, who would notice first?", answers: { yes: "Someone close", no: "Nobody" } },
    { text: "Do you think the shadows in your room move when you aren’t looking?", answers: { yes: "Yes", no: "No" } },
    { text: "If your phone rang right now, who would you be afraid to hear?", answers: { yes: "A stranger", no: "Someone I know" } },
    { text: "Do you think you’ll survive until the end of this survey?", answers: { yes: "Yes", no: "No" } }
];

let currentQuestion = 0;

// --- Overlay scare system ---
let overlayChance = 0.2; // start 20%
let overlayTriggered = false;

function maybeShowOverlay() {
    let overlay = document.getElementById("creepyOverlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "creepyOverlay";
        overlay.innerText = Math.random() > 0.5 ? "CLOSE IT" : "STOP";
        document.body.appendChild(overlay);
    }

    // Roll dice OR guarantee first trigger
    if (Math.random() < overlayChance || !overlayTriggered) {
        overlayTriggered = true;
        overlay.style.display = "flex";
        setTimeout(() => {
            overlay.style.display = "none";
        }, 500);
        overlayChance = 0.1; // reset chance
    } else {
        overlayChance += 0.15; // increase chance
    }
}
// ------------------------------

async function createQuestion(questionText, questionNumber, answers) {
    surveyContainer.classList.add('fade-out');
    await new Promise(resolve => setTimeout(resolve, 500));

    surveyContainer.innerHTML = `
        <div id="question-number" class="text-gray-500 text-sm absolute top-4 left-4">
            ${questionNumber} of ${questions.length}
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
    surveyContainer.classList.remove('fade-out');
    surveyContainer.classList.add('fade-in');
    setTimeout(() => surveyContainer.classList.remove('fade-in'), 500);

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', handleAnswer);
    });

    // Try to show creepy overlay *sometimes*
    if (Math.random() < 0.3) {
        maybeShowOverlay();
    }
}

async function handleAnswer() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];
        await createQuestion(q.text, currentQuestion + 1, q.answers);
    } else {
        surveyContainer.innerHTML = `
            <h1 class="text-4xl md:text-5xl lg:text-6xl mb-8 font-bold text-red-600">
                Thank you for completing the survey.
            </h1>
            <p class="text-gray-400">We’ll be seeing you soon...</p>
        `;
    }
}

function handleNoClick() {
    window.location.href = 'https://www.google.com';
}

function startSurvey() {
    currentQuestion = 0;
    overlayChance = 0.2;
    overlayTriggered = false;
    const q = questions[currentQuestion];
    createQuestion(q.text, 1, q.answers);
}

document.getElementById('yes-btn').addEventListener('click', startSurvey);
document.getElementById('no-btn').addEventListener('click', handleNoClick);
