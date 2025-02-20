import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createMarkup } from './js/create-markup';
import { getPictures } from './js/get-pictures';
import { scrollingTopPage } from './js/scrolling';

const formSearch = document.querySelector('.js-search');
const listImages = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btnLoader = document.querySelector('.btn-load');
const loaderMore = document.querySelector('.loader-more');
const endLoader = document.querySelector('.end-loader');
let currentPage = 1;
const perPage = 40;
let inputSearch = '';
let simpleLightboxExem;

loader.style.display = 'none';
loaderMore.style.display = 'none';
btnLoader.style.display = 'none';
endLoader.style.display = 'none';

formSearch.addEventListener('submit', onSearch);
btnLoader.addEventListener('click', onLoadMore);

scrollingTopPage();

function onSearch(event) {
  event.preventDefault();

  currentPage = 1;
  listImages.innerHTML = '';
  loader.style.display = 'block';
  btnLoader.style.display = 'none';
  endLoader.style.display = 'none';

  inputSearch = event.target.elements.search.value.trim();

  if (!inputSearch) {
    iziToast.warning({
      title: 'Caution',
      message: 'Sorry, but you did not fill out the field!',
    });
    loader.style.display = 'none';
    return;
  }

  getPictures(inputSearch, currentPage)
    .then(({ data }) => {
      loader.style.display = 'none';

      const totalPages = Math.ceil(data.totalHits / perPage);

      if (currentPage === totalPages) {
        btnLoader.style.display = 'none';
        endLoader.style.display = 'block';
      } else {
        btnLoader.style.display = 'block';
      }

      if (!data.hits.length) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }

      listImages.insertAdjacentHTML('beforeend', createMarkup(data.hits));

      iziToast.success({
        title: 'Wow',
        message: `We found ${data.totalHits} pictures!`,
      });

      simpleLightboxExem = new SimpleLightbox('.gallery a', {
        captions: true,
        captionsData: 'alt',
        captionDelay: 250,
      }).refresh();

      formSearch.reset();
    })
    .catch(err => {
      loader.style.display = 'none';
      console.log(err);
    });
}

function onLoadMore() {
  currentPage += 1;

  loaderMore.style.display = 'block';
  btnLoader.style.display = 'none';
  endLoader.style.display = 'none';

  const getHeightImgCard = () =>
    document.querySelector('.gallery-item').getBoundingClientRect();

  getPictures(inputSearch, currentPage)
    .then(({ data }) => {
      listImages.insertAdjacentHTML('beforeend', createMarkup(data.hits));

      window.scrollBy({
        top: getHeightImgCard().height * 2,
        left: 0,
        behavior: 'smooth',
      });

      simpleLightboxExem.refresh();

      const totalPages = Math.ceil(data.totalHits / perPage);

      if (currentPage === totalPages) {
        iziToast.info({
          title: 'Caution',
          message: `We're sorry, but you've reached the end of search results.`,
        });

        btnLoader.style.display = 'none';
        loaderMore.style.display = 'none';
        endLoader.style.display = 'block';

        return;
      }

      loaderMore.style.display = 'none';
      btnLoader.style.display = 'block';
    })
    .catch(error => console.log(error));
}

//============//
export { scrollingTopPage };

function scrollingTopPage() {
  document.addEventListener('DOMContentLoaded', function () {
    const upButton = document.querySelector('.up-btn');

    upButton.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      document.body.classList.add('scrolling');
    });

    window.addEventListener('scroll', function () {
      if (window.scrollY > 200) {
        upButton.classList.add('show');
      } else {
        upButton.classList.remove('show');
      }

      if (
        document.body.classList.contains('scrolling') &&
        window.scrollY === 0
      ) {
        document.body.classList.remove('scrolling');
      }
    });
  });
}

//====================================//

export { getPictures };

// const perPage = 40;

async function getPictures(name, page) {
  const KEY = '40891115-11d0b88dd3a60afc830d1d27f';

  try {
    if (name.includes(' ')) {
      name.replace(/\s+/g, '+');
    }

    const response = await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: KEY,
        q: name,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });
    return response;
  } catch {
    iziToast.error({
      title: 'Error',
      message: 'Sorry! The site is currently unavailable. Please try later!',
    });
    console.error(error.message);
  }
}
