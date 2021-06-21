import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
   this.createCarousel();
  }

  createCarousel() {

    if (!this.elem) {
      this.elem = document.createElement("div");
      this.elem.className = "carousel";
      this.elem.addEventListener('click', this.onClick.bind(this));
    }

    const carouselArrowRight = document.createElement("div");
    carouselArrowRight.className = "carousel__arrow carousel__arrow_right";
    const imgRight = document.createElement("img");
    imgRight.src = "/assets/images/icons/angle-icon.svg";
    imgRight.alt = "icon";
    carouselArrowRight.appendChild(imgRight);

    const carouselArrowLeft = document.createElement("div");
    carouselArrowLeft.className = "carousel__arrow carousel__arrow_left";
    const imgLeft = document.createElement("img");
    imgLeft.src = "/assets/images/icons/angle-left-icon.svg";
    imgLeft.alt = "icon";
    carouselArrowLeft.appendChild(imgLeft);

    this.elem.appendChild(carouselArrowRight);
    this.elem.appendChild(carouselArrowLeft);

    const carouselInner = document.createElement("div");
    carouselInner.className = "carousel__inner";

    for (let key of this.slides) {

      const carouselSlide = document.createElement("div");
      carouselSlide.className = "carousel__slide";
      carouselSlide.dataset.id =key.id;

      const carouselImg = document.createElement("img");
      carouselImg.src = "/assets/images/carousel/" + key.image;
      carouselImg.className = "carousel__img";
      carouselImg.alt = "slide";

      const carouselCaption = document.createElement("div");
      carouselCaption.className = "carousel__caption";


      const carouselPrice = document.createElement("span");
      carouselPrice.className = "carousel__price";
      carouselPrice.innerHTML = "€" + key.price.toFixed(2);


      const carouselTitle = document.createElement("div");
      carouselTitle.className = "carousel__title";
      carouselTitle.innerHTML = key.name;

      const carouselButton = document.createElement("button");
      carouselButton.type = 'button';
      carouselButton.className = "carousel__button";

      const img = document.createElement("img");
      img.src = "/assets/images/icons/plus-icon.svg";
      img.alt = "icon";

      carouselButton.appendChild(img);
      carouselCaption.appendChild(carouselPrice);
      carouselCaption.appendChild(carouselTitle);
      carouselCaption.appendChild(carouselButton);

      carouselSlide.appendChild(carouselCaption);
      carouselSlide.appendChild(carouselImg);
      carouselInner.appendChild(carouselSlide);
      this.elem.appendChild(carouselInner);
      return this.elem;

    }

  }
  onClick(event) {
    //if (event.target.parentElement.className !== 'card__button')  - почему не проходят тесты с этой строкой?
    if (!event.target.closest('button.carousel__button')) {
      return;
    }
let slide = event.target.closest('.carousel__slide').dataset;
    const  productAddEvent = new CustomEvent('product-add', {detail: slide.id, bubbles: true,});

    this.elem.dispatchEvent(productAddEvent);

  }

  initCarousel() {

    const carouselInner = document.querySelector('.carousel__inner');
    const carouselImg = document.querySelectorAll('.carousel__img');

    // находим общую ширину слайдера и длинну

    let imgTotalWidth = 0;

    Array.from(carouselImg);
    let imgFirstOffset = carouselImg[0].offsetWidth;

    for (let item of carouselImg) {

      imgTotalWidth += item.offsetWidth;
    }

    const carouselArrowRight = document.querySelector('.carousel__arrow_right');
    const carouselArrowLeft = document.querySelector('.carousel__arrow_left');

    carouselArrowRight.addEventListener('click', clickRight);
    carouselArrowLeft.addEventListener('click', clickLeft);

    let offset = 0;

    function clickRight() {

      offset += imgFirstOffset;

      carouselInner.style.transform = `translateX(${-offset}px)`;

      checkBtns();
    }

    function clickLeft() {

      offset -= imgFirstOffset;

      carouselInner.style.transform = `translateX(${-offset}px)`;

      checkBtns();
    }

    function checkBtns() {

      if (offset >= (imgTotalWidth - imgFirstOffset)) {
        carouselArrowRight.style.display = 'none';
      } else {
        carouselArrowRight.style.display = '';
      }

      if (offset === 0) {
        carouselArrowLeft.style.display = 'none';
      } else {
        carouselArrowLeft.style.display = '';
      }
    }

    checkBtns();
  }
}
