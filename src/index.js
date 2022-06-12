// @ts-ignore
import './assets/styles/chief-slider.min.css'
import './style.scss';
import { slider } from "./assets/scripts/slider";

slider();

const aside = document.querySelector('.menu');
const close = document.querySelector('.menu__close');
const burger = document.querySelector('.header__burger');
const body = document.querySelector('body');

burger.addEventListener('click', () => {
  aside.style.display = 'block';
  body.style.overflowY = 'hidden';
});
close.addEventListener('click', () => {
  aside.style.display = 'none';
  body.style.overflowY = 'auto';
});

const row = document.querySelector('.popular__row');

export const GenerateItem = function (
  category,
  name,
  discount,
  price,
  count,
  image,
  id
) {
  this.category = category;
  this.name = name;
  this.discount = discount;
  this.price = price;
  this.count = count;
  this.image = image;
  this.id = id;
};

const addStorageItems = async () => {
  const response = await fetch(
    'http://ec2-3-91-9-40.compute-1.amazonaws.com:31337/products/'
  );
  const cards = await response.json();


  if (localStorage.length === 0) {
    localStorage.setItem('items', JSON.stringify(cards));
  }

  const addItem = (category, title, discount, price, count, url, id) => {
    const liItem = document.createElement('li');
    const card = document.createElement('div');
    const img = document.createElement('img');
    const fastCheck = document.createElement('a');
    const discountPop = document.createElement('span');
    const addBtn = document.createElement('button');
    const priceRow = document.createElement('div');
    const priceNow = document.createElement('p');
    const priceLater = document.createElement('p');
    const addBtnPlus = document.createElement('i');
    const nameItem = document.createElement('div');
    const hiddenBlock = document.createElement('div');
    const addMinus = document.createElement('i');
    const counter = document.createElement('span');
    const addPlus = document.createElement('i');

    if (count > 0) {
      addBtn.style.display = 'block';
    }

    card.dataset.id = id;
    const getImage = JSON.parse(localStorage.getItem('items'));
    img.src = getImage[id - 1].image_url;


    const fastCheckTxtNode = document.createTextNode('Быстрый просмотр');
    const discountPopTxtNode = document.createTextNode(discount + '%');
    const priceNowTxt = document.createTextNode(price + ' BYN');
    const nameItemTxtNode = document.createTextNode(title + '');
    const priceLaterTxt = document.createTextNode(Math.ceil(price / (100 - discount) * 10000) / 100 + ' BYN');

    fastCheck.append(fastCheckTxtNode);
    discountPop.append(discountPopTxtNode);
    priceNow.append(priceNowTxt);
    priceLater.append(priceLaterTxt);
    nameItem.append(nameItemTxtNode);

    liItem.className = 'popular__item';
    card.className = 'popular__card';
    img.className = 'popular__img';
    fastCheck.className = 'popular__fast-check';
    discountPop.className = 'popular__discount';
    addBtn.className = 'popular__add';
    addBtnPlus.className = 'fa-solid fa-plus';
    priceRow.className = 'popular__price-row';
    priceNow.className = 'popular__price-now';
    priceLater.className = 'popular__price-later';
    nameItem.className = 'popular__name';
    addMinus.className = 'fa-solid fa-minus minus--hidden';
    addPlus.className = 'fa-solid fa-plus plus--hidden';
    hiddenBlock.className = 'popular__hidden-block';

    liItem.append(card);
    card.append(img);
    card.append(fastCheck);
    card.append(discountPop);
    addBtn.append(addBtnPlus);
    card.append(addBtn);
    liItem.append(priceRow);
    priceRow.append(priceNow);
    priceRow.append(priceLater);
    row.append(liItem);
    liItem.append(nameItem);

    if (count > 0) {
      card.append(hiddenBlock);
      hiddenBlock.style.display = 'block';
      counter.innerText = count;
      hiddenBlock.style.display = 'flex';
    } else {
      card.append(hiddenBlock);
    }

    hiddenBlock.append(addMinus);
    hiddenBlock.append(counter);
    hiddenBlock.append(addPlus);

    addBtn.addEventListener('click', () => {
      addBtn.style.display = 'none';
      hiddenBlock.style.display = 'flex';
    });

    addBtn.addEventListener('click', (event) => {
      const getCards = JSON.parse(localStorage.getItem('items'));
      const currentElem = event.target.closest('.popular__card');
      const selectedTodo = getCards.find(
        (item) => +item.id === +currentElem.dataset.id
      );
      selectedTodo.count++;
      counter.innerText = selectedTodo.count;
      localStorage.setItem('items', JSON.stringify(getCards));
    });

    addPlus.addEventListener('click', (event) => {
      const getCards = JSON.parse(localStorage.getItem('items'));
      const currentElem = event.target.closest('.popular__card');
      const selectedTodo = getCards.find(
        (item) => +item.id === +currentElem.dataset.id
      );
      selectedTodo.count++;
      counter.innerText = selectedTodo.count;
      localStorage.setItem('items', JSON.stringify(getCards));
    });

    addMinus.addEventListener('click', (event) => {
      const getCards = JSON.parse(localStorage.getItem('items'));
      const currentElem = event.target.closest('.popular__card');
      const selectedTodo = getCards.find(
        (item) => +item.id === +currentElem.dataset.id
      );
      if (selectedTodo.count < 1) {
      } else {
        selectedTodo.count--;
        counter.innerText = selectedTodo.count;
        localStorage.setItem('items', JSON.stringify(getCards));
      }
      if (selectedTodo.count === 0) {
        const newBlock = currentElem.querySelector('.popular__hidden-block');
        hiddenBlock.style.display = 'none';
        addBtn.style.display = 'block';
      }
    });

    fastCheck.addEventListener('click', () => {
      const fastCheckBlock = document.createElement('div');
      fastCheckBlock.dataset.id = id;
      const fastCheckClose = document.createElement('div');
      const fastCheckBlockImg = document.createElement('div');
      const fastCheckBlockDescription = document.createElement('div');
      const fastCheckBlockDescriptionTitle = document.createElement('h2');
      const fastCheckBlockDescriptionTitleText = document.createTextNode(title);
      const fastCheckBlockDescriptionPrice = document.createElement('h3');
      const fastCheckBlockDescriptionPriceText = document.createTextNode('Стоимость: '+ price + ' BYN' )
      const fastCheckBlockDescriptionCategory = document.createElement('h3');
      const fastCheckBlockDescriptionCategoryText = document.createTextNode('Категория: ' + category);
      const fastCheckBlockDescriptionDiscount = document.createElement('h3');
      const fastCheckBlockDescriptionDiscountText = document.createTextNode('Вы экономите: ' + discount + '%');
      const fastCheckBlockDescriptionBtn = document.createElement('button');
      const fastCheckBlockDescriptionBtnText = document.createTextNode('Добавить в корзину');
      const fastCheckBlockDescriptionBtnCount = document.createElement('p');
      let fastCheckBlockDescriptionCountText = document.createTextNode('')


      if (counter.innerText > 0){
        fastCheckBlockDescriptionCountText = ('В корзине ' + counter.innerText + ' шт.');
      };

      fastCheckBlock.className = 'fastCheckBlock';
      fastCheckBlockImg.className = 'fastCheckBlockImg';
      fastCheckBlockDescription.className = 'fastCheckBlockDescription';
      fastCheckClose.className = 'fastCheckClose fa-regular fa-circle-xmark fa-2x';
      fastCheckBlockDescriptionCategory.className = 'fastCheckBlockDescriptionCategory';
      fastCheckBlockDescriptionBtn.className = 'fastCheckBlockDescriptionBtn title3';
      fastCheckBlockDescriptionBtnCount.className = 'fastCheckBlockDescriptionBtnCount'

      fastCheckBlock.append(fastCheckClose);
      fastCheckBlockImg.append(img);
      fastCheckBlock.append(fastCheckBlockImg);
      fastCheckBlockDescriptionTitle.append(fastCheckBlockDescriptionTitleText);
      fastCheckBlockDescription.append(fastCheckBlockDescriptionTitle);
      fastCheckBlockDescriptionPrice.append(fastCheckBlockDescriptionPriceText);
      fastCheckBlockDescription.append(fastCheckBlockDescriptionPrice)
      fastCheckBlockDescriptionCategory.append(fastCheckBlockDescriptionCategoryText);
      fastCheckBlockDescription.append(fastCheckBlockDescriptionCategory);
      fastCheckBlockDescriptionDiscount.append(fastCheckBlockDescriptionDiscountText);
      fastCheckBlockDescription.append(fastCheckBlockDescriptionDiscount);
      fastCheckBlockDescriptionBtn.append(fastCheckBlockDescriptionBtnText);
      fastCheckBlockDescriptionBtnCount.append(fastCheckBlockDescriptionCountText);
      fastCheckBlockDescriptionBtn.append(fastCheckBlockDescriptionBtnCount);
      fastCheckBlockDescription.append(fastCheckBlockDescriptionBtn)
      fastCheckBlock.append(fastCheckBlockDescription);
      body.append(fastCheckBlock);

      fastCheckBlockDescriptionBtn.addEventListener('click', (event) =>{
        const getCards = JSON.parse(localStorage.getItem('items'));
        const currentElem = event.target.closest('.fastCheckBlock');
        const selectedTodo = getCards.find(
          (item) => +item.id === +currentElem.dataset.id
        );
        selectedTodo.count++;
        fastCheckBlockDescriptionBtn.innerText = ('В корзине ' + selectedTodo.count + ' шт.');
        localStorage.setItem('items', JSON.stringify(getCards));
      });
      fastCheckClose.addEventListener('click', (event) => {
        const getCards = JSON.parse(localStorage.getItem('items'));
        const currentElem = event.target.closest('.fastCheckBlock');
        const selectedTodo = getCards.find(
          (item) => +item.id === +currentElem.dataset.id
        );
        if (selectedTodo.count > 0) {
          fastCheckBlock.remove();
          card.append(img);
          addBtn.append(addBtnPlus);
          card.append(addBtn);
          card.append(hiddenBlock);
          card.append(discountPop);
          addBtn.style.display = 'none';
          hiddenBlock.style.display = 'flex';
          counter.innerText = selectedTodo.count;
        } else {
          fastCheckBlock.remove();
          card.append(img);
          addBtn.append(addBtnPlus);
          card.append(addBtn);
          card.append(hiddenBlock);
          card.append(discountPop);
        }
      });

    });
  };

  const getCard = () => {
    function randomItems() {
      for (let i = 0; i < 6; i++) {
        const randCard = allItems[Math.ceil(Math.random() * 100)];
        addItem(
          randCard.category,
          randCard.title,
          randCard.discount,
          randCard.price,
          randCard.count,
          randCard.url,
          randCard.id
        );
      }
    }
    const allItems = JSON.parse(localStorage.getItem('items'));
    let locate = document.location.href;
    const splitElem = locate.split('/');
    const lastElem = splitElem[splitElem.length - 1];

    if (lastElem === 'books.html') {
      const randCardId = allItems.filter((elem) => {
        return elem.category === 'books';
      });
      for (let i = 0; i < randCardId.length; i++) {
        let randCard = randCardId[i];
        addItem(
          randCard.category,
          randCard.title,
          randCard.discount,
          randCard.price,
          randCard.count,
          randCard.url,
          randCard.id
        );
      }
    } else if (lastElem === 'shoes.html') {
      const randCardId = allItems.filter((elem) => {
        return elem.category === 'Shoes';
      });
      for (let i = 0; i < randCardId.length; i++) {
        let randCard = randCardId[i];
        addItem(
          randCard.category,
          randCard.title,
          randCard.discount,
          randCard.price,
          randCard.count,
          randCard.url,
          randCard.id
        );
      }
    } else if (lastElem === 'sport.html') {
      const randCardId = allItems.filter((elem) => {
        return elem.category === 'sport';
      });
      for (let i = 0; i < randCardId.length; i++) {
        let randCard = randCardId[i];
        addItem(
          randCard.category,
          randCard.title,
          randCard.discount,
          randCard.price,
          randCard.count,
          randCard.url,
          randCard.id
        );
      }
    } else if (lastElem === 'toys.html') {
      const randCardId = allItems.filter((elem) => {
        return elem.category === 'toys';
      });
      for (let i = 0; i < randCardId.length; i++) {
        let randCard = randCardId[i];
        addItem(
          randCard.category,
          randCard.title,
          randCard.discount,
          randCard.price,
          randCard.count,
          randCard.url,
          randCard.id
        );
      }
    } else if (lastElem === 'accessories.html') {
      const randCardId = allItems.filter((elem) => {
        return elem.category === 'accessories';
      });
      for (let i = 0; i < randCardId.length; i++) {
        let randCard = randCardId[i];
        addItem(
          randCard.category,
          randCard.title,
          randCard.discount,
          randCard.price,
          randCard.count,
          randCard.url,
          randCard.id
        );
      }
    } else {
      randomItems();
    }
  };

  //search
  const searchMagnifier = document.querySelector('.fa-magnifying-glass');
  const searchInput = document.querySelector('.header__search');
  const popularRow = document.querySelector('.popular__row');
  const popularTitle = document.querySelector('.popular__title');
  const board = document.querySelector('.board');

  searchMagnifier.addEventListener('click', () => {
    if (searchInput.value) {
      const itemsArr = JSON.parse(localStorage.getItem('items'));
      popularRow.innerHTML = '';
      for (let i = 0; i < itemsArr.length; i++) {
        if (
          itemsArr[i].title
            .toLowerCase()
            .includes(searchInput.value.toLowerCase())
        ) {
          addItem(
            itemsArr[i].category,
            itemsArr[i].title,
            itemsArr[i].discount,
            itemsArr[i].price,
            itemsArr[i].count,
            itemsArr[i].url,
            itemsArr[i].id
          );
          row.style.gridTemplateColumns = '';
        }
      }
      row.classList.add('grid');
      if (popularRow.innerHTML) {
        popularTitle.innerHTML = 'Результат поиска:';
        row.style.gridTemplateColumns = '';
      } else {
        popularTitle.innerHTML = 'Ничего не найдено';
      }
    }
  });
    // enter
  searchInput.addEventListener('keydown', (event) => {
    if (searchInput.value) {
      if(event.keyCode === 13) {
        const itemsArr = JSON.parse(localStorage.getItem('items'));
        popularRow.innerHTML = '';
        for (let i = 0; i < itemsArr.length; i++) {
          if (itemsArr[i].title.toLowerCase().includes(searchInput.value.toLowerCase())) {
            addItem(itemsArr[i].category, itemsArr[i].title, itemsArr[i].discount, itemsArr[i].price, itemsArr[i].count, itemsArr[i].url, itemsArr[i].id);
          }
        }
        row.classList.add('grid');
        if (popularRow.innerHTML) {
          popularTitle.innerHTML = 'Результат поиска:';
          row.style.gridTemplateColumns = '';
        } else {
          popularTitle.innerHTML = 'Ничего не найдено';
        }
      }
    }
  });

  return getCard();
};

addStorageItems();


//search style
const header = document.querySelector('.header');
const headerLogo = document.querySelector('.header__logo');
const headerLogoSmall = document.querySelector('.header__logo-small');
const searchBox = document.querySelector('.header__search-box');
const searchClose = document.querySelector('.header__search-close');
const searchMagnifyingGlass = document.querySelector('.fa-magnifying-glass');

  searchMagnifyingGlass.addEventListener('click', () => {
  searchBox.classList.add('header__search-box-visible');
  searchClose.classList.add('visible');
  headerLogo.classList.add('hidden');
  headerLogoSmall.classList.add('hidden');
  header.classList.add('header-search-visible');
});
  searchClose.addEventListener('click', () => {
  searchBox.classList.remove('header__search-box-visible');
  searchClose.classList.remove('visible');
  headerLogo.classList.remove('hidden');
  headerLogoSmall.classList.remove('hidden');
  header.classList.remove('header-search-visible');
});
