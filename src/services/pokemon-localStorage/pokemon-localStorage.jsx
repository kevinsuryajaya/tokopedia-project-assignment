export function allStorage() {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values.push(JSON.parse(window.localStorage.getItem(keys[i])));
  }
  return values;
}
