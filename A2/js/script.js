document.querySelector('.hamburger-menu').addEventListener('click', function() {
  const navbar = document.getElementById('navbar');
  if (navbar.style.display === 'none' || navbar.style.display === '') {
      navbar.style.display = 'flex';
  } else {
      navbar.style.display = 'none';
  }
});
// Target all pages using the class "page"
const allPages = document.querySelectorAll(".page");
// Check if the NodeList is empty
if (allPages.length === 0) {
  console.log("The NodeList is empty!");
} else {
  console.log("The NodeList is not empty!");
}
console.log(allPages);

// Initially, hide all pages
hideAll();
// Show the first page if there is at least one page
if (allPages.length > 0) {
  allPages[0].style.display = "block";
}

// Function to hide all pages
function hideAll() {
  for (let page of allPages) {
    page.style.display = "none";
    console.log("MOEWMLASKJMDASDZ?!!");
  }
}

// Function to show the selected page based on its number
function show(pageNumber) {
  hideAll();
  document.querySelector(`#page${pageNumber}`).style.display = "block";
}

// Add event listeners to page buttons to show the corresponding page
document.addEventListener("DOMContentLoaded", function() {
  // Loop through page buttons and add click event listeners
  for (let i = 1; i <= 4; i++) {
    let btnElement = document.getElementById(`page${i}btn`);
    if (btnElement) {
      btnElement.addEventListener("click", function() {
        show(i);
      });
    } else {
      console.warn(`Element with ID page${i}btn not found`);
    }
  }

  // Add click event listener for page 2 button with ID "page2btnhistory"
  btnElement2 = document.getElementById("page2btnhistory");
  if (btnElement2) {
    btnElement2.addEventListener("click", function() {
      show(2);
    });
  }

  // Add click event listener for page 4 button with ID "page4practice"
  btnElement4 = document.getElementById("page4practice");
  if (btnElement4) {
    btnElement4.addEventListener("click", function() {
      show(4);
    });
  }
});

// Slideshow functionality
let slideIndex = 1;
showSlide(slideIndex);

function changeSlide(n) {
  showSlide(slideIndex += n);
}

function showSlide(n) {
  const slides = document.getElementsByClassName("slide");
  // Reset the slide index if it goes beyond the number of slides
  if (n > slides.length) {
    slideIndex = 1;
  }
  // Reset the slide index if it goes below 1
  if (n < 1) {
    slideIndex = slides.length;
  }
  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  // Display the current slide
  slides[slideIndex - 1].style.display = "block";
}

// Function to click a specific slide
function clickSlide(index) {
  showSlide(index);
}

// Array of words for the typing practice
const words = [ "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
"it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
"this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
"or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
"so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
"when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
"people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
"than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
"back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
"even", "new", "want", "because", "any", "these", "give", "day", "most", "us"];

// Typing practice functionality
const wordDisplay = document.getElementById('word-display');
const userInput = document.getElementById('user-input');
const feedback = document.getElementById('feedback');
const restartBtn = document.getElementById('restart-btn');

let wordList = [];
let currentWordIndex = 0;
let startTime;

// Function to get a set of random words
function getRandomWordsSet() {
  let selectedWords = [];
  // Generate 50 random words from the words array
  for (let i = 0; i < 50; i++) {
    selectedWords.push(words[Math.floor(Math.random() * words.length)]);
  }
  return selectedWords;
}

// Function to display words in the word display element
function displayWords() {
  wordDisplay.innerHTML = wordList.map((word, index) => {
    // Highlight the current word
    if (index === currentWordIndex) {
      return `<span class="current-word">${word}</span>`;
    } else {
      return word;
    }
  }).join(' ');
}

// Function to start the typing test
function startTypingTest() {
  wordList = getRandomWordsSet();
  currentWordIndex = 0;
  displayWords();
  userInput.value = '';
  feedback.textContent = '';
  startTime = null;
}

// Event listener for user input during typing practice
userInput.addEventListener('input', function() {
  // Start the timer if it hasn't started already
  if (!startTime) {
    startTime = new Date();
  }

  // Check if the input matches the current word
  if (userInput.value.trim() === wordList[currentWordIndex]) {
    // Move to the next word
    currentWordIndex++;
    userInput.value = '';

    // Check if the typing test is finished
    if (currentWordIndex === wordList.length) {
      const endTime = new Date();
      const timeDiff = (endTime - startTime) / 1000; // in seconds
      const wpm = (wordList.length / timeDiff) * 60;
      // Display the typing speed feedback
      feedback.textContent = `Finished! Your WPM is ${Math.round(wpm)}.`;
      feedback.style.color = 'green';
    } else {
      // Display the next set of words
      displayWords();
    }
  }
});

// Event listener for the restart button
restartBtn.addEventListener('click', startTypingTest);

// Start the typing practice when the page loads
startTypingTest();

