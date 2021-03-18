import _ from 'lodash';

import { SnapshotList } from '../../ai/Snapshot';
import snapshots from '../../../public/data/sets/3bfa2ef6-63e1-41be-a977-0273ec87aa69/snapshots.json';

describe('test snapshot list', () => {
  test('calculate similarities', () => {
    // const { snapshots } = data;

    for (let mutationProbability = 0.95; mutationProbability <= 0.95; mutationProbability += 0.05) {
      for (let mutationSize = 10; mutationSize <= 90; mutationSize += 10) {
        const snapshotList = new SnapshotList(snapshots);
        snapshotList.mutation = {
          mutationProbability,
          mutationSize
        };
        snapshotList.offset = mutationSize;


        let similarities = [];
        for (let i = 0; i < 100; i++) {
          snapshotList.next();
          similarities.push(snapshotList.__TEST__similarity);

          if (i === 3) {
            snapshotList.oscillate();
          }
        }

        // console.log(mutationProbability, mutationSize, similarities);
        console.log(mutationSize, 'avg, min, max: ', _.mean(similarities), _.min(similarities), _.max(similarities));

        // console.log(mutationProbability, mutationSize, _.mean(similarities), _.max(similarities), _.min(similarities));
      }
    }
  });
});