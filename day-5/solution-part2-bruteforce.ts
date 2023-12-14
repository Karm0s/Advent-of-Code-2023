import fs from 'node:fs';

type ShiftParams = {
  destination: number,
  source: number,
  range: number
};

type Transformation = {
  name: string,
  shifts: ShiftParams[]
}

const file = fs.readFileSync('input', 'utf8');

console.time('Exec Time');
const sections = file.slice(0, file.length - 1).split('\n\n');
const seeds = sections.splice(0, 1)[0].split(':')[1].trim().split(' ').map(i => parseInt(i));
const seedRanges:number[][] = [];
for (let i = 0; i < seeds.length; i += 2){
  seedRanges.push(seeds.slice(i, i+2));
}

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

const locations = seedRanges.map(seedRange => {
  let smallestLocation:number|undefined;
  console.log('SEED RANGE: ' + seedRange[0] + ' -> ' + (seedRange[0] + seedRange[1]));
  console.log('CHECKING: ' +
  Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(seedRange[1]));

  for (let i = seedRange [0]; i < seedRange[0] + seedRange[1]; i++) {
    let tState = i;
    transformations.forEach(t => {
      for (let tShift of t.shifts) {
        if (tState >= tShift.source && tState < tShift.source + tShift.range) {
          tState = tShift.destination + tState - tShift.source;
          break;
        }
      };
    });
    if (!smallestLocation || tState < smallestLocation) {
      smallestLocation = tState;
    }
  }
  console.log('Smallest Location:');
  console.log(smallestLocation);

  return smallestLocation as number;
});

console.log('\n\nMIN LOCATION: ' + Math.min(...locations.flat()));
console.timeEnd('Exec Time');
