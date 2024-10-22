import Square from "./Square";
import calculateWinner from "../utils/calculateWinner";

interface BoardProp {
    xIsNext: boolean;
    squares: string[];
    choosenOponent: string;
    onPlay: (nextSquares: string[], row: number, col: number) => void;
}

export default function Board({ xIsNext, squares, choosenOponent, onPlay }: BoardProp) {
    const winnerInfo = calculateWinner(squares || Array(9).fill(null));;
    const winnerSquares = winnerInfo?.winnerSquares || []

    const squaresRendered = []
    /*squaresRendered: a tow dimensionnal array makes with the prop squares
    it use double for loop. This is how it work:
    __________0________|_________1_______|________2________
    [0x3]+0|0x3+1|0x3+2|1x3+0|1*3+1|1*3+2|2*3+0|2*3+1|2*3+2
    =0     |=1   |=2   |=3   |=4   |=5   |=6   |=7   |=8 
     */

    let ind = 0
    for (let i = 0; i < 3; i++) {
        const row = [];
        for (let j = 0; j < 3; j++) {
            row.push({ value: squares[i * 3 + j], ind });
            ind++
        }
        squaresRendered.push(row);
    }

    /*
    handleClick: when user click on one of the squares
    => if square have a value, return
    => if calculateWinner return a value, return
    => define a copy of the prop array
    => add value to the clicked element of this copy : "X" or "O" according to the xIsNext value
    => call onPlay function with nextSquares as argument
    */
    function handleClick(i: number, row: number, col: number) {
        if (squares[i] || calculateWinner(squares)) return
        let nextSquares = squares.slice();

        // player play
        nextSquares[i] = xIsNext ? "X" : "O";

        //record the game
        onPlay(nextSquares, row, col)

        if (choosenOponent === "hasard" && !calculateWinner(nextSquares)) {
            setTimeout(() => {
                playingHasard(nextSquares)
            }, 500)
        }
    }

    function playingHasard(nextS: string[]) {

        //filtering empty squares
        const emptySquares = nextS
            .map((value, index) => (value === null ? index : null))
            .filter(value => value !== null);

        //If all squares are filled, stop
        if (emptySquares.length === 0) return

        //Pick an empty square
        const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];

        //hasard player play
        nextS[randomIndex] = xIsNext ? "0" : "X";

        //position calcul
        const row = Math.floor(randomIndex / 3);
        const col = randomIndex % 3;
        //On Play
        onPlay(nextS, row, col);
    }
    


    return (
        <>
            <ul className="flex flex-col gap-1 bg-slate-900">
                {squaresRendered.map((row, rowIndex) => (
                    <li key={rowIndex}>
                        <ul className="flex gap-1">
                            {row.map((value, colIndex) => {
                                const index = rowIndex * 3 + colIndex;
                                const isWinnerSquare = winnerSquares.includes(value.ind);
                                const squareStyle = isWinnerSquare
                                    ? "font-bold flex w-16 h-16 items-center justify-center bg-orange-200 text-slate-900"
                                    : "font-bold flex w-16 h-16 items-center justify-center bg-white text-slate-900";
                                return (
                                    <li key={colIndex}>
                                        <Square
                                            value={value.value}
                                            onSquareClick={() => handleClick(index, rowIndex, colIndex)}
                                            styleSquare={squareStyle}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                ))}
            </ul>
        </>
    )
}