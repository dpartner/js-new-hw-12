export default function searchPhoto(request) {
  return fetch(
    `https://pixabay.com/api/?key=13230076-6d393faca736dd5a90699a632&q=${request}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
