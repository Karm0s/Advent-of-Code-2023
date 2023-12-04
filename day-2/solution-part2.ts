// Read the file synchronously
import fs from 'node:fs';
const content: String = fs.readFileSync('./input', 'utf8');

// Define array to contain all possible colors
const colors = ['red', 'green', 'blue'];

// Define a regular expression that matches the numbers and colors of all cubes per game (line of text)
const picks_re = /(\d+) (green|red|blue)/g

// Define variable to cumulate the solution
let solution = 0;

// Process the file line by line
content.slice(0, content.length - 1).split('\n').map(line => {

  // Match all (number color) pairs from the line
  const pairs = Array.from(line.matchAll(picks_re), match => ({
    count: Number(match[1]),
    color: match[2],
  }));

  // Calculate the power of the maximum count value per color
  const power = colors
    // Separate all the matches by color
    .map(color => pairs.filter(pair => pair.color === color))
    // Sort by count the elements in the arrays and take the last element of each array (represents the biggest value)
    .map(color_array => color_array.sort((a, b) => ((a.count !== b.count) ? ((a.count > b.count) ? 1 : -1) : 0)).pop())
    // Remove the uneeded color property and keep only the count
    .map(color_pair => color_pair?.count)
    // Reduce the array into one value by multiplying all the counts together
    .reduce((acc, value) => acc! * value!)!;

  // Add the power to the solution
  solution += power;
});

console.log(solution);
