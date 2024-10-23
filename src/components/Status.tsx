import calculateWinner from "../utils/calculateWinner";

interface StatusProps {
    squares: string[];
    xIsNext: boolean;
    choosenOponent: string;
    setChoosenOponent: (value: string) => void;
    resetGame: () => void;
}
export default function Status({
    squares,
    xIsNext,
    choosenOponent,
    setChoosenOponent,
    resetGame
}: StatusProps) {
    //winner: stock winner name
    //status: define winner if it exist, as if it show the next player
    const winner = calculateWinner(squares)
    let status;

    if (winner) {
        status = "Le gagnant est : " + winner.winner;
    } else if (squares.every(square => square)) {
        status = "Match null !"
    }
    else {
        status = "Prochain joueur : " + (xIsNext ? "X" : "O");
    }

    return (
        <div>
            <p>
                {status}
            </p>
            <select
                name="level"
                id="level"
                className="text-black"
                value={choosenOponent}
                onChange={e => {
                    setChoosenOponent(e.target.value)
                    resetGame()
                }}
            >
                <option value="without-oponent">
                    Sans adversaire
                </option>
                <option value="hasard">
                    Contre le hasard
                </option>
            </select>
        </div>
    )
}