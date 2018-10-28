const refsModal = {
  page: document.querySelector("body"),
  form: document.querySelector(".form"),
  list:  document.querySelector('.search-answer'),
  img: document.querySelector(".pop-up__img"),
  btnSearch: document.querySelector(".search-form__btn"),
  delete: document.querySelector(".js-delete"),
  more: document.querySelector(".js-more"),

  prev: document.querySelector(".js-prev"),
  next: document.querySelector(".js-next"),
  select: document.querySelector(".js-select"),
  close: document.querySelector(".js-close")
};

const popUpClose = () => refsModal.page.classList.remove('pop-up_active');

function popUpOpen(event) {
  event.preventDefault();
  const target = event.target;
  const popupImageSrc = refsModal.img;
  popupImageSrc.src = target.src;
  console.log("event target: ", target.src); // посмотрите что тут
  if (target.nodeName !== "IMG") return;
  refsModal.page.classList.add('pop-up_active');
}

refsModal.list.addEventListener('click', popUpOpen);
refsModal.close.addEventListener('click', popUpClose);
