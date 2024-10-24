export default function calculateWinner(square: string[]) {
    const lines: number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (square[a] && square[a] === square[b] && square[a] === square[c]) {
            const endGame:{winner:string, winnerSquares: number[]} = {
                winner : square[a],
                winnerSquares : [a, b, c]
            }
            return endGame
        }
    }
    return null
}