import { showAlert } from './util.js';
import { closeUploadModal } from './modal-image.js';
import { sumbitFormImage } from './form.js';
import { renderSimilarPhotos } from './create-photos.js';
import { removeClassFiltersImg, onClickSetClassFilter, setButtonRandom, setButtonDefault, setButtonPopular } from './image-filter.js';
import { getData } from './api.js';
import { debounce } from './util.js';
const RERENDER_DELAY = 500;
const byField = (field) => (commetnsA, commentsB) => commetnsA[field] < commentsB[field] ? 1 : -1;

getData((photo) => {
  renderSimilarPhotos(photo);
  removeClassFiltersImg();
  onClickSetClassFilter();
  setButtonRandom(debounce(() => renderSimilarPhotos(photo.slice().sort(() => Math.random() - 0.5).slice(0, 10), RERENDER_DELAY)));
  setButtonDefault(debounce(() => renderSimilarPhotos(photo), RERENDER_DELAY));
  setButtonPopular(debounce(() => renderSimilarPhotos(photo.slice().sort(byField('comments'), RERENDER_DELAY))));
},
() => {
  showAlert();
}

);

sumbitFormImage(closeUploadModal);
