export function setLocal(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

export function getLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function removeLocal(key) {
  localStorage.removeItem(key);
}
