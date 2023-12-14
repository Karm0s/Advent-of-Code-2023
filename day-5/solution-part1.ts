import fs from 'node:fs';

const file = fs.readFileSync('input', 'utf8');

const sections = file.slice(0, file.length - 1).split('\n\n');

type ShiftParams = {
  destination: number,
  source: number,
  range: number
};

type Transformation = {
  name: string,
  shifts: ShiftParams[]
}

const seeds = sections.splice(0, 1)[0].split(':')[1].trim().split(' ').map(i => parseInt(i));

const transformations:Transformation[] = [];

sections.forEach(section => {
  const lines = section.split('\n');
  const name = lines.splice(0, 1)[0];

  const shiftParams:ShiftParams[] = lines.map(shift => {
    let values = shift.split(' ').map(i => parseInt(i));
    return {
      destination: values[0],
      source: values[1],
      range: values[2]
    };
  });

  transformations.push({
    name: name,
    shifts: shiftParams
  });
});

const locations = seeds.map(seed => {
  let tState = seed;
  console.log('\n\nSTART SEED: ' + seed);

  transformations.forEach(t => {
    for (let tShift of t.shifts) {
      if (tState >= tShift.source && tState < tShift.source + tShift.range) {
        tState = tShift.destination + tState - tShift.source;
        break;
      }
    };
    console.log(t.name + tState);
  });
  return tState;
});

console.log('\n\nMIN LOCATION: ' + Math.min(...locations));

