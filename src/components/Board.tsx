import Square from "./Square";
import calculateWinner from "../utils/calculateWinner";

interface BoardProp {
    xIsNext: boolean;
    squares: string[];
    onPlay: (nextSquares: string[]) => void
}

export default function Board({ xIsNext, squares, onPlay }: BoardProp) {
    /*
    handleClick: when user click on one of the squares
    => if square have a value, return
    => if calculateWinner return a value, return
    => define a copy of the prop array
    => add value to the clicked element of this copy : "X" or "O" according to the xIsNext value
    => call onPlay function with nextSquares as argument
    */
    function handleClick(i: number) {
        if (squares[i] || calculateWinner(squares)) return
        const nextSquares = squares.slice();
        xIsNext ? nextSquares[i] = "X" : nextSquares[i] = "O";
        onPlay(nextSquares)
    }

    /*
    winner: stock winner name
    status: define winne rif it exist, as if it show the next player
    */
    const winner = calculateWinner(squares)
    let status;

    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    /* 
    squaresRendered: a tow dimensionnal array makes with the prop squares
    it use double for loop. This is how it work:

    __________0________|_________1_______|________2________
    [0x3]+0|0x3+1|0x3+2|1x3+0|1*3+1|1*3+2|2*3+0|2*3+1|2*3+2
    =0     |=1   |=2   |=3   |=4   |=5   |=6   |=7   |=8 
     */

    const squaresRendered = [];
    for (let i = 0; i < 3; i++) {
        const row = [];
        for (let j = 0; j < 3; j++) {
            row.push(squares[i * 3 + j]);
        }
        squaresRendered.push(row);
    }

    console.log(squaresRendered);

    return (
        <>
            <div className="mb-3">{status}</div>
            <ul className="flex flex-col gap-1 bg-slate-900">
                {squaresRendered.map((row, rowIndex) => (
                    <li key={rowIndex}>
                        <ul className="flex gap-1">
                            {row.map((value, colIndex) => {
                                const index = rowIndex * 3 + colIndex;
                                return (
                                    <li key={colIndex}>
                                        <Square value={value} onSquareClick={() => handleClick(index)} />
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                ))}
            </ul>
        </>
    )
}