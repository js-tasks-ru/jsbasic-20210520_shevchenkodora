import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({steps, value = 0}) {
    this.steps = steps;
    this.value = value;
    this.seg = steps - 1;
    this.createSlider();
    this.onClick();
  }

  createSlider() {
    this.elem = createElement(`<div class="slider">
    <div class="slider__thumb" style="left: 50%;">
      <span class="slider__value">${this.value}</span>
    </div>  <div class="slider__progress" style="width: 50%;"></div> <div class="slider__steps">
    </div>
  </div>`);

    let spanInner = [];
    for (let i = 0; i < this.steps; i++) {
      spanInner.push(createElement(`<span></span>`));
      if (i === this.value) {
        spanInner[i].classList.add('slider__step-active');
      }
    }
    spanInner = spanInner.map(item => item.outerHTML);
    spanInner = spanInner.join('');

    this.elem.querySelector('.slider__steps').insertAdjacentHTML('afterbegin', spanInner);

    return this.elem;
  }

  onClick() {
    this.elem.addEventListener('click', this.changeValue.bind(this));
  }

  changeValue(event) {

    let sliderValue = this.elem.querySelector('.slider__value');

    let sliderCoordinates = event.target.getBoundingClientRect();
    let newValue = Math.round((event.clientX - sliderCoordinates.left) / (this.elem.offsetWidth / this.seg));
    sliderValue.innerHTML = newValue;

    this.moveSlider(newValue);

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: newValue,
      bubbles: true
    }));

  }

  moveSlider(newValue) {

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let sliderStepActive = this.elem.querySelector('.slider__step-active');
    let sliderSteps = this.elem.querySelector('.slider__steps');

    if (sliderStepActive) {
      sliderStepActive.classList.remove('slider__step-active');
    }
    sliderSteps.children[newValue].classList.add('slider__step-active');

    let leftPercents = 100 / this.seg * newValue;
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
  }

}
