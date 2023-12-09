// Read the file synchronously
import fs from 'node:fs';

const content: String = fs.readFileSync('./input', 'utf8');

let solution = 0;

const lines = content.slice(0, content.length - 1).split('\n');

for (let line_index = 0; line_index < lines.length; line_index++) {

  const line = lines[line_index];

  let number_str:string= '';

  for (let char_index = 0; char_index <= line.length; char_index++) {
    if (char_index < line.length && !isNaN(parseInt(line[char_index]))) {
      number_str += line[char_index];
      continue;
    }
    else {

      if (number_str) {
        if (char_index === line.length) {
          console.log("REACHED EOL WITH NUMBER");

        }
        let is_neighbour_symbol = false;

        let start_index = char_index - number_str.length - 1;
        console.log(start_index);

        if (start_index < 0) {
          start_index = 0;
        }
        let end_index = char_index;
        if (end_index >= line.length) {
          end_index = char_index - 1;
        }

        if (char_index - number_str.length - 1 >= 0) {
          let left_char = line[char_index - number_str.length - 1];
          if (left_char !== '.' && left_char !== '\n') {
            console.log('LEFT: ' + left_char);
            is_neighbour_symbol = true;
          }
        }
        if (char_index + 1 < line.length - 1) {
          let right_char = line[char_index];
          if (right_char !== '.' && right_char !== '\n') {
            console.log('RIGHT: ' + right_char);
            is_neighbour_symbol = true;
          }
        }

        for (let i_lookup = start_index; i_lookup <= end_index; i_lookup++) {
          if (line_index - 1 >= 0) {
            let top_char = lines[line_index - 1][i_lookup];
            if (top_char !== '.' && top_char !== '\n') {
              console.log('top: ' + top_char);
              is_neighbour_symbol = true;
            }
          }
          if (line_index + 1 < lines.length - 1) {
            let bottom_char = lines[line_index + 1][i_lookup];
            if (bottom_char !== '.' && bottom_char !== '\n') {
              console.log('BOTTOM: ' + bottom_char);
              is_neighbour_symbol = true;
            }
          }
        }

        if (is_neighbour_symbol) {
          console.log('INCLUDED: ' + number_str);

          solution += parseInt(number_str);
        }
        console.log('\n');
        number_str = '';
      }
    }


  };
};

console.log(solution);
