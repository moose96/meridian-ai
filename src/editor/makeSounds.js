const fs = require('fs');

let objects = [];

for (let i = 0; i < 100; i++) {
  objects.push({
    type: 'sound',
    filename: `/data/aa_${i+1}.wav`
  });
}

fs.writeFileSync('src/editor/out/out.json', JSON.stringify(objects, null, 2));