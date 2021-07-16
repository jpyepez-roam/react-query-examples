import './App.css'
import PokeCard from './components/PokeCard/PokeCard'
import { ReactQueryDevtools } from 'react-query/devtools'
import PokeForm from './components/PokeForm/PokeForm'
import { useState } from 'react'
import usePokemon from './hooks/usePokemon'
import { useQuery } from 'react-query'
import { useEffect } from 'react'

// TODO: delete, duplicated
const pokeApiURL = 'https://pokeapi.co/api/v2/pokemon/'
const fetchPokemonById = async ({ queryKey }) => {
    const response = await fetch(`${pokeApiURL}${queryKey[1]}`)

    if (!response.ok) {
        throw new Error('Unable to fetch data')
    }

    return response.json()
}

// TODO: parallel and dependent queries
// suggest next 3 pokemon
function App() {
    const [pokemonId, setPokemonId] = useState(1)
    const query = usePokemon(pokemonId)

    const depQuery = useQuery(['suggested', pokemonId + 10], fetchPokemonById, {
        enabled: !!query.data,
    })

    useEffect(() => {
        console.log(depQuery)
    }, [depQuery])

    return (
        <div className="App">
            <div className="main-container">
                <PokeForm setId={setPokemonId} />
                <PokeCard {...query} />
                <ReactQueryDevtools />
            </div>
        </div>
    )
}

export default App
