import './App.css'
import PokeCard from './components/PokeCard/PokeCard'
import { ReactQueryDevtools } from 'react-query/devtools'
import PokeForm from './components/PokeForm/PokeForm'
import { useEffect, useState } from 'react'
import usePokemon from './hooks/usePokemon'
import { useQueries } from 'react-query'
import fetchPokeAPI from './utils/fetchPokeApi'

function App() {
    const [pokemonId, setPokemonId] = useState(1)
    const [randomIndices, setRandomIndices] = useState([])

    const query = usePokemon([
        'pokemon',
        { endpoint: 'pokemon', id: pokemonId },
    ])

    const pokemonType = query.data?.types[0].type.name
    const typeQuery = usePokemon(
        ['suggestedByType', { endpoint: 'type', id: pokemonType }],
        {
            enabled: !!query.data,
        }
    )

    // get random indices upon completing dependent query
    useEffect(() => {
        if (typeQuery.isSuccess) {
            const randNums = Array.from({ length: 3 }, (_) =>
                Math.floor(20 * Math.random())
            )
            setRandomIndices(randNums)
        }
    }, [typeQuery.isSuccess])

    const queries = randomIndices.map((id, idx) => {
        const pokeName = typeQuery.data?.pokemon[id]?.pokemon.name
        return {
            queryKey: [
                `suggested_${idx}`,
                {
                    endpoint: 'pokemon',
                    id: pokeName,
                },
            ],
            queryFn: fetchPokeAPI,
            enabled: !!typeQuery.data,
        }
    })

    const suggestedPokemon = useQueries(queries)

    return (
        <div className="App">
            <div className="main-container">
                <div>
                    <PokeForm setId={setPokemonId} />
                    <PokeCard {...query} />
                </div>

                <div className="flex-col">
                    <h2>Suggested Pokemon</h2>
                    <div className="flex-row">
                        {!!typeQuery.data &&
                            suggestedPokemon.map((query, idx) => (
                                <PokeCard {...query} key={idx} />
                            ))}
                    </div>
                </div>
            </div>
            <ReactQueryDevtools />
        </div>
    )
}

export default App
