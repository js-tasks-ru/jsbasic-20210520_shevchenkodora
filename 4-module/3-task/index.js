function highlight(table) {
  const thead = table.querySelector('thead');
  const threadTd = thead.querySelectorAll('td');

  let ageCollum = 0;//ageIdentificatorCollums
  let genderCollum = 0;//genderIdentificatorCollums
  let statusCollum = 0;//statusIdentificatorCollums

  for (let cell of threadTd) {
    if (cell.innerHTML === 'Age') {
      ageCollum = cell.cellIndex;
    }
    if (cell.innerHTML === 'Gender') {
      genderCollum = cell.cellIndex;
    }
    if (cell.innerHTML === 'Status') {
      statusCollum = cell.cellIndex;
    }
  }
  // miss row thead
  const rowWithoutThead = Array.from(table.rows).slice(1);

  for (let row of rowWithoutThead) {

    const statusChange = row.cells[statusCollum];
    const genderChange = row.cells[genderCollum];
    const ageChange = row.cells[ageCollum];

    // statusChanges
    if (statusChange.hasAttribute('data-available') &&
      statusChange.getAttribute('data-available') === 'true') {
      row.classList.add('available');
    } else if (statusChange.hasAttribute('data-available')) {
      row.classList.add('unavailable');
    } else {
      row.setAttribute('hidden', 'true');
    }

    // genderChanges
    if (genderChange.innerHTML === 'm') {
      row.classList.add('male');
    } else if (genderChange.innerHTML === 'f') {
      row.classList.add('female');
    }

    //ageChanges
    if (ageChange.innerHTML < 18) {
      row.setAttribute('style', 'text-decoration: line-through');
    }
  }
}


