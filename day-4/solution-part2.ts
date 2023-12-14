// Read the file synchronously
import fs from 'node:fs';

const content:string = fs.readFileSync('./input', 'utf8');

// Split the file into a list of lines
const lines = content.slice(0, content.length - 1).split('\n');

type Card = {
  idx: number,
  points: number
}

const cards:Card[] = [];

// Go through each line and extract winning numbers, player numbers and compare them together
lines.forEach((line, index) => {
  // Remove the 'Game x:' part from the line
  line = line.split(':')[1];

  const [winning_numbers, player_numbers] = line
    // Split the array into two parts: winning numbers and player numbers
    .split('|')
    // We convert both string into an array of numbers
    .map((array) => Array.from(array.matchAll(/\d+/g), (match) => match[0]));

  // Filter to keep only the matching numbers and get the length of the array
  const points = winning_numbers.filter(number => player_numbers.includes(number)).length;

  // Add to the cards array
  cards.push({
    idx: index,
    points: points
  });

});

// Total count of scratchcards
let count:number = 0;

// For each card, we count all the copies
cards.forEach(c => {
  // Start with one element in the queue
  let queue:Card[] = [c];

  while (queue.length) {
    // Get the last element
    const card = queue.pop()!;
    // Count the card
    count += 1;
    // If the card wins other cards we add them to the queue until there
    // is no card left in the queue
    if (card.points) {
      const tempc = cards.slice(card.idx + 1, card.idx + card.points + 1);
      queue.push(...tempc);
    }
  }
});

console.log(count);
