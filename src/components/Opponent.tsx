
interface OpponentProps {  
    choosenOponent: string;
    setChoosenOponent: (value: string) => void;
    resetGame: () => void;
}

export default function Opponent({choosenOponent, setChoosenOponent, resetGame}: OpponentProps) {
    return (
        <select
            name="level"
            id="level"
            className="text-black font-alice"
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
    )
}