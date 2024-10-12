import Board from "./Board";
import { useState } from "react";
import History from "./History";
import Status from "./Status";

export default function Game() {
    // A double array with nine element = null
    const [history, setHistory] = useState([Array(9).fill(null)]);
    //show current move with inital value = 0 (beginning of the part)
    const [currentMove, setCurrentMove] = useState(0);
    //true if current move is even
    const xIsNext: boolean = currentMove % 2 === 0;
    //array with currentMove index    
    const currentSquares = history[currentMove];

    //function to update history array and current move
    //it call when use click on on square and call handleClick (in Board component)
    //nextHistoty copy history array, from 0 to currentMove + 1 and updated history with it
    function handlePlay(nextSquares: string[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        console.log(nextHistory);

        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1)
    }

    //updated current move when click on element history
    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove)
    }

    return (
        <>
            <div className="flex flex-col gap-4 ">
                <Status
                    squares={currentSquares}
                    xIsNext={xIsNext}
                />
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
                <History
                    history={history}
                    currentMove={currentMove}
                    jumpTo={jumpTo}
                />
            </div>
        </>
    )
}