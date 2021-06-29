import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.createRibbonMenu();
    this.scrollRibbonMenu();
    this.selectedCategory();
  }

  createRibbonMenu() {


    this.elem = createElement(`<div class="ribbon">  <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button> <nav class="ribbon__inner"></nav> <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button> `);

    let categories = this.categories.map((item) => createElement(`<a href="#" class="ribbon__item" data-id=${item.id} > ${item.name}</a>`));

    const ribbonInner = this.elem.querySelector(`.ribbon__inner`);

    ribbonInner.append(...categories);

    const all = this.elem.querySelector('[data-id]');
    all.classList.add("ribbon__item_active");

    return this.elem;
  }

  scrollRibbonMenu() {
    const ribbonInner = this.elem.querySelector(`.ribbon__inner`);
    const ribbonArrowRight = this.elem.querySelector(`.ribbon__arrow_right`);
    const ribbonArrowLeft = this.elem.querySelector(`.ribbon__arrow_left`);

    let scroll = 0;

    ribbonArrowRight.addEventListener('click', moveRight);

    ribbonArrowLeft.addEventListener('click', moveLeft);

    ribbonInner.addEventListener('scroll', checkBtns);

    function moveRight() {
      scroll += 350;
      ribbonInner.scrollBy(scroll, 0);

    }


    function moveLeft() {
      scroll = 0;
      scroll -= 350;
      ribbonInner.scrollBy(scroll, 0);
    }

    function checkBtns() {
      let scrollLeft = ribbonInner.scrollLeft;
      let scrollWidth = ribbonInner.scrollWidth;
      let ribbonInnerWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - ribbonInnerWidth;

      if (scrollRight === 0 || scrollRight < 1) {
        ribbonArrowRight.classList.remove('ribbon__arrow_visible');
      } else {
        ribbonArrowRight.classList.add('ribbon__arrow_visible');
      }

      if (scrollLeft === 0) {
        ribbonArrowLeft.classList.remove('ribbon__arrow_visible');
      } else {
        ribbonArrowLeft.classList.add('ribbon__arrow_visible');
      }
    }

  }

  selectedCategory() {
    const ribbonInner = this.elem.querySelector(`.ribbon__inner`);

    ribbonInner.addEventListener('click', select.bind(this));

    function select(event) {
      if (event.target.nodeName != 'A') return;

      event.preventDefault();


      let allA = ribbonInner.children;
      for (const a of allA) {
        if (a.className === 'ribbon__item ribbon__item_active') {
          a.classList.remove('ribbon__item_active');
        }
      }
      event.target.classList.add('ribbon__item_active');


      let category = event.target.closest('.ribbon__item').dataset;
      let selectedCategory = new CustomEvent('ribbon-select', {detail: category.id, bubbles: true});
      this.elem.dispatchEvent(selectedCategory);
    }
  }
}
