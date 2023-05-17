import { isEscapeKey } from './util.js';
const COUNT_COMMENT_VISUAL = 5;
const pictureBigPhoto = document.querySelector('.big-picture');
const pictureComments = pictureBigPhoto.querySelector('.social__comments');
const pictureCommentsLoader = pictureBigPhoto.querySelector('.comments-loader');
const pictureCommentsCount = pictureBigPhoto.querySelector('.social__comment-count');
const pictureBigCancel = pictureBigPhoto.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const onModalBigPictureClick = () => {
  closeModalBigPicture();
};
const onModalBigPicturEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalBigPicture();
  }
};
function closeModalBigPicture() {
  pictureBigPhoto.classList.add('hidden');
  pictureBigCancel.removeEventListener('click', onModalBigPictureClick);
  document.removeEventListener('keydown', onModalBigPicturEscKeydown);
  body.classList.remove('modal-open');
}
const createBigPicture = ({ url, description, likes, comments }) => {
  pictureBigPhoto.querySelector('.likes-count').textContent = likes;
  pictureBigPhoto.querySelector('.big-picture__img > img').src = url;
  pictureBigPhoto.querySelector('.big-picture__img > img').alt = description;
  pictureBigPhoto.querySelector('.social__caption').textContent = description;
  pictureBigPhoto.querySelector('.comments-count').textContent = comments.length;
  pictureBigPhoto.querySelector('.comments-count-loader').textContent = COUNT_COMMENT_VISUAL;
};
const createComment = (data) => {
  let count = 1;
  pictureComments.innerHTML = '';
  data.forEach((element) => {
    const commentElement = document.createElement('li');
    const commentElementAvatar = document.createElement('img');
    const commentElementText = document.createElement('p');
    commentElementAvatar.classList.add('social__picture');
    commentElementAvatar.src = element.avatar;
    commentElementAvatar.alt = element.name;
    commentElementAvatar.width = '35';
    commentElementAvatar.height = '35';
    commentElementText.textContent = element.message;
    commentElement.classList.add('social__comment');
    if (count > COUNT_COMMENT_VISUAL) {
      commentElement.classList.add('hidden');
    }
    commentElement.append(commentElementAvatar);
    commentElement.append(commentElementText);
    pictureComments.append(commentElement);
    count++;
  });
};
const getCommentLast = (evt) => {
  const commenList = evt.target.previousElementSibling;
  const commentListArray = commenList.querySelectorAll('.hidden');
  const commentsCountLoader = evt.target.previousElementSibling.previousElementSibling.querySelector('.comments-count-loader').textContent;
  for (let i = 0; i < commentListArray.length; i++) {
    if (i < COUNT_COMMENT_VISUAL) {
      commentListArray[i].classList.remove('hidden');
      evt.target.previousElementSibling.previousElementSibling.querySelector('.comments-count-loader').textContent = +commentsCountLoader + i + 1;
    }
  }
  if (commentListArray.length <= COUNT_COMMENT_VISUAL) {
    pictureCommentsLoader.classList.add('hidden');
    pictureCommentsLoader.removeEventListener('click', getCommentLast);
  }
};
const getBigPicture = (data) => {
  pictureBigPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
  pictureBigCancel.addEventListener('click', onModalBigPictureClick);
  document.addEventListener('keydown', onModalBigPicturEscKeydown);
  createBigPicture(data);
  createComment(data.comments);
  if (data.comments.length <= COUNT_COMMENT_VISUAL) {
    pictureCommentsLoader.classList.add('hidden');
    pictureCommentsCount.classList.add('hidden');
  }
  else {
    pictureCommentsLoader.addEventListener('click', getCommentLast);
    pictureCommentsLoader.classList.remove('hidden');
    pictureCommentsCount.classList.remove('hidden');
  }
};
export { getBigPicture };
