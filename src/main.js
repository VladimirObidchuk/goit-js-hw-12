import fetchImage from './js/pixabay-api.js';
import renderGaleryImg from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const perPage = 15;
let page = 1;

const parametersObject = {
  urlBase: 'https://pixabay.com/api/',
  apiKey: '48839660-7b8b283c3689698998fc631e5',
  searchExpression: null,
  type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: page,
  perPage: perPage,
};

class MessageAlert {
  constructor(title, message, position, timeout, transitionIn, transitionOut) {
    this.title = title;
    this.message = message;
    this.position = position;
    this.timeout = timeout;
    this.transitionIn = transitionIn;
    this.transitionOut = transitionOut;
  }

  updateMessage(message) {
    this.message = message;
  }

  error() {
    iziToast.error({
      title: this.title,
      message: this.message,
      position: this.position,
      timeout: this.timeout,
      transitionIn: this.transitionIn,
      transitionOut: this.transitionOut,
    });
  }
  info() {
    iziToast.info({
      title: this.title,
      message: this.message,
      position: this.position,
      timeout: this.timeout,
      transitionIn: this.transitionIn,
      transitionOut: this.transitionOut,
    });
  }
}

class ErrorAlert extends MessageAlert {
  constructor(message) {
    super('Error', message, 'topRight', 5000, 'fadeInDown', 'fadeOutUp');
  }
}
class InfoAlert extends MessageAlert {
  constructor(message) {
    super('info', message, 'topRight', 5000, 'blue', 'fadeInDown', 'fadeOutUp');
  }
}

const errorAlertInstance = new ErrorAlert();
const InfoAlertInstans = new InfoAlert();

const imgList = document.querySelector('.js-gallery');
const searchForm = document.querySelector('.form');
const loader = document.querySelector('.loader');
const searchImageBtn = document.querySelector('.js-search-btn');
const pageUpBtn = document.querySelector('.js-pageup-btn');

searchForm.addEventListener('submit', onSearch);
searchImageBtn.addEventListener('click', onLoadMore);

let searchData = '';
let galleryInner = null;

function searchInputExpretion() {
  const searchInput = document.querySelector('.js-form-input');
  searchData = searchInput.value.replace(/\d+/g, '').replace(/ /g, '+').trim();

  if (searchData === '') {
    InfoAlertInstans.updateMessage('Please enter a search term');
    InfoAlertInstans.info();
    return;
  }
  return searchData;
}

async function onSearch(e) {
  e.preventDefault();
  const searchExpression = searchInputExpretion();

  if (!searchExpression) {
    return;
  }
  parametersObject.searchExpression = searchInputExpretion();

  try {
    loader.style.display = 'inline-block';
    const gallery = await fetchImage(parametersObject);
    if (gallery.data.hits.length === 0) {
      errorAlertInstance.updateMessage(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      searchImageBtn.style.display = 'none';
      errorAlertInstance.error();
      searchForm.reset();
      imgList.innerHTML = '';
      return;
    }
    imgList.innerHTML = '';
    imgList.insertAdjacentHTML('beforeend', renderGaleryImg(gallery.data.hits));
    searchImageBtn.style.display = 'block';

    galleryInner = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
      animationSpeed: 300,
      animationSlide: true,
      overlay: true,
      overlayOpacity: 0.8,
    });

    galleryInner.on('shown.simplelightbox', () => {
      const lightboxContainer = document.querySelector('.simple-lightbox');
      if (!lightboxContainer) {
        return;
      }
    });
    galleryInner.refresh();
  } catch (error) {
    searchImageBtn.style.display = 'none';
    pageUpBtn.style.display = 'none';
    console.log(error);
  } finally {
    loader.style.display = 'none';
  }
  searchForm.reset();
}

function onLoadMore() {
  parametersObject.page += 1;
  loader.style.display = 'block';

  galleryInner.refresh();

  fetchImage(parametersObject).then(gallery => {
    imgList.insertAdjacentHTML(
      'beforeend',
      renderGaleryImg(gallery.data.hits, page)
    );

    galleryInner.refresh();
    const totalPages = Math.ceil(gallery.data.totalHits / perPage);
    const getHeightImgCard = () =>
      document.querySelector('.gallery-item').getBoundingClientRect();
    window.scrollBy({
      top: getHeightImgCard().height * 2,
      left: 0,
      behavior: 'smooth',
    });
    loader.style.display = 'none';
    pageUpBtn.style.display = 'flex';
    if (parametersObject.page === totalPages) {
      InfoAlertInstans.updateMessage(
        "We're sorry, but you've reached the end of search results."
      );
      InfoAlertInstans.info();
      loader.style.display = 'none';
      searchImageBtn.style.display = 'none';
    }
  });
}
