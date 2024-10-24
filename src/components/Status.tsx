import calculateWinner from "../utils/calculateWinner";

interface StatusProps {
    squares: string[];
    xIsNext: boolean;
}
export default function Status({
    squares,
    xIsNext,
}: StatusProps) {
    //winner: stock winner name
    //status: define winner if it exist, as if it show the next player
    const winner = calculateWinner(squares)
    let status;

    if (winner) {
        // Utiliser JSX pour afficher le message du gagnant
        status = (
            <>
                Le gagnant est : <span className="text-3xl">{winner.winner}</span>
            </>
        );
    } else if (squares.every(square => square)) {
        status = "Match nul !";
    } else {
        // Utiliser JSX pour afficher le prochain joueur
        status = (
            <>
                Prochain joueur : <span className="text-3xl">{xIsNext ? "🎃" : "🦇"}</span>
            </>
        );
    }

    return (
        <div>
            <p className="font-alice text-center py-16 text-lg">
                {status}
            </p>
        </div>
    )
}