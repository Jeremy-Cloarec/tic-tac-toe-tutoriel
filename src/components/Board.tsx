import Square from "./Square";
import calculateWinner from "../utils/calculateWinner";

interface BoardProp {
    xIsNext: boolean;
    squares: string[];
    onPlay: (nextSquares: string[]) => void
}

export default function Board({ xIsNext, squares, onPlay }: BoardProp) {
    console.log( squares);

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

    const squaresRendered = squares.map((value, index) => (
        <li key={index}>
            <Square value={value} onSquareClick={() => handleClick(index)} />
        </li>
    ));

    return (
        <>
            <div className="mb-3">{status}</div>
            <ul className="grid grid-cols-3 gap-3">{squaresRendered}</ul>
        </>
    )
}