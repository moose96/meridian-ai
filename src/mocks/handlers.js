import { rest } from 'msw';

const handlers = [
  rest.get('/v1/sounds', async (req, res, ctx) => {
    const response = await fetch('/data/sounds/index.json');
    const data = await response.json();

    return res(
      ctx.status(200),
      ctx.json(data)
    );
  }),
];

export default handlers;