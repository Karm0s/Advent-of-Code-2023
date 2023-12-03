// Read the file synchronously
import fs from 'node:fs';
const content: String = fs.readFileSync('./input', 'utf8');

// Declare the maximum number of cubes per color in the bag
const game_bag = {
  red: 12,
  green: 13,
  blue: 14
};

// Define a regular expression that matches the numbers and colors of all cubes per game (line of text)
const picks_re = /(\d+) (green|red|blue)/g

// Define variable to cumulate the solution
let solution = 0;

// Process the file line by line
content.slice(0, content.length - 1).split('\n').map(line => {
  let impossible_game = false;

  // Extract the game id from the line using regex
  const game_id = Number(line.match(/Game (\d+)/)![1]);

  // Match all (number color) pairs from the line
  Array.from(line.matchAll(picks_re), match => ({
    count: Number(match[1]),
    color: match[2],
  })).forEach(element => {
    // Loop through all the elements and check if there is an elements having a count greater than the
    // given init conditions in game_bag
    if (element.count > game_bag[element.color as keyof typeof game_bag]) {
      impossible_game = true;
    }
  });

  // We add the game id to the solution if all the number/color pairs are smaller than the values in game_bag
  if (!impossible_game) {
    solution += game_id;
  }
});

console.log(solution);
