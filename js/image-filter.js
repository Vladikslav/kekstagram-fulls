const buttonsImgFilter = document.querySelector('.img-filters');
const buttonFilterRandom = buttonsImgFilter.querySelector('#filter-random');
const buttonFilterDefault = buttonsImgFilter.querySelector('#filter-default');
const buttonFilterPopular = buttonsImgFilter.querySelector('#filter-discussed');
const removeClassFiltersImg = () => buttonsImgFilter.classList.remove('img-filters--inactive');
const onClickSetClassFilter = () => {
  buttonsImgFilter.addEventListener('click', ({ target }) => {
    if (target.closest('.img-filters__button')) {
      const imgFilterButtonActive = buttonsImgFilter.querySelector('.img-filters__button--active');
      imgFilterButtonActive.classList.remove('img-filters__button--active');
      target.classList.add('img-filters__button--active');
    }
  });
};
const removeListPicture = () => {
  document.querySelectorAll('.picture').forEach((element) => {
    element.remove();
  });
};
const setButtonRandom = (cb) => {
  buttonFilterRandom.addEventListener('click', () => {
    removeListPicture();
    cb();
  });
};
const setButtonDefault = (cb) => {
  buttonFilterDefault.addEventListener('click', () => {
    removeListPicture();
    cb();
  });
};
const setButtonPopular = (cb) => {
  buttonFilterPopular.addEventListener('click', () => {
    removeListPicture();
    cb();
  });
};
export { removeClassFiltersImg, onClickSetClassFilter, setButtonRandom, setButtonDefault, setButtonPopular };
