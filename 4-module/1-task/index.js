function makeFriendsList(friends) {
  const elem = document.body;
  elem.insertAdjacentHTML('afterbegin','<ul>');
  for(let item of friends){
    elem.firstChild.innerHTML += `<li> ${item.firstName} ${item.lastName} </li>`
  }
  return elem.querySelector('ul');
}

