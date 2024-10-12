import calculateWinner from "../utils/calculateWinner";

interface StatusProps {
    squares: string[];
    xIsNext: boolean;
}
export default function Status({ squares, xIsNext }: StatusProps) {
    //winner: stock winner name
    //status: define winne rif it exist, as if it show the next player
    const winner = calculateWinner(squares)
    let status;

    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return <div className="mb-3">{status}</div>
}