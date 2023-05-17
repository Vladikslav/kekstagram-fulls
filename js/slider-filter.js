import { uploadModalImg } from './change-image.js';
const PART_COUNT_THREE = -3;
const PART_COUNT_FIVE = -5;
const sliderEffect = document.querySelector('.effect-level');
const sliderEffectElement = sliderEffect.querySelector('.effect-level__slider');
const sliderInputHidden = sliderEffect.querySelector('.effect-level__value');

sliderEffect.style.display = 'none';

/* Удаление слайдера в модальном окне*/
const deleteSliderEffect = () => {
  if (sliderEffectElement.classList.contains('noUi-target')) {
    sliderEffectElement.noUiSlider.destroy();
    uploadModalImg.style.filter = 'none';
    document.querySelector('#effect-none').checked = true;
    sliderEffect.style.display = 'none';
  }
};
/* Создание слайдера в модальном окне*/
const createSliderEffect = () => {
  noUiSlider.create(sliderEffectElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });
};
/* Изменение слайдера в модальном окне*/
const changeSliderEffect = (target) => {
  sliderEffect.style.display = 'block';
  const filterStyle = window.getComputedStyle(target, null).getPropertyValue('filter');
  switch (target.classList[1]) {
    case 'effects__preview--chrome':
      sliderEffectElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      sliderEffectElement.noUiSlider.on('update', () => {
        uploadModalImg.style.filter = `${filterStyle.slice(0, PART_COUNT_THREE)}(${Number(sliderEffectElement.noUiSlider.get())})`;
        sliderInputHidden.setAttribute('value', Number(sliderEffectElement.noUiSlider.get()));
      });
      break;
    case 'effects__preview--sepia':
      sliderEffectElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });

      sliderEffectElement.noUiSlider.on('update', () => {
        uploadModalImg.style.filter = `${filterStyle.slice(0, PART_COUNT_THREE)}(${Number(sliderEffectElement.noUiSlider.get())})`;
        sliderInputHidden.setAttribute('value', Number(sliderEffectElement.noUiSlider.get()));
      });
      break;
    case 'effects__preview--marvin':
      sliderEffectElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });

      sliderEffectElement.noUiSlider.on('update', () => {
        uploadModalImg.style.filter = `${filterStyle.slice(0, PART_COUNT_THREE)}(${Number(sliderEffectElement.noUiSlider.get())}%)`;
        sliderInputHidden.setAttribute('value', Number(sliderEffectElement.noUiSlider.get()));
      });
      break;
    case 'effects__preview--phobos':
      sliderEffectElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });

      sliderEffectElement.noUiSlider.on('update', () => {
        uploadModalImg.style.filter = `${filterStyle.slice(0, PART_COUNT_FIVE)}(${Number(sliderEffectElement.noUiSlider.get()).toFixed(1)}px)`;
        sliderInputHidden.setAttribute('value', Number(sliderEffectElement.noUiSlider.get()).toFixed(1));
      });
      break;
    case 'effects__preview--heat':
      sliderEffectElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
        connect: 'lower'
      });
      sliderEffectElement.noUiSlider.on('update', () => {
        uploadModalImg.style.filter = `${filterStyle.slice(0, PART_COUNT_THREE)}(${Number(sliderEffectElement.noUiSlider.get()).toFixed(1)})`;
        sliderInputHidden.setAttribute('value', Number(sliderEffectElement.noUiSlider.get()).toFixed(1));
      });
      break;
    default:
      deleteSliderEffect();
      break;
  }
};
/*Добавление события клик на изображения*/
const onCLickImageUpload = ({ target }) => {
  if (target.closest('.effects__label')) {
    uploadModalImg.className = target.classList[1];
    if (!sliderEffectElement.classList.contains('noUi-target')) {
      createSliderEffect();
    }
    changeSliderEffect(target);
  }
};

export { deleteSliderEffect, onCLickImageUpload };
