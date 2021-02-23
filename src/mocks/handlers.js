import { rest } from 'msw';

import { prepareObjects, joinObjects } from './utility/functions';

const getSound = async (id) => {
  const response = await fetch(`/data/sounds/${id}/index.json`);
  return prepareObjects(id, await response.json());
}

const handlers = [
  rest.get('/v1/sounds', async (req, res, ctx) => {
    const response = await fetch('/data/sounds/index.json');
    let data = await response.json();

    data = data.map(async (id) => await getSound(id));
    data = await Promise.all(data);
    // data = joinObjects(data);

    return res(
      ctx.status(200),
      ctx.json(data)
    );
  }),
  rest.get('/v1/sounds/:id', async (req, res, ctx) => {
    const { id } = req.params;

    // const response = await fetch(`/data/sounds/${id}/index.json`);
    // const data = prepareObjects(id, await response.json());
    const data = await getSound(id);

    return res(
      ctx.status(200),
      ctx.json(data)
    );
  })
];

export default handlers;