export default function renderMarkup(photoArray) {
  return photoArray
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
          <a class="gallery-item-link" href="${largeImageURL}">
            <img class="gallery-item-img" src="${webformatURL}" alt="${tags}" />
          </a>
          <div class="gallery-item-desc-wrap">
            <div class="info-box">
              <h3 class="gallery-item-title">Likes</h3>
              <p class="gallery-item-text">${likes}</p>
            </div>
            <div class="info-box">
              <h3 class="gallery-item-title">Views</h3>
              <p class="gallery-item-text">${views}</p>
            </div>
            <div class="info-box">
              <h3 class="gallery-item-title">Comments</h3>
              <p class="gallery-item-text">${comments}</p>
            </div>
            <div class="info-box">
              <h3 class="gallery-item-title">Downloads</h3>
              <p class="gallery-item-text">${downloads}</p>
            </div>
          </div>
        </li>
  `
    )
    .join('');
}
