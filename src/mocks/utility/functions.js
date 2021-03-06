export const getObjects = async (key, data) => {
  const objects = data.map(async (id) => await getObject(key, id));
  return await Promise.all(objects);
}

export const getObject = async (key, id, file = 'index.json') => {
  const response = await fetch(`/data/${key}/${id}/${file}`);
  return {id, data: await response.json() };
}