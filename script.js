const API_URL = 'https://ritzy-helix-pike.glitch.me/';

const getData = async () =>{
    const response = await fetch(API_URL + 'api/goods');
    const data = await response.json();
    return data;
}

const createCard = (item) =>{
    const cocktail = document.createElement('article');
    cocktail.classList.add('cocktail');

    cocktail.innerHTML = `
        <img class="cocktail__img" src="${API_URL}${item.image}" alt="Коктейль ${item.title}" width='256' height='304'>

        <div class="cocktail__content">
            <div class="cocktail__text">
                <h3 class="cocktail__title">${item.title}</h3>
                <p class="cocktail__price text-red">${item.price} ₽</p>
                <p class="cocktail__size">${item.size}</p>
            </div>

            <button class="cocktail__btn btn" data-id=${item.id}>Добавить</button>
        </div>
    `
    return cocktail;
}

const modalControler = ({modal, btnOpen, time = 300}) => {
    const buttonElems = document.querySelector(btnOpen);
    const modalElem = document.querySelector(modal);
    modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${time}ms ease-in-out;
    `;

    const closeModal = (event) => {
        const target = event.target;
        const code = event.code;

        if(target === modalElem || code === "Escape"){
            modalElem.style.opacity = 0;

            setTimeout(() => {
                modalElem.style.visibility = 'hidden';
            }, time);
            
            window.removeEventListener('keydown', closeModal);
        }
    };

    const openModal = () => {
            modalElem.style.visibility = 'visible';
            modalElem.style.opacity = 1;
            window.addEventListener('keydown', closeModal);
        };

    buttonElems.addEventListener('click', openModal);
    modalElem.addEventListener('click', closeModal);
    
    return {openModal, closeModal};
}

const init = async () =>{
    modalControler({
        modal: '.modal_order', 
        btnOpen: '.header__btn-order',
    });

    const goodsListElem = document.querySelector('.goods__list');
    const data = await getData();
    
    const cardsCocktail = data.map((item) => {
        const li = document.createElement('li');
        li.classList.add('goods__item');
        li.append(createCard(item));
        return li;
    })

    goodsListElem.append(...cardsCocktail);
};

init();

