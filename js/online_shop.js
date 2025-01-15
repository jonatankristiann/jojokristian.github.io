// button class aktiv 

const navbarNav = document.querySelector('.navbar-nav');

// ketika menu di klik

document.querySelector('#humburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

// search menu

const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
};

// shopping cart

const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    e.preventDefault();
};

// klik diluar sidebar untuk hilang sidebar

const hm = document.querySelector('#humburger-menu');
const sb = document.querySelector('#search-button');
const sh = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function (e) {
    if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
    if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }
    if (!sh.contains(e.target) && !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active');
    }
});

// modal box

const itemDetail = document.querySelector('#item-detail');
const itemDetailButton = document.querySelectorAll('.item-detail-button');

itemDetailButton.forEach((btn) => {
    btn.onclick = (e) => {
        itemDetail.style.display = 'flex';
        e.preventDefault();
    };
});


// tombol close

document.querySelector('.modal .close-icons').onclick = (e) => {
    itemDetail.style.display = 'none';
    e.preventDefault();
};

// clik diluar tombol 

const modal = document.querySelector('#item-detail');
window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
};
