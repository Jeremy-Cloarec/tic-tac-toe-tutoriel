interface SquareProp {
    value: null | string;
    styleSquare: string;
    onSquareClick: () => void;
    position?: { row: number; col: number };
}

export default function Square({ value, onSquareClick, styleSquare, position }: SquareProp) {
    // Détermine si la case est vide ou occupée
    const isEmpty = value === null;

    // Crée un texte descriptif pour la position
    const positionText = position
        ? `case ligne ${position.row + 1}, colonne ${position.col + 1}`
        : 'case du morpion';

    // Crée un texte descriptif pour l'état de la case
    const statusText = isEmpty
        ? 'vide'
        : `occupée par ${value === "🎃" ? 'une citrouille' : 'une chauve-souris'}`;

    return (
        <button
            role="gridcell"
            aria-label={`${positionText}, ${statusText}`}
            aria-disabled={!isEmpty}
            tabIndex={0}
            className={styleSquare}
            onClick={onSquareClick}
            title={`${positionText}, ${statusText}`}
        >
            {value}
        </button>
    )
}