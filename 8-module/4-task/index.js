import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    let cartItem = this.cartItems.find(
      item => item.product.id == product.id
    );
    if (!cartItem) {
      cartItem = {
        product,
        count: 1
      };
      this.cartItems.push(cartItem);
    } else {
      cartItem.count++;
    }
    this.onProductUpdate(cartItem);

  }

  updateProductCount(productId, amount) {

    let cartItem;
    this.cartItems.forEach(item => {
      if (item.product.id == productId) {
        cartItem = item;
      }
    });
    cartItem.count += amount;
    if (cartItem.count === 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    if (this.cartItems.length === 0) {
      return true;
    }
    return false;
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems.forEach(item => {
      totalCount += item.count;
    });
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach(item => {
      totalPrice += item.count * item.product.price;
    });
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');

    this.modalBody = createElement(`<div></div>`);

    for (let item of this.cartItems) {
      this.modalBody.insertAdjacentElement('beforeend', this.renderProduct(item.product, item.count));
    }

    this.modalBody.insertAdjacentElement('beforeend', this.renderOrderForm());

    this.modal.setBody(this.modalBody);
    this.modal.open();

    document.querySelector('.modal__inner').addEventListener('click', (event) => {
      let amount = 0;
      if (event.target.closest('.cart-counter__button')) {
        let productId = event.target.closest('[data-product-id]').dataset.productId;
        if (event.target.closest(".cart-counter__button_plus")) {
          amount = 1;
        } else {
          amount = -1;
        }

        this.updateProductCount(productId, amount);
      }
    });

    document.querySelector('.cart-form').addEventListener('submit', (event) => this.onSubmit(event));
  }

  onProductUpdate(cartItem) {

    this.cartIcon.update(this);// проверяет корзину и делает ее видимой или нет

    if (document.body.className !== 'is-modal-open') {
      return;
    }

    if (this.cartItems.length === 0) {
      this.modal.close();
      return;
    }

    if (cartItem.count === 0) {
      this.modalBody.querySelector(`[data-product-id="${cartItem.product.id}"]`).remove();
      this.modalBody.querySelector(`.cart-buttons__info-price`).innerHTML = '€' + this.getTotalPrice().toFixed(2);
    } else {
      let productCount = this.modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`);
      let productPrice = this.modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`);
      let infoPrice = this.modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = '€' + (cartItem.product.price * cartItem.count).toFixed(2);
      infoPrice.innerHTML = '€' + this.getTotalPrice().toFixed(2);
    }
  }

  async onSubmit(event) {
    event.preventDefault();
    const submit = this.modalBody.querySelector('button[type="submit"]');

    submit.classList.add("is-loading");

    let formElem = this.modalBody.querySelector('.cart-form');

    let response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(formElem)
    });

    if (response.ok) {

      this.modal.setTitle('Success!');
      submit.classList.remove("is-loading");
      this.cartItems = [];
      this.cartIcon.update(this);
      this.modalBody.innerHTML = `<div class="modal__body-inner"> <p>
      Order successful! Your order is being cooked :) <br>
      We’ll notify you about delivery time shortly.<br>
      <img src="/assets/images/delivery.gif">
      </p>
      </div>`;

    }
  }
  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }

}

