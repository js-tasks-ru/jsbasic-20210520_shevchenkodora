function camelize(str) {
  const arr = str.split('-');

  return arr[0] + arr.slice(1).map(function (item) {
    item = item.split('');
    return item[0].toUpperCase() + item.slice(1).join('');
  }).join('');
}
