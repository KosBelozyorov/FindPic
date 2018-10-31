const refsModal = {
  page: document.querySelector("body"),
  form: document.querySelector(".form"),
  list:  document.querySelector('.search-answer'),
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
  
};


const popUpClose = () => refsModal.page.classList.remove('pop-up_active');

function popUpOpen(event) {
  event.preventDefault();
  const target = event.target;
  // console.log(refsModal.select);
  const popupImageSrc = refsModal.img;
  popupImageSrc.src = target.src;
  console.log("event target: ", target.src); // посмотрите что тут
  if (target.nodeName !== "IMG") return;
  refsModal.page.classList.add('pop-up_active');
  
}


refsModal.list.addEventListener('click', popUpOpen,true);
refsModal.close.addEventListener('click', popUpClose);
refsModal.list.addEventListener('click', handleBtnClick,true);
// ================================
  const array = [];
  function handleBtnClick(evt) {
    evt.preventDefault();

    const value = evt.target.src ;
    array.push(value);
 
}


refsModal.favorite.addEventListener('click', handleFavoriteBtnClick);
refsModal.select.addEventListener('click',  handleSelectBtnClick);

function handleSelectBtnClick() {
  console.log(array);

  localStorage.setItem('images', JSON.stringify(array));
  
}

function handleFavoriteBtnClick() {

  refsModal.grid.innerHTML = '';
   refsModal.page.classList.remove('show-btn');
   refsModal.pageHeader.classList.remove('page-header');
   refsModal.pageHeader.classList.add('is-active');
   refsModal.siteLogo.classList.remove('site-logo');
   refsModal.siteLogo.classList.add('is-click');
   
   const header = `<h2 class="site-favorite__link">Избранное</h2>`;
   refsModal.grid.insertAdjacentHTML('beforeend',header);
const arrayImg = JSON.parse(localStorage.getItem('images'));
const elem = arrayImg.reduce((markup, img) => markup + `<div class="search-answer__image"><img src="${img}" alt="">
</div>`,
'',);
refsModal.grid.insertAdjacentHTML('beforeend',elem);
// createElem(arrayImg);

}



// function createElem(arr) {
//   const elem = arr.reduce((markup, img) => markup + `<h2>Избранное</h2><div class="search-answer__image"><img src="${img}" alt="">
//   </div>`,
//   '',);
//   refsModal.grid.insertAdjacentHTML('beforeend',elem);

// }

