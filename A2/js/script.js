// JavaScript code to handle arrow button clicks
const sections = document.querySelectorAll('.section');
let currentSection = 0;

function showSection(index) {
  sections[currentSection].classList.remove('expanded');
  currentSection = index;
  sections[currentSection].classList.add('expanded');
}

function showNextSection() {
  if (currentSection < sections.length - 1) {
    showSection(currentSection + 1);
  }
}

function showPreviousSection() {
  if (currentSection > 0) {
    showSection(currentSection - 1);
  }
}

const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');

leftArrow.addEventListener('click', showPreviousSection);
rightArrow.addEventListener('click', showNextSection);
