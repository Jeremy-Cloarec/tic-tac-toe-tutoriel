import { useEffect } from 'react';
import Select from 'react-select'

interface OpponentProps {
    choosenOponent: string;
    setChoosenOponent: (value: string) => void;
    resetGame: () => void;
}

const options = [
    { value: 'without-oponent', label: 'Sans adversaire' },
    { value: 'hasard', label: 'Contre le hasard' }
]

export default function Opponent({ choosenOponent, setChoosenOponent, resetGame }: OpponentProps) {
    const currentValue = options.find(option => option.value === choosenOponent);

    useEffect(() => {
        if (!choosenOponent) {
            setChoosenOponent(options[0].value)
        }
    }, []);

    return (
        <div className='w-[150px] md:w-auto'>
            <Select
                name="level"
                id="level"
                value={currentValue}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: '#F6AC57',
                        outline: '#7C4200',
                        border: '1px solid #7C4200',
                        boxShadow: state.isFocused ? '0 0 0 1px #2E1901' : 'none',  // Ombre au focus
                        '&:hover': {
                            border: '1px solid #2E1901',  // Bordure au survol
                        },
                        cursor: 'pointer',
                        width: '100%',
                        fontSize: '16px'
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: state.isSelected ?
                            '#FFCD94'
                            :
                            state.isFocused ?
                                '#FCBD76'
                                :
                                '#F6AC57',
                        color: state.isSelected || state.isFocused ?
                            '#2E1901' : '#2E1901',
                        ':active': {
                            backgroundColor: state.isSelected ? '#FFCD94' : '#F6AC57'
                        },
                    }),
                    singleValue: (baseStyles) => ({
                        ...baseStyles,
                        color: '#2E1901',
                    }),
                    dropdownIndicator: (baseStyles) => ({
                        ...baseStyles,
                        color: '#7C4200',  // Couleur de la flèche
                        ':hover': {
                            color: '#2E1901',
                        },
                        paddingRight: '4px',
                        paddingLeft: '1px',
                    }),
                    // Personnalisation du séparateur vertical
                    indicatorSeparator: (baseStyles) => ({
                        ...baseStyles,
                        display: "none"
                    }),
                    menu: (baseStyles) => ({
                        ...baseStyles,
                        backgroundColor: '#F6AC57',
                    }),
                }}
                onChange={(selectedOption) => {
                    if (selectedOption) {
                        setChoosenOponent((selectedOption).value);
                        resetGame();
                    }
                }}
                options={options}
            />
        </div>
    )
}