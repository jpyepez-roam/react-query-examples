import './App.css'
import PokeCard from './components/PokeCard/PokeCard'
import { ReactQueryDevtools } from 'react-query/devtools'
import PokeForm from './components/PokeForm/PokeForm'
import { useState } from 'react'
import usePokemon from './hooks/usePokemon'
import { useQueries } from 'react-query'
import fetchPokeAPI from './utils/fetchPokeApi'

// TODO: parallel and dependent queries
// suggest next 3 pokemon
function App() {
    const [pokemonId, setPokemonId] = useState(1)
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
    // console.log(typeQuery.data?.pokemon?.length)

    // TODO: random idx
    const suggested_ids = [4, 6, 8]

    const queries = suggested_ids.map((id, idx) => {
        const pokeName = typeQuery.data?.pokemon[id].pokemon.name
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

                {!!typeQuery.data &&
                    suggestedPokemon.map((query, idx) => (
                        <PokeCard {...query} key={idx} />
                    ))}
            </div>
            <ReactQueryDevtools />
        </div>
    )
}

export default App
