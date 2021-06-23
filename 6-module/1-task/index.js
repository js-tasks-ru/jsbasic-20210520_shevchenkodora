/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.createTable();
  }
  createTable(){
    if (!this.elem) {
      this.elem = document.createElement("table");
      this.elem.addEventListener('click', this.onClick.bind(this));
    }

    const tblHead = document.createElement("thead");
    tblHead.insertAdjacentHTML('afterbegin', `<th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th>`);

    const tblBody = document.createElement("tbody");

    for (let key of this.rows) {

      const row = document.createElement("tr");
      for (const value of Object.values(key)) {
        const cell = document.createElement("td");
        const cellText = document.createTextNode(`${value}`);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      row.insertAdjacentHTML('beforeend', '<td><button>X</button></td>');

      tblBody.appendChild(row);
    }
    this.elem .appendChild(tblHead);
    this.elem .appendChild(tblBody);

   return this.elem;}
   onClick(event){

      if (event.target.tagName !== 'BUTTON') return;

        let rowRemove = event.target.closest('tr');
        rowRemove.parentNode.removeChild(rowRemove);

    }
}
