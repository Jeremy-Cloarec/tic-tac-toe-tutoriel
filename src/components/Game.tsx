import Board from "./Board";
import { useState } from "react";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares: string[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1)
    }

    function jumpTo(nextMove: number, description: string) {
        description = "hello"
        setCurrentMove(nextMove)

    }

    const moves = history.map((_, move) => {
        //setLiCurrentMove(false)
        let description: string;
        let liCurrentMove: boolean = false;

        if (move > 0) {
            description = `Go to move #${move}`
        } else {
            description = 'Go to game start'
        }

        if (move === currentMove && move > 0) {
            description = `You are at move #${move}`
            liCurrentMove = true
        } else if(move === currentMove){
            description = "Go to game start";
            liCurrentMove = true;
        }

        return (
            <li key={move}>
                {!liCurrentMove ?
                    (<button onClick={() => jumpTo(move, description)}> {description}</button>)
                    :
                    (<p className="font-semibold">{description}</p>)}
            </li>
        )
    })

    return (
        <>
            <div>
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
            </div>
            <div>
                <ol>{moves}</ol>
            </div>
        </>
    )
}