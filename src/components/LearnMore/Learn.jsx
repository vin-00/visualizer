
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

export default function Learn(){
    return (
        <>
        
        <Accordion style={{marginTop : "40px"}}>
            <AccordionSummary
            expandIcon={<i className="fa-solid fa-caret-down"></i>}
            aria-controls="panel2-content"
            id="panel2-header"
            >
            <Typography sx={{fontSize:'25px' }}>NQueen</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            The N-Queens problem is a classic combinatorial problem in the field of computer science and mathematics. The challenge is to place N chess queens on an N×N chessboard so that no two queens threaten each other. This means that no two queens can share the same row, column, or diagonal.

            <br />
            The problem was first introduced by the chess player Max Bezzel in 1848. It gained prominence when it was later popularized by the famous mathematician Carl Friedrich Gauss in the 19th century. Over the years, the problem has evolved into various forms and sizes, leading to extensive research and numerous solutions.
            </Typography>
            </AccordionDetails>
        </Accordion>

        <Accordion>
            <AccordionSummary
            expandIcon={<i className="fa-solid fa-caret-down"></i>}
            aria-controls="panel2-content"
            id="panel2-header"
            
            >
            <Typography sx={{fontSize:'25px' }} >Sudoku Solver</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            Solving a Sudoku puzzle involves filling a 9×9 grid so that each column, each row, and each of the nine 3×3 subgrids contain all digits from 1 to 9 exactly once. Various algorithms can solve Sudoku puzzles, ranging from simple trial-and-error techniques to more sophisticated methods. Here, we have described the Backtracking algorithm.
            
            <br />
            <br />
            The Backtracking algorithm is a depth-first search technique that tries to build a solution incrementally by placing numbers in empty cells and checking if they lead to a valid solution. If a conflict is found, the algorithm backtracks and tries a different number.
            </Typography>
            </AccordionDetails>
        </Accordion>

        <Accordion>
            <AccordionSummary
            expandIcon={<i className="fa-solid fa-caret-down"></i>}
            aria-controls="panel2-content"
            id="panel2-header"
            >
            <Typography sx={{fontSize:'25px' }}>Tower of Hanoi</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            The Tower of Hanoi is a classic mathematical puzzle involving three rods and a number of disks of different sizes. The objective is to move the entire stack of disks from one rod to another, following these rules:
            <br />
            1. Only one disk can be moved at a time.
            <br />
            2. Each move consists of taking the top disk from one of     the stacks and placing it on top of another stack or an empty rod.
            <br />
            3. No disk may be placed on top of a smaller disk.

            <br />
            <br />
            The solution to the Tower of Hanoi puzzle is recursive. The idea is to move 𝑛−1 disks from the source rod to an auxiliary rod, move the nth disk to the target rod, and then move the n−1 disks from the auxiliary rod to the target rod.

            </Typography>
            </AccordionDetails>
        </Accordion>

        </>
    )
}