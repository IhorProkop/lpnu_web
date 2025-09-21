"use strict";

document.addEventListener("click", documentAction);


function documentAction(e) {
    const targetElement = e.target;

    if (targetElement.closest(".header__burger")) {
        document.body.classList.toggle("menu-open");
    }
}


const buttonGroup = document.querySelector('.header__auth-buttons');
const navMenu = document.querySelector('.header__menu');
const burgerMenu = document.querySelector('.header__burger')

let isMoved = false;

function moveButtonsIfNeeded() {
    if (window.innerWidth <= 504 && !isMoved) {
        navMenu.appendChild(buttonGroup);
        isMoved = true;
    } else if (window.innerWidth > 504 && isMoved) {
        burgerMenu.before(buttonGroup)
        isMoved = false;
    }
}

moveButtonsIfNeeded();

window.addEventListener('resize', moveButtonsIfNeeded);
