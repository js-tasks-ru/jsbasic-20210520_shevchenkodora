function initCarousel() {

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

  if (offset === 0) {

  }

  function clickRight() {

    offset += imgFirstOffset;

    //carouselInner.style.left = -offset + 'px'; - second variant
    carouselInner.style.transform = `translateX(${-offset}px)`;

    checkBtns();
  }

  function clickLeft() {

    offset -= imgFirstOffset;

    // carouselInner.style.left = -offset + 'px'; - second variant
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


