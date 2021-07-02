import createElement from '../../assets/lib/create-element.js';


export default class StepSlider {
  constructor({steps, value = 0}) {
    this.steps = steps;
    this.value = value;
    this.seg = steps - 1;
    this.createSlider();
    this.addListener();
  }

  createSlider() {
    this.elem = createElement(`<div class="slider">
    <div class="slider__thumb" style="left: 0%;">
      <span class="slider__value">${this.value}</span>
    </div>  <div class="slider__progress" style="width: 0%;"></div> <div class="slider__steps">
    ${'<span></span>'.repeat(this.steps)}
        </div>
      </div>`);
    this.sub('steps').children[this.value].classList.add('slider__step-active');
  }

  addListener() {

    this.sub('thumb').ondragstart = () => false;

    this.sub('thumb').addEventListener('pointerdown', this.onPointerDown);

    this.elem.addEventListener('click', event => {

      this.changeValue(event);

      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      }));
    });
  }

  onPointerDown = event => {

    this.elem.classList.add('slider_dragging');

    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);

  };

  onPointerMove = event => {

    let left = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;

    if (left < 0) {
      left = 0;
    }
    if (left > 1) {
      left = 1;
    }

    this.sub('thumb').style.left = `${left * 100}%`;
    this.sub('progress').style.width = `${left * 100}%`;

    this.value = Math.round(left * this.seg);
    this.sub('value').innerHTML = this.value;

    if (this.sub('step-active')) {
      this.sub('step-active').classList.remove('slider__step-active');
    }
    this.sub('steps').children[this.value].classList.add('slider__step-active');
  };


  onPointerUp = event => {

    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);

    this.elem.classList.remove('slider_dragging');

    this.sub('thumb').style.left = `${(this.value / this.seg) * 100}%`;
    this.sub('progress').style.width = `${(this.value / this.seg) * 100}%`;

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );

  };


  changeValue(event) {

    let moveLeft = (event.clientX - event.target.getBoundingClientRect().left) / this.elem.offsetWidth;

    this.value = Math.round(moveLeft * this.seg);
    this.sub('value').innerHTML = this.value;

    if (this.sub('step-active')) {
      this.sub('step-active').classList.remove('slider__step-active');
    }
    this.sub('steps').children[this.value].classList.add('slider__step-active');


    let leftPercents = this.value / this.seg * 100;
    this.sub('thumb').style.left = `${leftPercents}%`;
    this.sub('progress').style.width = `${leftPercents}%`;

  }

  sub(selector) {
    return this.elem.querySelector(`.slider__${selector}`);
  }

}
