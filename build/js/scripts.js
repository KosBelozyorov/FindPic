"use strict";

var refs = {
  form: document.querySelector('.form'),
  loadMore: document.querySelector('.search-load-more'),
  loadMoreBtn: document.querySelector('.search-load-more__btn'),
  input: document.querySelector('.search-form__input'),
  grid: document.querySelector('.search-answer'),
  page: document.querySelector('.page'),
  pageHeader: document.querySelector('.page-header'),
  siteLogo: document.querySelector('.site-logo'),
  mainPage: document.querySelector('.site-logo__link'),
  favoriteTitle: document.querySelector('.favorite-title'),
  imgPerPage: 12
};
var currentPage = 1;
var currentQuery = '';
refs.form.addEventListener('submit', handleFormSubmit);
refs.loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick); //======================================================================

function handleFormSubmit(evt) {
  evt.preventDefault();
  currentQuery = refs.input.value;
  if (currentQuery === '') return;
  refsModal.favoriteTitle.innerHTML = '';
  refs.pageHeader.classList.remove('page-header');
  refs.pageHeader.classList.add('is-active');
  refs.siteLogo.classList.remove('site-logo');
  refs.siteLogo.classList.add('is-click');
  refsModal.select.classList.remove('hidden');
  currentPage = 1;
  refs.grid.innerHTML = '';
  loadPhotos();
  refs.form.reset();
}

function imagesRequest(query) {
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var url = "https://pixabay.com/api/?key=10502586-9b5f28e8ed93518550ea5da27&q=".concat(query, "&per_page=").concat(refs.imgPerPage, "&page=").concat(page);
  return axios.get(url).then(function (response) {
    return response.data;
  }).catch(function (error) {
    console.log(error);
  });
}

function createGridItems(items) {
  return items.reduce(function (markup, item) {
    return markup + "<div class=\"search-answer__image\"><img src=\"".concat(item.webformatURL, "\" alt=\"\"></div>");
  }, '');
}

function handleLoadMoreBtnClick() {
  currentPage += 1;
  loadPhotos();
}

function loadPhotos() {
  imagesRequest(currentQuery, currentPage).then(function (data) {
    var total = data.totalHits;
    var counter = data.hits;
    var totalPages = Math.ceil(total / refs.imgPerPage);

    if (currentPage === totalPages) {
      refs.loadMoreBtn.textContent = "Все картинки показаны";
      refs.loadMoreBtn.disabled = true;
    } else if (currentPage !== totalPages) {
      refs.loadMoreBtn.disabled = false;
      refs.loadMoreBtn.textContent = "Показать еще";
    }

    var markup = createGridItems(counter);
    refs.grid.insertAdjacentHTML('beforeend', markup);
    refs.page.classList.add('show-btn');
  });
} //=================================================


function loadMainPage() {
  refsModal.favoriteTitle.innerHTML = '';
  refs.grid.innerHTML = '';
  refs.page.classList.remove('show-btn');
  refsModal.pageHeader.classList.remove('is-active');
  refsModal.pageHeader.classList.add('page-header');
  refsModal.siteLogo.classList.remove('is-click');
  refsModal.siteLogo.classList.add('site-logo');
  refsModal.select.classList.remove('hidden');
}

refs.mainPage.addEventListener('click', loadMainPage);
"use strict";

var refsModal = {
  page: document.querySelector("body"),
  form: document.querySelector(".form"),
  list: document.querySelector('.search-answer'),
  img: document.querySelector(".pop-up__img"),
  btnSearch: document.querySelector(".search-form__btn"),
  delete: document.querySelector(".js-delete"),
  more: document.querySelector(".js-more"),
  favorite: document.querySelector('.site-favorite__link'),
  prev: document.querySelector(".js-prev"),
  next: document.querySelector(".js-next"),
  select: document.querySelector(".js-select"),
  close: document.querySelector(".js-close"),
  grid: document.querySelector('.search-answer'),
  pageHeader: document.querySelector('.page-header'),
  siteLogo: document.querySelector('.site-logo'),
  popUp: document.querySelector('.pop-up'),
  addToFav: document.querySelector('.add-to-fav'),
  favoriteTitle: document.querySelector('.favorite-title')
};
var imgCount = 0;

function popUpClose(e) {
  if (e.target == refsModal.popUp || e.target == refsModal.close) {
    refsModal.page.classList.remove('pop-up_active');
  }
}

function popUpOpen(event) {
  var ls = Array.from(document.querySelectorAll(".search-answer > div > img"));
  var nodeName = event.target.nodeName;
  var targetId;

  if (nodeName === 'DIV') {
    targetId = ls.indexOf(event.target.firstChild);
  } else if (nodeName === 'IMG') {
    targetId = ls.indexOf(event.target);
  }

  var targetImg = ls[targetId];
  var popupImageSrc = refsModal.img;
  if (targetImg === undefined) return;
  popupImageSrc.src = targetImg.src;

  function popUpNext() {
    var nextTargetId;

    if (targetId >= ls.length - 1) {
      targetId = 0;
      nextTargetId = targetId;
    } else {
      nextTargetId = targetId + 1;
    }

    targetId = nextTargetId;
    var nextTargetImg = ls[targetId];
    var nextPopupImageSrc = refsModal.img;
    nextPopupImageSrc.src = nextTargetImg.src;
  }

  function popUpPrev() {
    var prevTargetId;

    if (!(targetId <= 0)) {
      prevTargetId = targetId - 1;
    } else {
      targetId = ls.length - 1;
      prevTargetId = targetId;
    }

    targetId = prevTargetId;
    var prevTargetImg = ls[targetId];
    var prevPopupImageSrc = refsModal.img;
    prevPopupImageSrc.src = prevTargetImg.src;
  }

  refsModal.page.classList.add('pop-up_active');
  refsModal.next.addEventListener('click', popUpNext);
  refsModal.prev.addEventListener('click', popUpPrev);
}

refsModal.list.addEventListener('click', popUpOpen, true);
refsModal.close.addEventListener('click', popUpClose);
refsModal.popUp.addEventListener('click', popUpClose); // ================================

var array = [];
refsModal.favorite.addEventListener('click', handleFavoriteBtnClick);
refsModal.select.addEventListener('click', handleSelectBtnClick, true);

function handleSelectBtnClick() {
  var value = refsModal.img.src;
  array.push(value);
  localStorage.setItem('images', JSON.stringify(array));
  refsModal.addToFav.classList.remove('add-to-fav');
  refsModal.addToFav.classList.add('add-to-fav__active');

  function popUpSelectBtnClick() {
    refsModal.addToFav.classList.remove('add-to-fav__active');
    refsModal.addToFav.classList.add('add-to-fav');
  }

  var timerId = setTimeout(popUpSelectBtnClick, 2000);
  imgCount = imgCount + 1;
  return imgCount;
}

function handleFavoriteBtnClick() {
  refsModal.favoriteTitle.innerHTML = '';
  refsModal.list.innerHTML = '';
  refsModal.page.classList.remove('show-btn');
  refsModal.pageHeader.classList.remove('page-header');
  refsModal.pageHeader.classList.add('is-active');
  refsModal.siteLogo.classList.remove('site-logo');
  refsModal.select.classList.add('hidden');
  refsModal.siteLogo.classList.add('is-click');
  var arrayImg = JSON.parse(localStorage.getItem('images'));
  var header = "<h2 class=\"site-favorite__link\">\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435 (".concat(imgCount, ")</h2>");
  refsModal.favoriteTitle.insertAdjacentHTML('beforeend', header);
  var elem = arrayImg.reduce(function (markup, img) {
    return markup + "<div class=\"search-answer__image\"><img src=\"".concat(img, "\" alt=\"\">\n<button class=\"btn_remove\"></button></div>");
  }, '');
  refsModal.list.insertAdjacentHTML('beforeend', elem);
}

refsModal.list.addEventListener('click', handleDeleteImage);

function handleDeleteImage(event) {
  var nodeName = event.target.nodeName;

  if (nodeName === 'BUTTON') {
    var parent = event.target.parentNode;
    parent.remove();
    var targetToDel = parent.firstChild.src;
    removeFromLocalStorage(targetToDel);
    imgCount = imgCount - 1;
    handleFavoriteBtnClick();
  }

  return imgCount;
}

function removeFromLocalStorage(url) {
  var imgArr = JSON.parse(localStorage.getItem('images'));
  var imgToDelete = imgArr.filter(function (el) {
    return el === url;
  });
  imgArr.splice(imgArr.indexOf(imgToDelete), 1);
  localStorage.setItem('images', JSON.stringify(imgArr));
}