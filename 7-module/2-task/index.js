import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.createModal();
  }

  createModal() {

    this.elem = createElement(`<div class="modal"> <div class="modal__overlay"></div>
      <div class="modal__inner"> <div class="modal__header">
      <button type="button" class="modal__close">
      <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
      </button>
      <h3 class="modal__title"> Вот сюда нужно добавлять заголовок </h3>
      </div> <div class="modal__body"> A сюда нужно добавлять содержимое тела модального окна </div>
      </div>  </div>`);
    return this.elem;
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
    this.addEventListener ();
  }

  setTitle(title) {
    const modalTitle = this.elem.querySelector('.modal__title');
    modalTitle.textContent = title;
  }

  setBody(node) {
    const modalBody = this.elem.querySelector('.modal__body');
    modalBody.innerHTML = '';
    modalBody.append(node);
  }

  close() {
    this.elem.remove();
    document.body.classList.remove('is-modal-open');

}
  addEventListener (){
    const modalClose = this.elem.querySelector('.modal__close');
    modalClose.addEventListener('click', this.close.bind(this));

   document.addEventListener('keydown', (event)=> {
     if(event.code !== 'Escape') return;
     alert('Отменить!');
     this.close.bind(this);})//не работает((
}


}
