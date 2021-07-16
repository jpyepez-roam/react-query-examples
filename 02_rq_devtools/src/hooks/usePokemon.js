import { useQuery } from 'react-query'

const pokeApiURL = 'https://pokeapi.co/api/v2/pokemon/'

const fetchPokemonById = async ({ queryKey }) => {
    const response = await fetch(`${pokeApiURL}${queryKey[1]}`)

    if (!response.ok) {
        throw new Error('Unable to fetch data')
    }

    return response.json()
}

const usePokemon = (id) => {
    const query = useQuery(['pokemon', id], fetchPokemonById)

    return { ...query }
}

export default usePokemon
