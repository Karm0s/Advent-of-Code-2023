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
    }
    else {

      if (number_str) {
        let is_neighbour_symbol = false;

        let start_index = char_index - number_str.length - 1;
        if (start_index > 0) {
          let left_char = line[start_index];
          if (left_char !== '.' && left_char !== '\n') {
            is_neighbour_symbol = true;
          }
        } else {
          start_index = 0;
        }

        let end_index = char_index;
        if (end_index < line.length) {
          let right_char = line[char_index];
          if (right_char !== '.' && right_char !== '\n') {
            is_neighbour_symbol = true;
          }
        } else {
          end_index = char_index - 1;
        }

        for (let i_lookup = start_index; i_lookup <= end_index; i_lookup++) {
          if (line_index - 1 >= 0) {
            let top_char = lines[line_index - 1][i_lookup];
            if (top_char !== '.' && top_char !== '\n') {
              is_neighbour_symbol = true;
            }
          }
          if (line_index + 1 < lines.length - 1) {
            let bottom_char = lines[line_index + 1][i_lookup];
            if (bottom_char !== '.' && bottom_char !== '\n') {
              is_neighbour_symbol = true;
            }
          }
        }

        if (is_neighbour_symbol) {
          solution += parseInt(number_str);
        }
        number_str = '';
      }
    }


  };
};

console.log(solution);
