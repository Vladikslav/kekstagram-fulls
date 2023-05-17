const ALERT_SHOW_TIME = 3000;
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const checkStringLength = (string, length) => string.length <= length;
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];
const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';
const showAlert = () => {
  const modalSectionError = document.createElement('section');
  const modalInnerError = document.createElement('div');
  const modalTitleError = document.createElement('h2');
  modalSectionError.classList.add('error');
  modalInnerError.classList.add('error__inner');
  modalTitleError.classList.add('error__title');
  modalTitleError.textContent = 'Ошибка загрузки изображений';
  modalInnerError.appendChild(modalTitleError);
  modalSectionError.appendChild(modalInnerError);
  document.querySelector('body').appendChild(modalSectionError);

  setTimeout(() => {
    modalSectionError.remove();
  }, ALERT_SHOW_TIME);
};
function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
export { getRandomPositiveInteger, checkStringLength, getRandomArrayElement, isEscapeKey, isEnterKey, showAlert, debounce };
