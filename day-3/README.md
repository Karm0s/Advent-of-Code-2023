# Advent of Code: Day 3 - Solution Overview
[Problem link](https://adventofcode.com/2023/day/3) 

## Part 1:
As you can see, I made two solutions for **Part 1**. The first solution runs through the content of the file
once and extract numbers and symbols on the go. In my opinion, it was a really bad approach and resulted in
very bad looking code. Also, it's very hard to use this approach to solve **Part 2** of the problem.

The second version on the other hand, extracts all the numbers and symbols into separate arrays using regular
expressions. Then, for each symbols we search its neighbouring numbers from the numbers list.

The solution looks like this:

https://github.com/Karm0s/Advent-of-Code-2023/blob/451a0a7cf6b848df9b778071604fd43809ce023c/day-3/solution-part1-v2.ts#L1-L69

## Part 2:
Writing a solution for this part is very easy using the second approach from part 1. The logic
stays the same, all we need to do is change the regular expression that matches our symbols to match only
the * character. After that, we check for each symbol if it has at least two neighbours and then we multiply 
them together. Finally, we add the result to the solution variable.

https://github.com/Karm0s/Advent-of-Code-2023/blob/451a0a7cf6b848df9b778071604fd43809ce023c/day-3/solution-part2.ts#L1-L2
