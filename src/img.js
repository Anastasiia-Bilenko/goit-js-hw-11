import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38440224-7238a8b841ef8f0f757ec932d';

export async function fetchImages(searchQuery, page) {
  const params = {
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: page,
  };
  const response = await axios.get(BASE_URL, { params });
  const { hits, totalHits } = response.data;
  return { hits, totalHits };
}