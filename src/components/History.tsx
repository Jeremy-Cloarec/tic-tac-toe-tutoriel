import { useState } from "react";
import sort from '../assets/sort.png';
import sortReverse from '../assets/sortReverse.png';

interface HistoryProp {
    history: string[][];
    currentMove: number;
    positions: { row: number, col: number }[]
    jumpTo: (move: number) => void;
}

export default function History({ history, currentMove, positions, jumpTo }: HistoryProp) {
    let [reversed, setReversed] = useState(false);
    let src = "";


    //Show history of each move. OnClick, update current move
    let moves = history.map((_, move) => {
        let description: string;
        let positionString: string = "";
        let liCurrentMove: boolean = false;
        const position = positions[move - 1]

        if (move > 0) {
            description = `Go to move #${move}`
            if (position) {
                positionString += `position : row: ${position.row}, col: ${position.col})`;
            }

        } else {
            description = 'Go to game start'
        }

        if (move === currentMove && move > 0) {
            description = `You are at move #${move}`
            liCurrentMove = true

            // if (position) {
            //     positionString += ` (row: ${position.row}, col: ${position.col})`;
            // }

        } else if (move === currentMove) {
            description = "You are at game start";
            liCurrentMove = true;
        }

        return (
            <li key={move}>
                {!liCurrentMove ?
                    (<div>
                        <button onClick={() => jumpTo(move)}>
                            <p>{description}</p>
                        </button>
                        <p className="text-sm">{positionString}</p>
                    </div>
                    )
                    :
                    (<div>
                        <p className="font-semibold">{description}</p>
                        <p className="text-sm">{positionString}</p>
                    </div>
                    )
                }

            </li>
        )
    })



    if (reversed) moves = moves.reverse()
    !reversed ? src = sort : src = sortReverse

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <h2 className="font-semibold">Historique</h2>
                <button
                    onClick={() => setReversed(reversed = !reversed)}
                    className="bg-white py-1 px-1 rounded-sm">
                    <img
                        src={src}
                        alt="sort logo"
                        className="w-4.5"
                    />
                </button>
            </div>
            <ul>{moves}</ul>
        </div>
    )
}