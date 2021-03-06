const API_URL = 'http://localhost:3000/v1';

async function request(url, method = 'GET', data = null) {
  const options = {
    method,
    headers: {
      'content-type': 'application/json'
    }
  };

  if (method === 'POST' || method === 'PATCH') {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_URL}/${url}`, options);

  if (response.status === 200 || response.status === 201) {
    return response.json();
  } else {
    throw Error(response.statusText);
  }
}

function get(url) {
  return request(url);
}

function post(url, data) {
  return request(url, 'POST', data);
}

function patch(url, data) {
  return request(url, 'PATCH', data);
}

function _delete(url) {
  return request(url, 'DELETE');
}

const api = {
  get,
  post,
  patch,
  delete: _delete
};

export default api;