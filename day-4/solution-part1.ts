// Read the file synchronously
import fs from 'node:fs';
const content:string = fs.readFileSync('./input', 'utf8');

// Create variable to accumulate solution
let solution = 0;

// Split the file into a list of lines
const lines = content.slice(0, content.length - 1).split('\n');

// Go through each line and extract winning numbers, player numbers and compare them together
lines.forEach(line => {
  // Remove the 'Game x:' part from the line
  line = line.split(':')[1];

  const [winning_numbers, player_numbers] = line
    // Split the array into two parts: winning numbers and player numbers
    .split('|')
    // We convert both string into an array of numbers
    .map((array) => Array.from(array.matchAll(/\d+/g), (match) => match[0]));

  // Filter to keep only the matching numbers and get the length of the array
  const length = winning_numbers.filter(number => player_numbers.includes(number)).length;

  // If we have matching numbers
  if (length > 0) {
    // We calculate the value of the card
    const partial = Math.pow(2,length - 1);
    // Add it to the solution variable
    solution += partial;
  }

});

console.log(solution);
