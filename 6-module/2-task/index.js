import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.createCart();
  }

  createCart() {

    if (!this.elem) {
      this.elem = document.createElement("div");
      this.elem.className = "card";
      this.elem.addEventListener('click', this.onClick.bind(this));
    }

    const cardTop = document.createElement("div");
    cardTop.className = "card__top";


    const img = document.createElement("img");
    img.className = "card__image";
    img.src = "/assets/images/products/" + this.product.image;
    img.alt = "icon";


    const cardPrice = document.createElement("span");
    cardPrice.className = "card__price";
    cardPrice.innerHTML = "€" + this.product.price.toFixed(2);

    cardTop.appendChild(img);
    cardTop.appendChild(cardPrice);


    this.elem.appendChild(cardTop);

    const cardBody = document.createElement("div");
    cardBody.className = "card__body";

    const cardTitle = document.createElement("div");
    cardTitle.className = "card__title";
    cardTitle.innerHTML = this.product.name;

    const button = document.createElement("button");
    button.className = "card__button";
    const imgButton = document.createElement("img");
   imgButton.src = "/assets/images/icons/plus-icon.svg";
   imgButton.alt = "icon";
    cardBody.appendChild(cardTitle);
    button.appendChild(imgButton);
    cardBody.appendChild(button);


    this.elem.appendChild(cardBody);
    return this.elem;
  }

  onClick(event) {
    //if (event.target.parentElement.className !== 'card__button')  - почему не проходят тесты с этой строкой?
    if (!event.target.closest('button')) {
      return;
    }

    const  productAddEvent = new CustomEvent('product-add', {detail: this.product.id, bubbles: true,});

    this.elem.dispatchEvent(productAddEvent);

  }


}
