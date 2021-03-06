import { rest } from 'msw';

import { getObject, getObjects } from '../utility/functions';
import { getSounds } from './sounds';
import { prepareObjects } from './utility/functions';

export const getSets = async (data) => await getObjects('sets', data);

export const getSet = async (id) => {
  const { data } = await getObject('sets', id);
  const { data: snapshots } = await getObject('sets', id, 'snapshots.json');

  let sounds = await getSounds('sounds', data.sounds);
  sounds = sounds.map(sound => prepareObjects(sound.id, sound.data));
  return {
    ...data,
    sounds,
    snapshots
  }
}

const handlers = [
  rest.get('/v1/sets/', async (req, res, ctx) => {
    const response = await fetch('/data/sets/index.json');
    let data = response.json();

    let sets = await getSets(data).map;
    sets = sets.map(set => set.data);

    return res (
      ctx.status(200),
      ctx.json(sets)
    );
  }),
  rest.get('/v1/sets/:id', async (req, res, ctx) => {
    const { id } = req.params;

    const set = await getSet(id);

    return res (
      ctx.status(200),
      ctx.json(set)
    );
  })
];

export default handlers;