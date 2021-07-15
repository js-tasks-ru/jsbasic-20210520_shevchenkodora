import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js'; // посмотреть почему 3 отображается как 0
import ProductGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {

    this.createCarousel();
    this.createRibbon();
    this.createStepSlider();
    this.createCartIcon();
    this.cart = new Cart(this.cartIcon);

    let response = await fetch('products.json');
  this.products = await response.json();
   // this.products = await this.fetchProducts();

    this.createProductGrid();


    this.productGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbon.category
    });

    document.body.addEventListener('product-add', ({ detail: productId }) => {
      let product = this.products.find(item => item.id == productId);
      this.cart.addProduct(product);
    });



    document.body.addEventListener('slider-change', ({ detail: value }) => {
      this.productGrid.updateFilter({maxSpiciness: value});
    });

    document.body.addEventListener('ribbon-select', ({ detail: categoryId }) => {
      this.productGrid.updateFilter({
        category: categoryId
      })});

    document.getElementById('nuts-checkbox').addEventListener('change', (event) => {
      this.productGrid.updateFilter({
        noNuts: event.target.checked, // новое значение чекбокса
      });
    });


    document.getElementById('vegeterian-checkbox').
    addEventListener('change', (event) => {
      this.productGrid.updateFilter({
        vegeterianOnly: event.target.checked, // новое значение чекбокса
      });
    });

  }

  createCarousel() {
    this.carousel = new Carousel(slides);
    let dataCarouselHolder = document.body.querySelector('[data-carousel-holder]');
    dataCarouselHolder.append(this.carousel.elem);

  }

  createRibbon() {
    this.ribbon = new RibbonMenu(categories);
    let dataRibbonHolder = document.querySelector('[data-ribbon-holder]');
    dataRibbonHolder.append(this.ribbon.elem);
  }

  createStepSlider() {
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    let dataSliderHolder = document.querySelector('[data-slider-holder]');
    dataSliderHolder.append(this.stepSlider.elem);
  }

  createCartIcon() {
    this.cartIcon = new CartIcon();
    let dataCartIconHolder = document.querySelector('[data-cart-icon-holder]');
    dataCartIconHolder.append(this.cartIcon.elem);
  }

  createProductGrid(){
    this.productGrid = new ProductGrid(this.products);
    let dataProductsGridHolder = document.querySelector('[data-products-grid-holder]');
    dataProductsGridHolder.innerHTML = '';
    dataProductsGridHolder.append(this.productGrid.elem);
  }

 /* async fetchProducts() {
    let response = await fetch('products.json');
    let products = await response.json();

    return products;}*/

}
