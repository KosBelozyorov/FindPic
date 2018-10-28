const refs = {
    page: document.querySelector("body"),
    form: document.querySelector(".search-form"),
    btnSearch: document.querySelector(".search-form__btn"),
    delete: document.querySelector(".js-delete"),
    more: document.querySelector(".js-more"),

    prev: document.querySelector(".js-prev"),
    next: document.querySelector(".js-next"),
    select: document.querySelector(".js-select"),
    close: document.querySelector(".js-close")
};
localStorage.setItem('img','choise')
//Этот массив объектов временный для наглядности. Вместо него должен приходить массив объектов из АПИ
const pictures = [
    {
        img: 'images/bynns1-tif.png',
        name: 'alt'
    },
    {
        img: 'images/bynns1-tif.png',
        name: 'alt'
    },
    {
        img: 'images/bynns1-tif.png',
        name: 'alt'
    },
    {
        img: 'images/bynns1-tif.png',
        name: 'alt'
    },
    {
        img: 'images/bynns1-tif.png',
        name: 'alt'
    },
    {
        img: 'images/bynns1-tif.png',
        name: 'alt'
    },
    {
        img: 'images/bynns1-tif.png',
        name: 'alt'
    },
    {
        img: 'images/bynns1-tif.png',
        name: 'alt'
    },
    {
        img: 'images/bynns1-tif.png',
        name: 'alt'
    },
    {
        img: 'images/bynns1-tif.png',
        name: 'alt'
    },
    {
        img: 'images/bynns1-tif.png',
        name: 'alt'
    },
    {
        img: 'images/bynns1-tif.png',
        name: 'alt'
    },
    {
        img: 'images/bynns1-tif.png',
        name: 'alt'
    },
    {
        img: 'images/bynns1-tif.png',
        name: 'alt'
    },
    {
        img: 'images/bynns1-tif.png',
        name: 'alt'
    },
    {
        img: 'images/bynns1-tif.png',
        name: 'alt'
    }
    ];
//Константы для рендера разметки
const list =  document.querySelector('.pict-list');
const sourse = document.querySelector('#pict').innerHTML.trim();
const tpl = Handlebars.compile(sourse);

const marcupHTML = (arr) => {
    const marcup = arr
        .reduce((acc, img) => acc + tpl(img), '');
    list.innerHTML = marcup;
}
marcupHTML(pictures);


const popUpClose = () => refs.page.classList.remove('pop-up_active');





function popUpOpen(event) {
  event.preventDefault();
  const target = event.target;
  //console.log("event target: ", target); // посмотрите что тут
  if (target.nodeName !== "LI") return;
  refs.page.classList.add('pop-up_active');
}




list.addEventListener('click', popUpOpen);
refs.close.addEventListener('click', popUpClose);