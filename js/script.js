'use strct';

window.addEventListener('DOMContentLoaded', () => {
  //hamburger menu

  const nav = document.querySelector('.header_nav');
  const navItem = document.querySelectorAll('.header-item');
  const menuLink = document.querySelector('.header_menu-link');
  const hamburger = document.querySelector('.hamburger');
  const logo = document.querySelector('.header_logo');

  function toggleMenu() {
    hamburger.classList.toggle('hamburger_open');
    nav.classList.toggle('header_nav_open');
    menuLink.classList.toggle('header_menu-link_open');
  }

  function closeMenu() {
    hamburger.classList.remove('hamburger_open');
    nav.classList.remove('header_nav_open');
    menuLink.classList.remove('header_menu-link_open');
  }

  hamburger.addEventListener('click', function (e) {
    e.stopPropagation(); // Предотвращаем всплытие события до документа
    toggleMenu();
  });

  window.onscroll = (event) => {
    if (nav.classList.contains('header_nav_open')) {
      closeMenu();
    }
  };

  navItem.forEach(item => {
    item.addEventListener('click', closeMenu);
  });
  menuLink.addEventListener('click', closeMenu);
  logo.addEventListener('click', closeMenu);

});