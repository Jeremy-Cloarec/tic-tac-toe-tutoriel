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
            description = `Aller au mouvement #${move}`
            if (position) {
                positionString += `ligne ${position.row}, colonne ${position.col}`;
            }

        } else {
            description = 'Aller au début du jeu'
        }

        if (move === currentMove && move > 0) {
            description = `Tu es au mouvement #${move}`
            liCurrentMove = true

        } else if (move === currentMove) {
            description = "Tu es au début du jeu";
            liCurrentMove = true;
        }

        return (
            <li key={move}>
                {!liCurrentMove ?
                    (
                        <button
                            onClick={() => jumpTo(move)}
                            className="hover:bg-orangeHover transition-colors duration-400 py-3 px-3 w-full rounded-lg"
                        >
                            <p className="text-lg">{description}</p>
                            <p className="text-brownLight">{positionString}
                            </p>
                        </button>
                    )
                    :
                    (
                        <div className="bg-orangeLight py-3 px-3 w-full rounded-lg text-center">
                            <p className="text-lg">{description}</p>
                            <p className="text-brownLight">{positionString}</p>
                        </div>
                    )
                }
            </li>
        )
    })

    if (reversed) moves = moves.reverse()
    !reversed ? src = sort : src = sortReverse

    return (
        <div className="relative min-w-56 max-w-80">
            <div className="absolute top-0 right-[-32px] md:right-0 md:top-[-32px]">
                <button
                    onClick={() => setReversed(reversed = !reversed)}>
                    <img
                        src={src}
                        alt="sort logo"
                    />
                </button>
            </div>
            <ul className="font-alice flex flex-col gap-1">{moves}</ul>
        </div>
    )
}