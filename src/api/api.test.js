import api from './api';

const API_URL = 'http://localhost:3000/v1/test';


const fetchData = async (method) => {
  const response = await fetch(API_URL, { method });

  if (response.status === 200) {
    return response.json();
  } else {
    throw Error(response.statusText);
  }
};

describe('test api client', () => {
  it('should GET', async () => {
    const testData = await fetchData('GET');
    const result = await api.get('test');

    expect(testData).toEqual(result);
  });
  it('should POST', async () => {
    const testData = await fetchData('POST');
    const result = await api.post('test', { someKey: 'a' });

    expect(testData).toEqual(result);
  });
  it('should PATCH', async () => {
    const testData = await fetchData('PATCH');
    const result = await api.patch('test', { someKey: 'a' });

    expect(testData).toEqual(result);
  });
  it('should DELETE', async () => {
    const testData = await fetchData('DELETE');
    const result = await api.delete('test');

    expect(testData).toEqual(result);
  });
  it('should throw error', async () => {

  })
});
