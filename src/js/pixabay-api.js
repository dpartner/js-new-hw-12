import axios from 'axios';

// export default function searchPhoto(request) {
//   return fetch(
//     `https://pixabay.com/api/?key=13230076-6d393faca736dd5a90699a632&q=${request}&image_type=photo&orientation=horizontal&safesearch=true`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

export default async function searchPhoto({ request, page, perPage }) {
  const response = await axios.get(
    `https://pixabay.com/api/?key=13230076-6d393faca736dd5a90699a632&q=${request}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response.data;
}
