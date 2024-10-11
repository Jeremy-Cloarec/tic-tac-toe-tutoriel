interface SquareProp {
    value: | null | string;
    onSquareClick: () => void
}

export default function Square({ value, onSquareClick }: SquareProp) {
    return (
        <button
            className="font-bold flex w-16 h-16 items-center justify-center bg-white text-slate-900"
            onClick={onSquareClick}
        >
            {value}
        </button>
    )
}