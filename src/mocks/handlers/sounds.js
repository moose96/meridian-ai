import { rest } from 'msw';

import { getObjects, getObject } from '../utility/functions';
import { prepareObjects } from './utility/functions';

export const getSounds = async (data) => {
  return await getObjects('sounds', data);
}

export const getSound = async (id) => {
  const { id: objectID, data } = await getObject('sounds', id);
  return prepareObjects(objectID, data);
}

const handlers = [
  rest.get('/v1/sounds', async (req, res, ctx) => {
    const response = await fetch('/data/sounds/index.json');
    let data = await response.json();

    data = data.map(async (id) => await getSound(id));
    data = await Promise.all(data);

    return res(
      ctx.status(200),
      ctx.json(data)
    );
  }),
  rest.get('/v1/sounds/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const data = await getSound(id);

    return res(
      ctx.status(200),
      ctx.json(data)
    );
  })
];

export default handlers;