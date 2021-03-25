let API_URL;

if (process.env.NODE_ENV === 'development') {
  API_URL = 'http://localhost:3000/v1';
} else if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://meridian-ai.netlify.app/v1';
}

export {
  API_URL
}