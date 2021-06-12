
function toggleText() {
  const elem = document.body.querySelector('.toggle-text-button');
  const text = document.body.querySelector('#text');
  elem.onclick = function() {
    (text.hidden) ? text.hidden = false : text.hidden = true;
  };
}
