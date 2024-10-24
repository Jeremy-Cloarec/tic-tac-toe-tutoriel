import { useState } from "react";
import Board from "./Board";
import History from "./History";
import Status from "./Status";
import Opponent from "./Opponent";

export default function Game() {
    // A double array with nine element = null
    const [history, setHistory] = useState([Array(9).fill(null)]);
    //show current move with inital value = 0 (beginning of the part)
    const [currentMove, setCurrentMove] = useState(0);
    const [positions, setposition] = useState<{ row: number, col: number }[]>([]);
    const [choosenOponent, setChoosenOponent] = useState("without-oponent");

    //true if current move is even
    const xIsNext: boolean = currentMove % 2 === 0;
    //array with currentMove index    
    const currentSquares = history[currentMove];

    //function to update history array and current move
    //it call when user click on a square and call handleClick (in Board component)
    //nextHistoty copy history array, from 0 to currentMove + 1 and updated history with it
    function handlePlay(nextSquares: string[], row: number, col: number) {
        const newPosition = { row, col };
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        const nextPosition = [...positions.slice(0, currentMove), newPosition];

        setHistory(nextHistory);
        setposition(nextPosition);
        setCurrentMove(nextHistory.length - 1);
    }

    //updated current move when click on element history
    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    //reset game
    function resetGame() {
        setCurrentMove(0);
        setHistory([Array(9).fill(null)]);
        setposition([{ row: 0, col: 0 }]);
    }

    return (
        <>
            <nav className="flex gap-8 justify-between  items-center">
                <h1 className='text-3xl text-center font-creepster'>Morpion</h1>
                <Opponent
                    choosenOponent={choosenOponent}
                    resetGame={resetGame}
                    setChoosenOponent={setChoosenOponent}
                />
            </nav>
            <div className="flex flex-col justify-center">
                <Status
                    squares={currentSquares}
                    xIsNext={xIsNext}
                />
                <div className="flex flex-col gap-5">
                    <Board
                        xIsNext={xIsNext}
                        squares={currentSquares}
                        choosenOponent={choosenOponent}
                        onPlay={handlePlay}
                    />
                    <History
                        history={history}
                        currentMove={currentMove}
                        jumpTo={jumpTo}
                        positions={positions}
                    />
                </div>
            </div>
        </>
    )
}