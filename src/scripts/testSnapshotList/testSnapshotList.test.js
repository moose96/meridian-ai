import _ from 'lodash';

import { SnapshotList } from '../../ai/Snapshot';
import snapshots from '../../../public/data/sets/3bfa2ef6-63e1-41be-a977-0273ec87aa69/snapshots.json';

describe('test snapshot list', () => {
  test('calculate similarities', () => {
    // const { snapshots } = data;

    for (let mutationProbability = 0.1; mutationProbability <= 0.95; mutationProbability += 0.05) {
      let mins = [], maxes = [], avgs = [];
      for (let mutationSize = 30; mutationSize <= 30; mutationSize += 10) {
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
        }
        similarities = similarities.slice(3);
        mins.push(_.min(similarities));
        maxes.push(_.max(similarities));
        avgs.push(_.mean(similarities));

        // console.log(
        //   parseInt(mutationProbability * 100),
        //   mutationSize,
        //   avgs[avgs.length - 1],
        //   mins[mins.length - 1],
        //   maxes[maxes.length - 1]
        // );
      }
      console.log(
        'AFTER PROBABILITY: ',
        parseInt(mutationProbability * 100),
        _.mean(avgs),
        _.min(mins),
        _.max(maxes),
      );
    }
  });
});

/*
  results:
  1. mutations sizes higher than 50 isn't useful
  2. when size of snapshots is 100, then 10% reaches max value to 1,
    but when size of snapshots is 1000, then 20% reaches max value to 1
  3. mutation probabilities:
    * to 10% gives a result to 90% (and it's not useful because max value equals to 1)
    * to 60% gives a result to 80%
    * to 95% gives a result to 70%
  4. mutation size equal to 30 is the closest to mean value of results above

  mutationSize = (10; 50), default = 30
  mutationProbability = (0.25; 0.95), default = 0.6
*/