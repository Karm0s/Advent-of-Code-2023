// Read the content of the input file
const fs = require("node:fs");
const content = fs.readFileSync('./input', 'utf8');

// Define an array containing a regular expression that matches all numbers from 1 to 9,
// and numbers spelled in letters
const digits = [/[1-9]/g, 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

// Initialize a variable to store the cumulative solution
let solution = 0;

// Map through each line of the file
content.slice(0, content.length - 1).split('\n').map(line => {
  // Extract and sort all the tokens
  let tokens = digits
    .flatMap(digit => {
      // Match all occurencies for each item in the digits array
      const matches = Array.from(line.matchAll(digit), match => ({ value: match[0], index: match['index'] }));
      if (matches) {
        return matches;
      }
    })
    // Sort all the matches using their index
    .sort((a, b) => ((a.index !== b.index) ? ((a.index > b.index) ? 1 : -1) : 0))
    // Convert all values into numerical values
    .map(token => {
      if (isNaN(token.value)) {
        return digits.indexOf(token.value);
      }
      return token.value;

    });
  // Compose the final number by taking the first and last elements of the tokens array
  const line_solution = Number(`${tokens[0]}${tokens.slice(-1)}`);
  // Add it to the solution
  solution += line_solution;
});

console.log(solution);
