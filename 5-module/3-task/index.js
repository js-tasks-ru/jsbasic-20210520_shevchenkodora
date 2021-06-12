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
    carouselArrowLeft.style.display = 'none';
  }

  function clickRight() {

    if (carouselArrowLeft.style.display === 'none') {
      carouselArrowLeft.style.display = '';
    }
    offset += imgFirstOffset;
    if (offset >= (imgTotalWidth - imgFirstOffset)) {//offset = 0;
      carouselArrowRight.style.display = 'none';
    }

    //carouselInner.style.left = -offset + 'px'; - second variant

    carouselInner.style.transform = `translateX(${-offset}px)`;
  }

  function clickLeft() {

    if (offset === imgFirstOffset) {
      carouselArrowLeft.style.display = 'none';
    }
    if (carouselArrowRight.style.display === 'none') {
      carouselArrowRight.style.display = '';
    }
    offset -= imgFirstOffset;
    // carouselInner.style.left = -offset + 'px';
    carouselInner.style.transform = `translateX(${-offset}px)`;
  }
}

