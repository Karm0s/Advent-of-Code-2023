// Read the file synchronously
import fs from 'node:fs';
const content: String = fs.readFileSync('./input', 'utf8');

// Create variable to accumulate solution
let solution = 0;

// Define a point type
type Point = {
  line_index: number,
  value: string,
  start_index: number,
  end_index: number
}

// Create variables to hold the numbers and symbols
let numbers: Point[] = [];
let symbols: Point[] = [];

// Split the file a list of lines
const lines = content.slice(0, content.length - 1).split('\n');

// Go through all the line to extract the numbers and symbols using regular expressions
for (let line_index = 0; line_index < lines.length; line_index++) {
  const line = lines[line_index];

  // This function contructs a Point object from the match object returned by the regex search
  const buildPoint = (match: RegExpMatchArray): Point => {
    return {
      line_index: line_index,
      value: match[0],
      start_index: match['index']!,
      end_index: match['index']! + match[0].length - 1
    }
  };

  // Add the numbers and symbols to the numbers and symbols arrays
  numbers.push(...Array.from(line.matchAll(/\d+/g), buildPoint));
  symbols.push(...Array.from(line.matchAll(/[^\d+\.]|\+/g), buildPoint));
}

// Go through all the symbols to find their immediate neighbours
symbols.map(symbol => {
  // For each symbols we check all the numbers to see if they are next to it
  let neighbours = numbers.filter(number => {
    // This checks if the number is one line above or below our symbol
    if (Math.abs(number.line_index - symbol.line_index) === 1) {
      // This checks if our symbol overlaps the number
      if (symbol.start_index - 1 <= number.end_index && symbol.end_index + 1 >= number.start_index) {
        // If everything checks we return the number
        return number;
      }
    } else if (number.line_index === symbol.line_index) { // If the number is on the same line
      // Check if the number is just before or just after the symbol
      if (number.end_index === symbol.start_index - 1 || number.start_index === symbol.end_index + 1) {
        // Same thing as above, we return the number because it passes all the checks
        return number;
      }
    }
  });

  // If symbol has neighbours
  if (neighbours.length) {
    // Add the neighbours to the solution variable
    solution += neighbours.map(number => parseInt(number.value)).reduce((acc, value) => acc += value);
  }
});

console.log(solution);
