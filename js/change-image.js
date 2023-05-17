const SCALE = {
  MAX: 100,
  MIN: 25,
  STEP: 25
};
const uploadImageScale = document.querySelector('.scale');
const uploadModalScale = uploadImageScale.querySelector('.scale__control--value');
const uploadModalImg = document.querySelector('.img-upload__preview > img');
const modalImageDefaultSrc = uploadModalImg.src;

/*Возвращение по умолчанию*/
const onResetChangeImage = () => {
  uploadModalScale.setAttribute('value', '100%');
  uploadModalImg.style.transform = 'scale(1)';
  uploadModalImg.removeAttribute('class');
  uploadImageScale.removeEventListener('click', changeModalControlValue);
  uploadModalImg.src = modalImageDefaultSrc;
};
/*Добавление клика*/
const onClickModalControlValue = () => {
  uploadImageScale.addEventListener('click', changeModalControlValue);
};
/*Изменение размера картинки*/
const сhangeSizeImage = ({ target }, scaleValue) => {
  if (target.closest('.scale__control--bigger')) {
    scaleValue = Math.min(scaleValue + SCALE.STEP, SCALE.MAX);
    if (scaleValue === SCALE.MAX) {
      uploadModalImg.style.transform = 'scale(1)';
    }
    else {
      uploadModalImg.style.transform = `scale(0.${scaleValue})`;
    }
  }
  else if (target.closest('.scale__control--smaller')) {
    scaleValue = Math.max(scaleValue - SCALE.STEP, SCALE.MIN);
    uploadModalImg.style.transform = `scale(0.${scaleValue})`;
  }
  return scaleValue;
};
/*Получение значение размера картинки в модальном окне*/
const getModalControlValue = (scaleValue) => (scaleValue.includes('%')) ? scaleValue.slice(0, -1) : scaleValue;
/*Изменение значения размера картинки в модальном окне*/

function changeModalControlValue(evt) {
  uploadModalScale.setAttribute('value', `${сhangeSizeImage(evt, Number(getModalControlValue(uploadModalScale.value)))}%`);
}

export { onClickModalControlValue, onResetChangeImage, uploadModalImg };
