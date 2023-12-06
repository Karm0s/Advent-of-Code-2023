# Advent of Code: Day 2 - Solution overview

Problem link: [Aoc Day 2](https://adventofcode.com/2023/day/2)

## Part 1:
This solution uses regular expression to extract the (count, color) pairs and compares them to the given data. If there
is a count that is greater than the maximum for a given color, we set the ```impossible_game``` flag to true. Otherwise, we
add the ```game_id``` to the ```solution``` variable and we move on to the next game.

The regular expression looks like this:
```typescript
const picks_re = /(\d+) (green|red|blue)/g
```
```\d+```: Matches any number of any size.

```green|red|blue```: Matches the colors.

With this expression you are telling the ```matchAll``` function to find any expression begining with a **number** 
and is followed by the word **green**, **red**, or **blue**.

### Full solution code:
https://github.com/Karm0s/Advent-of-Code-2023/blob/8c2761d132b5d9b5b4e5ed91bd4461594e77762e/day-2/solution-part1.ts#L1-L43

## Part 2:
The solution for part 2 uses the same regular expression to extract the (count, color) pairs. To calculate the power
of the game we do the following steps:
1. Sepearate the pairs by color into three arrays.
2. Sort each array from smallest to biggest (using count property) and take the last element.
3. Remove the color property from the three pairs that remained.
4. Reduce the array into one single value by multiplying all the counts together.
5. Add the power to the ```solution``` variable.

6. ### Full solution code:
https://github.com/Karm0s/Advent-of-Code-2023/blob/8c2761d132b5d9b5b4e5ed91bd4461594e77762e/day-2/solution-part2.ts#L1-L38
