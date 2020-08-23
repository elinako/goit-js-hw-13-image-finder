import template from './template.hbs';

const baseUrl = 'https://pixabay.com/api/';
const myKey = '17994878-b5f1eeaed6565441bb64a90e6';

const searchForm = document.querySelector('.search-form');
const input = document.querySelector('#input');
const imagesList = document.querySelector('.gallery');
const buttonLoad = document.querySelector('.button');
let page = 1;

function imageSearcher(event) {
  event.preventDefault();
  const searchParametr = event.currentTarget.elements.input.value;
  fetch(
    baseUrl +
      '?image_type=photo&orientation=horizontal&q=' +
      `${searchParametr}` +
      `&page=1&per_page=12&key=` +
      myKey,
  )
    .then(response => response.json())
    .then(data => {
      const markup = data.hits.map(item => template(item));
      imagesList.insertAdjacentHTML('beforeend', markup);
    })
    .catch(error => console.error(error));

  page = 1;
}

function loadMorePictures(event) {
  page += 1;
  const searchParametr = searchForm.elements.input.value;
  fetch(
    baseUrl +
      '?image_type=photo&orientation=horizontal&q=' +
      `${searchParametr}` +
      `&page=${page}&per_page=12&key=` +
      myKey,
  )
    .then(response => response.json())
    .then(data => {
      console.log(data.hits);
      const markup = data.hits.map(item => template(item));
      imagesList.insertAdjacentHTML('beforeend', markup);
    })
    .catch(error => console.error(error));
  let scrollHeight = window.innerHeight;
  window.scrollTo(0, scrollHeight * page);
  console.log(page);
}

searchForm.addEventListener('submit', imageSearcher);
buttonLoad.addEventListener('click', loadMorePictures);
