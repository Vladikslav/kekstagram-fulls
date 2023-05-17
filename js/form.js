import { sendData } from './api.js';
import { isEscapeKey } from './util.js';
const MAX_HASHTAG_COUNT = 5;
const UNVALID_SYMBOLS = /^#[a-zA-Z0-9а-яА-ЯёЁ]{1,19}$/i;
const uploadModal = document.querySelector('#upload-select-image');
const uploadModalComment = uploadModal.querySelector('.text__description');
const uploadModalHashTag = uploadModal.querySelector('.text__hashtags');
const uploadModalSubmit = uploadModal.querySelector('.img-upload__submit');
const uploadModalSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const modalSuccess = uploadModalSuccessTemplate.cloneNode(true);
const uploadModalErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const modalError = uploadModalErrorTemplate.cloneNode(true);

const pristine = new Pristine(uploadModal, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
});
const blockSubmitButton = () => {
  uploadModalSubmit.disabled = true;
  uploadModalSubmit.textContent = 'Отправляется...';
};

const unblockSubmitButton = () => {
  uploadModalSubmit.disabled = false;
  uploadModalSubmit.textContent = 'Отправить';
};
const removeModal = (evt) => {
  if (isEscapeKey(evt) || evt.target.closest('button') || evt.target.closest('button')) {
    document.querySelector('.formModal').remove();
    document.removeEventListener('keydown', removeModal);
    evt.target.removeEventListener('click', removeModal);
  }
};
const createModal = (modalWindow) => {
  document.querySelector('body').appendChild(modalWindow);
  modalWindow.classList.add('formModal');
  const modalButton = modalWindow.querySelector('button');
  modalButton.addEventListener('click', removeModal);
  document.addEventListener('keydown', removeModal);
};
const sumbitFormImage = (onSuccess) => {
  uploadModal.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(
        () => { onSuccess(); unblockSubmitButton(); createModal(modalSuccess); },
        () => { unblockSubmitButton(); createModal(modalError); },
        new FormData(evt.target)
      );
    }
  });
};
const validateComment = (value) => value.length <= 140;
const hasValidCount = (value) => value.length <= MAX_HASHTAG_COUNT;
const hasUniqueTags = (tags) => {
  const lowerCasetags = tags.map((tag) => tag.toLowerCase());
  return lowerCasetags.length === new Set(lowerCasetags).size;
};
const validateHasTag = (value) => {
  const tags = value.trim().split(' ').map((tag) => tag);
  return hasValidCount(tags) && tags.every((tag) => UNVALID_SYMBOLS.test(tag) && hasUniqueTags(tags));
};
pristine.addValidator(uploadModalComment, validateComment, 'Длина комментария не может составлять больше 140 символов');
pristine.addValidator(uploadModalHashTag, validateHasTag, 'Неправильно заполнены хэштеги');
export { uploadModalComment, uploadModalHashTag, sumbitFormImage, modalError };
