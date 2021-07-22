import { useQuery } from 'react-query'

const pokeApiURL = 'https://pokeapi.co/api/v2/'

const fetchPokeAPI = async ({ queryKey }) => {
    const { endpoint, id } = queryKey[1]
    const response = await fetch(`${pokeApiURL}${endpoint}/${id}`)

    if (!response.ok) {
        throw new Error('Unable to fetch data')
    }

    return response.json()
}

const usePokemon = (queryKey, config = {}) => {
    const query = useQuery(queryKey, fetchPokeAPI, config)

    return { ...query }
}

export default usePokemon
