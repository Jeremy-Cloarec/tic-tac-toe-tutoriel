import calculateWinner from "../utils/calculateWinner";

interface StatusProps {
    squares: string[];
    xIsNext: boolean;
}
export default function Status({ squares, xIsNext }: StatusProps) {
    //winner: stock winner name
    //status: define winner if it exist, as if it show the next player
    const winner = calculateWinner(squares)
    console.log(winner);

    let status;
    console.log(squares);
    

    if (winner) {
        status = "Le gagnant est : " + winner.winner;
    } else if (squares.every(square => square)) {
        status = "Match null !"
    }
    else {
        status = "Prochain joueur : " + (xIsNext ? "X" : "O");
    }

    return <div>{status}</div>
}