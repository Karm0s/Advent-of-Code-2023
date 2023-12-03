const fs = require("node:fs");
const content = fs.readFileSync('./input', 'utf8');

const spelled_digits = [/[1-9]/g, 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

let solution = 0;
content.slice(0, content.length - 1).split('\n').map(line => {
  let tokens = spelled_digits
  .map(digit => {
    const matches = Array.from(line.matchAll(digit), match => ({value: match[0], index: match['index']}));
    if (matches) {
      return matches;
    }
  })
  .flat()
  .sort((a, b) => ((a.index !== b.index) ? ((a.index > b.index) ? 1 : -1) : 0))
  .map(token => {
    if (isNaN(token.value)) {
      return Number(spelled_digits.indexOf(token.value));
    }
    return Number(token.value);

  });
  const line_solution = Number(`${tokens[0]}${tokens.slice(-1)}`);
  solution += line_solution;
});

console.log(solution);
