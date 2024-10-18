'use strict';
//menu and modal
const tabButtons = document.querySelectorAll('.tab-btn');
const tabItemsContainer = document.querySelector('.tab_content');
//console.log(tabItemsContainer);
const tabRefresh = document.querySelector('.tab_refresh');

const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal_img');
const modalTitle = document.querySelector('.modal_title');
const modalDescr = document.querySelector('.modal_descr');
const modalSizeBtnsDynamic = document.querySelectorAll('.modal_size-dynamic');
const modalAddBtnsDynamic = document.querySelectorAll('.modal_add-dynamic');
const modalSizeBtns = document.querySelector('.modal_size-btns');
const modalAddBtns = document.querySelector('.modal_add-btns');
const modalPrice = document.querySelector('.modal_price_sum');
const modalClose = document.querySelector('.modal_close');
const body = document.querySelector('body');
let basePrice = 0;
let addCost = 0;
let sizeCost = 0;

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
  if (category === 'dessert') {
    modalSizeBtnsDynamic[0].textContent = '50 g';
    modalSizeBtnsDynamic[1].textContent = '100 g';
    modalSizeBtnsDynamic[2].textContent = '200 g';
  } else {
    modalSizeBtnsDynamic[0].textContent = '200 ml';
    modalSizeBtnsDynamic[1].textContent = '300 ml';
    modalSizeBtnsDynamic[2].textContent = '400 ml';
  }

}

function generateAddBtns(category) {
  if (category === 'coffee') {
    modalAddBtnsDynamic[0].textContent = 'Sugar';
    modalAddBtnsDynamic[1].textContent = 'Cinnamon';
    modalAddBtnsDynamic[2].textContent = 'Syrup';
  } if (category === 'tea') {
    modalAddBtnsDynamic[0].textContent = 'Sugar';
    modalAddBtnsDynamic[1].textContent = 'Lemon';
    modalAddBtnsDynamic[2].textContent = 'Syrup';
  }
  if (category === 'dessert') {
    modalAddBtnsDynamic[0].textContent = 'Berries';
    modalAddBtnsDynamic[1].textContent = 'Nuts';
    modalAddBtnsDynamic[2].textContent = 'Jam';
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
  document.querySelectorAll('.modal_size-btn.active').forEach(elem => elem.classList.remove('active'));
  document.querySelectorAll('.modal_add-btn.active').forEach(elem => elem.classList.remove('active'));
  document.querySelector('.base-active').classList.add('active');
  modalImg.src = item.img;
  modalImg.alt = item.title;
  modalTitle.textContent = item.title;
  modalDescr.textContent = item.description;
  modalPrice.textContent = item.price;
  basePrice = parseFloat(modalPrice.textContent.replace('$', ''));
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

// price

function updatePrice(sizeCost, addCost) {
  const newPrice = basePrice + sizeCost + addCost;
  modalPrice.textContent = `$${newPrice.toFixed(2)}`;
}

modal.addEventListener('click', (e) => {
  const sizeBtn = e.target.closest('.modal_size-btn');
  if (sizeBtn) {
    console.log('Size button clicked');
    document.querySelectorAll('.modal_size-btn').forEach(btn => btn.classList.remove('active'));
    sizeBtn.classList.add('active');
    const activeSizeBtns = document.querySelectorAll('.modal_size-btn.active');
    sizeCost = Array.from(activeSizeBtns).reduce((sum, btn) => {
      return sum + parseFloat(btn.dataset.size) || 0;
    }, 0);
  }
  const addBtn = e.target.closest('.modal_add-btn');
  if (addBtn) {
    console.log('Add button clicked');
    addBtn.classList.toggle('active');
    const activeAddBtns = document.querySelectorAll('.modal_add-btn.active');
    addCost = Array.from(activeAddBtns).reduce((sum, btn) => {
      return sum + parseFloat(btn.dataset.add) || 0;
    }, 0);
  }
  updatePrice(sizeCost, addCost);
});