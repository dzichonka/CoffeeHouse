'use strict';
//menu and modal
const tabButtons = document.querySelectorAll('.tab-btn');
const tabItemsContainer = document.querySelector('.tab_content');
console.log(tabItemsContainer);
const tabRefresh = document.querySelector('.tab_refresh');

const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal_img');
const modalTitle = document.querySelector('.modal_title');
const modalDescr = document.querySelector('.modal_descr');


const modalPrice = document.querySelector('.modal_price_sum');
const modalClose = document.querySelector('.modal_close');
const body = document.querySelector('body');


let currentIndex = 0;
let currentItems = [];

async function loadMenuData(category) {
  const response = await fetch(`./js/${category}.json`);
  const data = await response.json();
  currentItems = data;
  currentIndex = 0;
  displayItems();
  generateSizeBtns(category);
  generateAddBtns(category);
}
// modal dynamic

function generateSizeBtns(category) {
  const modalSizeBtns = document.querySelectorAll('.modal_size-dynamic');
  if (category === 'dessert') {
    modalSizeBtns[0].textContent = '50 g';
    modalSizeBtns[1].textContent = '100 g';
    modalSizeBtns[2].textContent = '200 g';
  } else {
    modalSizeBtns[0].textContent = '200 ml';
    modalSizeBtns[1].textContent = '300 ml';
    modalSizeBtns[2].textContent = '400 ml';
  }

}

function generateAddBtns(category) {
  const modalAddBtns = document.querySelectorAll('.modal_add-dynamic');
  console.log(modalAddBtns);
  if (category === 'coffee') {
    modalAddBtns[0].textContent = 'Sugar';
    modalAddBtns[1].textContent = 'Cinnamon';
    modalAddBtns[2].textContent = 'Syrup';
  } if (category === 'tea') {
    modalAddBtns[0].textContent = 'Sugar';
    modalAddBtns[1].textContent = 'Lemon';
    modalAddBtns[2].textContent = 'Syrup';
  }
  if (category === 'dessert') {
    modalAddBtns[0].textContent = 'Berries';
    modalAddBtns[1].textContent = 'Nuts';
    modalAddBtns[2].textContent = 'Jam';
  }
}
// cards 
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
    currentIndex = 0;
  }
  displayItems();
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

//modal

function openModal(item) {
  modalImg.src = item.img;
  modalImg.alt = item.title;
  modalTitle.textContent = item.title;
  modalDescr.textContent = item.description;
  modalPrice.textContent = item.price;
  modal.classList.remove('modal-closed');
  body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.add('modal-closed');
  body.style.overflow = '';
}

tabItemsContainer.addEventListener('click', (e) => {
  const card = e.target.closest('.menu-card');
  if (card) {
    const item = {
      img: card.querySelector('img').src,
      title: card.querySelector('.menu-card_title').textContent,
      description: card.querySelector('.menu-card_descr').textContent,
      price: card.querySelector('.menu-card_price').textContent,
    };
    openModal(item);
  }
});

modalClose.addEventListener('click', closeModal);