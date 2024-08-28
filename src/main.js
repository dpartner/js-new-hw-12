import searchPhoto from './js/pixabay-api';
import renderMarkup from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const domElements = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery-list'),
  loader: document.querySelector('.loader'),
  loadButton: document.querySelector('.load-button'),
};

const userRequest = {
  request: '',
  page: 1,
  perPage: 15,
  totalHits: 0,
};

const lightBox = new SimpleLightbox('.gallery-list a');

domElements.form.addEventListener('submit', handleSearch);

function handleSearch(ev) {
  ev.preventDefault();
  domElements.gallery.innerHTML = '';
  toogleLoader();
  userRequest.page = 1;
  userRequest.request = ev.target.search.value.trim().toString();
  if (userRequest.request !== '') {
    searchPhoto(userRequest)
      .then(data => {
        userRequest.totalHits = data.totalHits;
        return data.hits;
      })
      .then(hits => {
        if (hits.length === 0) {
          toogleLoader();
          return iziToast.show(notificationWrongRequest);
        }
        domElements.gallery.innerHTML = renderMarkup(hits);
        toogleLoader();
        if (checkTotalHits(userRequest.totalHits)) {
          toogleLoadButton();
        }
        lightBox.refresh();
      })
      .catch(error => console.log(error));
  }
}

domElements.loadButton.addEventListener('click', loadMore);

function loadMore() {
  userRequest.page += 1;
  toogleLoadButton();
  toogleLoader();
  searchPhoto(userRequest)
    .then(data => {
      return data.hits;
    })
    .then(hits => {
      if (hits) {
        toogleLoader();
        domElements.gallery.insertAdjacentHTML('beforeend', renderMarkup(hits));
        loadMoreScroll();
        if (checkTotalHits(userRequest.totalHits)) {
          toogleLoadButton();
        }
        lightBox.refresh();
      }
    })
    .catch(error => console.log(error));
}

function checkTotalHits(totalHits) {
  const shownHits = userRequest.page * userRequest.perPage;
  if (totalHits <= shownHits) {
    iziToast.show(notificationEndResults);
    return false;
  }
  return true;
}

function loadMoreScroll() {
  const cartHeight = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;
  window.scrollBy({
    top: cartHeight * 2,
    behavior: 'smooth',
  });
}

const notificationWrongRequest = {
  theme: 'dark',
  icon: 'icon-person',
  title: 'Sorry, ',
  message: 'there are no images matching your search query. Please try again!!',
  position: 'topRight',
};

const notificationEndResults = {
  theme: 'dark',
  icon: 'icon-person',
  title: "We're sorry, ",
  message: "but you've reached the end of search results.",
  position: 'topRight',
};

function toogleLoadButton() {
  domElements.loadButton.classList.toggle('shown');
}

function toogleLoader() {
  domElements.loader.classList.toggle('shown');
}
