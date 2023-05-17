import { isEscapeKey } from './util.js';
import { uploadModalComment, uploadModalHashTag } from './form.js';
import { onClickModalControlValue, onResetChangeImage } from './change-image.js';
import { onCLickImageUpload, deleteSliderEffect } from './slider-filter.js';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const uploadModal = document.querySelector('#upload-select-image');
const uploadModalOpen = uploadModal.querySelector('#upload-file');
const uploadModalCancel = uploadModal.querySelector('.cancel');
const uploadModalOverlay = uploadModal.querySelector('.img-upload__overlay');
const imageUploadEffect = uploadModal.querySelector('.img-upload__effects');
const imageUploadPreview = uploadModal.querySelector('.img-upload__preview > img');
const body = document.querySelector('body');
const onUploadModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === uploadModalComment || document.activeElement === uploadModalHashTag) {
      evt.stopPropagation();
    }
    else {
      closeUploadModal();
    }
  }
};
function closeUploadModal() {
  uploadModalOverlay.classList.add('hidden');
  uploadModalCancel.removeEventListener('click', closeUploadModal);
  document.removeEventListener('keydown', onUploadModalEscKeydown);
  body.classList.remove('modal-open');
  onResetChangeImage();
  deleteSliderEffect();
  uploadModalComment.value = '';
  uploadModalHashTag.value = '';
  imageUploadEffect.removeEventListener('click', onCLickImageUpload);
}
const openUploadModal = () => {
  const file = uploadModalOpen.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imageUploadPreview.src = URL.createObjectURL(file);
  }
  uploadModalOverlay.classList.remove('hidden');
  uploadModalCancel.addEventListener('click', closeUploadModal);
  document.addEventListener('keydown', onUploadModalEscKeydown);
  body.classList.add('modal-open');
  onClickModalControlValue();
  imageUploadEffect.addEventListener('click', onCLickImageUpload);
};
uploadModalOpen.addEventListener('change', () => { openUploadModal(); });

export { openUploadModal, closeUploadModal };
