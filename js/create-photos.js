import { getBigPicture } from './big-photo.js';
const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();


const createPicture = (data) => {
  const { url, likes, comments } = data;
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.addEventListener('click', () => { getBigPicture(data); });
  return pictureElement;
};
const renderSimilarPhotos = (similarPhotos) => {
  similarPhotos.forEach((element) => {
    picturesFragment.append(createPicture(element));
  });

  pictureContainer.append(picturesFragment);
};
export { renderSimilarPhotos };
