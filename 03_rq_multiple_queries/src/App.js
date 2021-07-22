import './App.css'
import PokeCard from './components/PokeCard/PokeCard'
import { ReactQueryDevtools } from 'react-query/devtools'
import PokeForm from './components/PokeForm/PokeForm'
import { useState } from 'react'
import usePokemon from './hooks/usePokemon'

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

    // TODO: transform to useQueries
    const sug1 = typeQuery.data?.pokemon[4].pokemon.name
    const sug2 = typeQuery.data?.pokemon[5].pokemon.name
    const sug3 = typeQuery.data?.pokemon[6].pokemon.name

    const suggested1 = usePokemon(['sug1', { endpoint: 'pokemon', id: sug1 }], {
        enabled: !!typeQuery.data,
    })
    const suggested2 = usePokemon(['sug2', { endpoint: 'pokemon', id: sug2 }], {
        enabled: !!typeQuery.data,
    })
    const suggested3 = usePokemon(['sug3', { endpoint: 'pokemon', id: sug3 }], {
        enabled: !!typeQuery.data,
    })

    return (
        <div className="App">
            <div className="main-container">
                <PokeForm setId={setPokemonId} />
                <PokeCard {...query} />
                {suggested1.data && <PokeCard {...suggested1} />}
                {suggested2.data && <PokeCard {...suggested2} />}
                {suggested3.data && <PokeCard {...suggested3} />}
                <ReactQueryDevtools />
            </div>
        </div>
    )
}

export default App
