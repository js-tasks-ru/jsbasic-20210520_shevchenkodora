function sumSalary(salaries) {
  let summa = 0;
  for (let key in salaries) {
    let value = salaries[key];
    if ((typeof value) === 'number' && isFinite(value)) {
      summa += value;
    }
  }
  return summa;
}
