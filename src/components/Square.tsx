interface SquareProp {
    value: | null | string;
    styleSquare: string;
    onSquareClick: () => void;
}

export default function Square({ value, onSquareClick, styleSquare }: SquareProp) {
    return (
        <button
            className={styleSquare}
            onClick={onSquareClick}
        >
            {value}
        </button>
    )
}