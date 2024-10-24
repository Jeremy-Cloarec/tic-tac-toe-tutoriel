import Square from "./Square";
import calculateWinner from "../utils/calculateWinner";
import { useEffect, useState } from "react";

interface BoardProp {
    xIsNext: boolean;
    squares: string[];
    choosenOponent: string;
    onPlay: (nextSquares: string[], row: number, col: number) => void;
}

export default function Board({ xIsNext, squares, choosenOponent, onPlay }: BoardProp) {
    const winnerInfo = calculateWinner(squares);
    const winnerSquares = winnerInfo?.winnerSquares || []
    const [isAgainstHasard, setIsAgainstHasard] = useState(false)

    const squaresRendered = []
    /*squaresRendered: a tow dimensionnal array makes with the prop squares
    it use double for loop. This is how it work:
    __________0________|_________1_______|________2________
    [0x3]+0|0x3+1|0x3+2|1x3+0|1*3+1|1*3+2|2*3+0|2*3+1|2*3+2
    =0     |=1   |=2   |=3   |=4   |=5   |=6   |=7   |=8 
     */

    let ind = 0
    for (let i = 0; i < 3; i++) {
        const row = [];
        for (let j = 0; j < 3; j++) {
            row.push({ value: squares[i * 3 + j], ind });
            ind++
        }
        squaresRendered.push(row);
    }

    function handleClick(i: number, row: number, col: number) {
        //If the square is already filled or there is a winner, stop
        if (squares[i] || calculateWinner(squares)) return

        //If the player is playing against the computer and it is not his turn, stop
        if (isAgainstHasard) return
        let nextSquares = squares.slice();

        // player play
        nextSquares[i] = xIsNext ? "🎃" : "🦇";

        //record the game
        onPlay(nextSquares, row, col)

        if (choosenOponent === "hasard" && !calculateWinner(nextSquares)) {
            setIsAgainstHasard(true)
        }
    }
    
    useEffect(() => {
        if (isAgainstHasard) {
            setTimeout(() => {
                let nextS = squares.slice();
                const emptySquares = nextS
                    .map((value, index) => (value === null ? index : null))
                    .filter(value => value !== null);

                //If all squares are filled, stop
                if (emptySquares.length === 0) return

                //Pick an empty square
                const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];

                //hasard player play
                nextS[randomIndex] = xIsNext ? "🎃" : "🦇";

                //position calcul
                const row = Math.floor(randomIndex / 3);
                const col = randomIndex % 3;

                setTimeout(() => {
                    //On Play
                    onPlay(nextS, row, col);
                }, 500)

                setIsAgainstHasard(false)
            }, 500)
        }
    }, [isAgainstHasard])


    return (
        <div className="w-full flex justify-center">
            <ul className="flex flex-col gap-0.5 bg-brown w-full p-0.5 min-w-56 max-w-80 md:max-w-none">
                {squaresRendered.map((row, rowIndex) => (
                    <li key={rowIndex} className="w-full">
                        <ul className="flex gap-0.5">
                            {row.map((value, colIndex) => {
                                const index = rowIndex * 3 + colIndex;
                                const isWinnerSquare = winnerSquares.includes(value.ind);
                                const squareStyle = isWinnerSquare
                                    ? "text-5xl flex w-full min-w-6 min-h-6 aspect-square items-center justify-center bg-brown"
                                    : "text-5xl flex w-full min-w-6 min-h-6 items-center justify-center bg-orange aspect-square";
                                return (
                                    <li key={colIndex} className="w-full aspect-square min-w-8 min-h-8">
                                        <Square
                                            value={value.value}
                                            onSquareClick={() => handleClick(index, rowIndex, colIndex)}
                                            styleSquare={squareStyle}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}