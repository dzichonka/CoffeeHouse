'use strict';

const tabButtons = document.querySelectorAll('.tab-button');
const tabItemsContainer = document.querySelector('.tab_content');
console.log(tabItemsContainer);
const tabRefresh = document.querySelector('.tab_refresh');


let currentIndex = 0;
let currentItems = [];

async function loadMenuData(category) {
  const response = await fetch(`./js/${category}.json`);
  const data = await response.json();
  currentItems = data;
  currentIndex = 0;
  displayItems();
}

function displayItems() {
  tabItemsContainer.innerHTML = '';
  const itemsToShow = currentItems.slice(currentIndex, currentIndex + 4);
  itemsToShow.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('tab_card', 'menu-card');
    card.innerHTML = `
      <div class="menu-card_img"><img src="${item.img}" alt="${item.title}"></div>
      <div class="menu-card_text">
        <div class="menu-card_title">${item.title}</div>
        <div class="menu-card_descr">${item.description}</div>
        <div class="menu-card_price">${item.price}</div>
      </div>
    `;
    tabItemsContainer.appendChild(card);
  });
  if (currentItems.length > 4) {
    tabRefresh.style.display = 'flex';
  } else {
    tabRefresh.style.display = 'none';
  }
}
function handleRefresh() {
  currentIndex += 4;
  if (currentIndex >= currentItems.length) {
    currentIndex = 0; // Возвращаемся к началу, если дошли до конца
  }
  displayItems(); // Показываем следующие 4 элемента
}

function handleTab(event) {
  tabButtons.forEach(button => button.classList.remove('active'));
  event.currentTarget.classList.add('active');

  const category = event.currentTarget.dataset.category;
  loadMenuData(category);
}
tabButtons.forEach(button => {
  button.addEventListener('click', handleTab);
});

tabRefresh.addEventListener('click', handleRefresh);

window.onload = () => {
  loadMenuData('coffee');
};