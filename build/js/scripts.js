"use strict";

var refs = {
  form: document.querySelector('.form'),
  loadMoreBtn: document.querySelector('.search-load-more__btn'),
  input: document.querySelector('.search-form__input'),
  grid: document.querySelector('.search-answer')
};
console.log("refs.form: ", refs.form);
var currentPage = 1;
var currentQuery = ''; // https://pixabay.com/api/?key=10502586-9b5f28e8ed93518550ea5da27&q=dog
// 10502586-9b5f28e8ed93518550ea5da27

refs.form.addEventListener('submit', handleFormSubmit);
refs.loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick); //======================================================================

function handleFormSubmit(evt) {
  evt.preventDefault();
  currentQuery = refs.input.value;
  currentPage = 1;
  refs.grid.innerHTML = '';
  loadPhotos();
  refs.form.reset();
}

function imagesRequest(query) {
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var url = "https://pixabay.com/api/?key=10502586-9b5f28e8ed93518550ea5da27&q=".concat(query, "&per_page=12&page=").concat(page);
  return axios.get(url).then(function (response) {
    return response.data.hits;
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
  imagesRequest(currentQuery, currentPage).then(function (photos) {
    var markup = createGridItems(photos);
    refs.grid.insertAdjacentHTML('beforeend', markup);
  });
}
"use strict";

var refsModal = {
  page: document.querySelector("body"),
  form: document.querySelector(".form"),
  list: document.querySelector('.search-answer'),
  img: document.querySelector(".pop-up__img"),
  btnSearch: document.querySelector(".search-form__btn"),
  delete: document.querySelector(".js-delete"),
  more: document.querySelector(".js-more"),
  prev: document.querySelector(".js-prev"),
  next: document.querySelector(".js-next"),
  select: document.querySelector(".js-select"),
  close: document.querySelector(".js-close")
};

var popUpClose = function popUpClose() {
  return refsModal.page.classList.remove('pop-up_active');
};

function popUpOpen(event) {
  event.preventDefault();
  var target = event.target;
  var popupImageSrc = refsModal.img;
  popupImageSrc.src = target.src;
  console.log("event target: ", target.src); // посмотрите что тут

  if (target.nodeName !== "IMG") return;
  refsModal.page.classList.add('pop-up_active');
}

refsModal.list.addEventListener('click', popUpOpen);
refsModal.close.addEventListener('click', popUpClose);