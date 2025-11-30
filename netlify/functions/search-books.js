const axios = require('axios');

exports.handler = async function (event, context) {
  // Get the search query from the request URL
  const { query } = event.queryStringParameters;

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Search query is required' }),
    };
  }

  // Get the Naver API credentials from environment variables
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Naver API credentials are not configured' }),
    };
  }

  const apiUrl = 'https://openapi.naver.com/v1/search/book.json';

  try {
    const response = await axios.get(apiUrl, {
      params: { query, display: 10 },
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret,
        'Content-Type': 'application/json',
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.items),
    };
  } catch (error) {
    console.error('Error calling Naver API:', error);
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: 'Failed to fetch data from Naver API' }),
    };
  }
};
