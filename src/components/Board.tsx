import Square from "./Square";
import calculateWinner from "../utils/calculateWinner";

interface BoardProp {
    xIsNext: boolean;
    squares: string[];
    onPlay: (nextSquares: string[]) => void
}

export default function Board({ xIsNext, squares, onPlay }: BoardProp) {
    console.log(squares);

    function handleClick(i: number) {
        //early return if te square is filled
        if (squares[i] || calculateWinner(squares)) return

        //copy of the array
        const nextSquares = squares.slice();
        xIsNext ? nextSquares[i] = "X" : nextSquares[i] = "O";
        onPlay(nextSquares)
    }

    const winner = calculateWinner(squares)
    let status;

    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

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