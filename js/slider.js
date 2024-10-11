'use strict';
// slider

const sliderLine = document.querySelector('.slider_line');
const sliderWindow = document.querySelector('.slider_items');
const slides = document.querySelectorAll('.slide');
const leftBtn = document.querySelector('.slider_arrow__left');
const rightBtn = document.querySelector('.slider_arrow__right');
const controlProgress = document.querySelectorAll('.control_progress');

let offset = 0;
let width = parseInt(window.getComputedStyle(sliderWindow).width);
let intervalId;

slides.forEach((slide) => {
  slide.style.width = width + 'px';
});

const updateTransform = (i) => {
  sliderLine.style.transform = `translateX(-${i}px)`;
  console.log(i);
};
const fillingLine = (lineID = (offset / width)) => {
  controlProgress.forEach((line) => {
    line.style.transition = `none`;
    line.style.width = `0%`;
  });
  controlProgress[lineID].style.transition = `width 5s ease`;
  controlProgress[lineID].style.width = `100%`;
};
const showNext = () => {
  if (offset == width * (slides.length - 1)) {
    offset = 0;
  } else {
    offset += width;
  }
  updateTransform(offset);
  fillingLine();
};
const showPrew = () => {
  if (offset == 0) {
    offset = width * (slides.length - 1);
  } else {
    offset -= width;
  }
  updateTransform(offset);
  fillingLine();
};

const scrollDeffault = () => {
  intervalId = setInterval(() => {
    showNext();
  }, 5000);
  fillingLine();
};

scrollDeffault();

const stopInterval = () => {
  clearInterval(intervalId);
};

rightBtn.addEventListener('click', () => {
  stopInterval();
  showNext();
  scrollDeffault();
});
leftBtn.addEventListener('click', () => {
  stopInterval();
  showPrew();
  scrollDeffault();
});