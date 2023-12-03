## Advent of Code: Day 1 - Solution explanation
Problem link: [AoC Day 1](https://adventofcode.com/2023/day/1)

For each line in the input file, the code searches for all the occurencies of these values:
```javascript
const digits = [/[1-9]/g, 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
```
>**NOTE: **/[1-9]/g** is a regular expression that matches all numbers from 1 to 9.

After extracting all the tokens, it sorts them by their position in the line (using the index value).
A number is composed using the first and last elements of the tokens list.
Finally, the number is added to the solution variable to calculate a sum for the whole file.

### Full code:
https://github.com/Karm0s/Advent-of-Code-2023/blob/542f12149fdeb60c3bd75480325ac1a2db8d3eba/day-1/solution.js#L1-L27
