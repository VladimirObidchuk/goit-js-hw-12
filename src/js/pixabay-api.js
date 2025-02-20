import axios from 'axios';

async function fetchImage({
  urlBase,
  apiKey,
  searchExpression,
  type,
  orientation,
  safesearch,
  page,
  perPage,
}) {
  const response = await axios.get(urlBase, {
    params: {
      key: apiKey,
      q: searchExpression,
      image_type: type,
      orientation: orientation,
      safesearch: safesearch,
      page: page,
      per_page: perPage,
    },
  });

  console.log(' response', response);
  return response;
}

export default fetchImage;
