import { useQuery } from 'react-query'
import fetchPokeAPI from '../utils/fetchPokeApi'

const usePokemon = (queryKey, config = {}) => {
    const query = useQuery(queryKey, fetchPokeAPI, config)

    return { ...query }
}

export default usePokemon
