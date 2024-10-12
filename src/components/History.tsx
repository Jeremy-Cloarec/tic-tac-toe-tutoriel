interface HistoryProp {
    history: string[][];
    currentMove: number;
    jumpTo: (move: number) => void
}
export default function History({ history, currentMove, jumpTo }: HistoryProp) {
    //Show history of each move. OnClick, update current move
    const moves = history.map((_, move) => {
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
            description = "Go to game start";
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
    return (
        <ol>{moves}</ol>
    )
}