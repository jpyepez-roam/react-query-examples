import { useQuery } from 'react-query'
import fetchPokeAPIPage from '../utils/fetchPokeApiPage'

const usePokemonPage = (queryKey, config = {}) => {
    const query = useQuery(queryKey, fetchPokeAPIPage, config)

    return { ...query }
}

export default usePokemonPage
