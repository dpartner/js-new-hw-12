import searchPhoto from './js/pixabay-api';
import renderMarkup from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery-list');
const lightBox = new SimpleLightbox('.gallery-list a');
const loader = document.querySelector('.loader');

form.addEventListener('submit', handleSearch);

function handleSearch(ev) {
  ev.preventDefault();
  gallery.innerHTML = '';
  loader.classList.add('shown');
  const searchValue = ev.target.search.value.trim().toString();
  if (searchValue !== '') {
    searchPhoto(searchValue)
      .then(data => {
        return data.hits;
      })
      .then(hits => {
        if (hits.length === 0) {
          return iziToast.show(notificationOption);
        }
        loader.classList.remove('shown');
        gallery.innerHTML = renderMarkup(hits);
        lightBox.refresh();
      })
      .catch(error => console.log(error));
  }
}
const notificationOption = {
  theme: 'dark',
  icon: 'icon-person',
  title: 'Sorry, ',
  message: 'there are no images matching your search query. Please try again!!',
  position: 'topRight',
};
