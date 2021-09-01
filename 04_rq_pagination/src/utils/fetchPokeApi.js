const pokeApiURL = 'https://pokeapi.co/api/v2/'

const fetchPokeAPI = async ({ queryKey }) => {
    const offset = 20 * queryKey[1]
    const response = await fetch(`${pokeApiURL}pokemon?offset=${offset}`)

    if (!response.ok) {
        throw new Error('Unable to fetch data')
    }

    return response.json()
}

export default fetchPokeAPI
