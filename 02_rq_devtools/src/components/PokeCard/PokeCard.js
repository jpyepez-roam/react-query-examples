import { Card, Alert, Spinner } from 'react-bootstrap'
import usePokemon from '../../hooks/usePokemon'
import PokeCardContent from './PokeCardContent'

const PokeCard = () => {
    const { data, isLoading, isError, error } = usePokemon(100)

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
