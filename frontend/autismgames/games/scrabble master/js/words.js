const wordText = document.querySelector(".word"),
    hintText = document.querySelector(".hint span"),
    timeText = document.querySelector(".time b"),
    inputField = document.querySelector("input"),
    refreshBtn = document.querySelector(".refresh-word"),
    checkBtn = document.querySelector(".check-word"),
    scoreText = document.querySelector(".score span"); // Score display

let correctWord, timer, score = 0;
let words = []; // Store words from the JSON file

// Fetch words from the online dictionary with basic hints
async function loadWordList() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json");
        const data = await response.json();
        const allWords = Object.keys(data);

        // Filter words between 4 to 10 letters for better gameplay
        const wordListWithHints = allWords
            .filter(word => word.length >= 4 && word.length <= 10)
            .map(word => ({
                word: word,
                hint: `Starts with "${word[0]}" and has ${word.length} letters.`
            }));

        words = wordListWithHints;
        initGame(); // Start the game after words are loaded
    } catch (error) {
        console.error("Error loading word list:", error);
        words = fallbackWords; // Use fallback list if fetch fails
        initGame();
    }
}

// Fallback word list if API fails
const fallbackWords = [
    { word: "apple", hint: "A common fruit." },
    { word: "bottle", hint: "Used to store liquids." },
    { word: "guitar", hint: "A musical instrument with strings." },
    { word: "rocket", hint: "Used for space travel." },
    { word: "pencil", hint: "Used for writing and drawing." }
];

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            timeText.innerText = maxTime;
        } else {
            alert(`Time's up! The correct word was: ${correctWord.toUpperCase()}`);
            initGame();
        }
    }, 1000);
};

const initGame = () => {
    if (words.length === 0) return; // Ensure words are loaded

    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    
    // Shuffle word
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
};

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if (!userWord) return alert("Please enter a word to check!");
    if (userWord !== correctWord) return alert(`Oops! ${userWord} is incorrect.`);

    score++; // Increase score on correct answer
    scoreText.innerText = score;
    alert(`Congrats! ${correctWord.toUpperCase()} is correct.`);
    initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

loadWordList(); // Load words on page load
