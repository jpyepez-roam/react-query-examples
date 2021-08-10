import './App.css'
import PokeCard from './components/PokeCard/PokeCard'
import { ReactQueryDevtools } from 'react-query/devtools'
import PokeForm from './components/PokeForm/PokeForm'
import { useState } from 'react'
import usePokemon from './hooks/usePokemon'
import { useQueries } from 'react-query'
import fetchPokeAPI from './utils/fetchPokeApi'
import useRandomNumbers from './hooks/useRandomNumbers'

// React Query: Multiple Queries
// This app performs a search using a Pokemon ID and then suggests three Pokemon of the same type.
// This occurs in three steps:

function App() {
    const [pokemonId, setPokemonId] = useState(1)

    // 1. Search for a Pokemon ID (using the PokeForm component)
    const query = usePokemon([
        'pokemon',
        { endpoint: 'pokemon', id: pokemonId },
    ])

    // 2. Get the Pokemon type from the first query and perform
    // another query to find Pokemon of the same type
    const pokemonType = query.data?.types[0].type.name
    const typeQuery = usePokemon(
        ['suggestedByType', { endpoint: 'type', id: pokemonType }],
        {
            enabled: !!query.data,
        }
    )

    // 3. Randomly select three of the received Pokemon from the second query
    // and perform a final query to display three additional PokeCard components
    const randomIndices = useRandomNumbers(typeQuery)

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
