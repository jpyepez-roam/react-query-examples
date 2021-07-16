import { Card, Alert, Spinner } from 'react-bootstrap'
import PokeCardContent from './PokeCardContent'
import { useQuery } from 'react-query'

const pokemonId = 1
const pokeApiURL = 'https://pokeapi.co/api/v2/pokemon/'

const fetchPokemon = async () => {
    const response = await fetch(`${pokeApiURL}${pokemonId}`)

    if (!response.ok) {
        throw new Error('Unable to fetch data')
    }

    return response.json()
}

const PokeCard = () => {
    const { data, isLoading, isError, error } = useQuery(
        'pokemon',
        fetchPokemon
    )

    return (
        <>
            {isLoading ? (
                <Spinner animation="border" variant="primary" />
            ) : isError ? (
                <Alert variant="danger">{error.toString()}</Alert>
            ) : (
                <Card className="d-flex flex-col justify-content-center align-items-center">
                    <PokeCardContent {...data}></PokeCardContent>
                </Card>
            )}
        </>
    )
}

export default PokeCard
