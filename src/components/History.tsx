import { useState } from "react";

interface HistoryProp {
    history: string[][];
    currentMove: number;
    jumpTo: (move: number) => void
}
export default function History({ history, currentMove, jumpTo }: HistoryProp) {
    let [reversed, setReversed] = useState(false);
    let src = "";
    //Show history of each move. OnClick, update current move
    let moves = history.map((_, move) => {
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
        } else if (move === currentMove) {
            description = "You are at game start";
            liCurrentMove = true;
        }

        return (
            <li key={move}>
                {!liCurrentMove ?
                    (<button onClick={() => jumpTo(move)}> {description}</button>)
                    :
                    (<p className="font-semibold">{description}</p>)}
            </li>
        )
    })

    if (reversed) moves = moves.reverse()
    !reversed ? src = "../../assets/sort.png" : src = "../../assets/sortReverse.png"

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <h2 className="font-semibold">Historique</h2>
                <button
                    onClick={() => setReversed(reversed = !reversed)}
                    className="bg-white py-1 px-1 rounded-sm">

                    {reversed ? ("") : ("")}

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