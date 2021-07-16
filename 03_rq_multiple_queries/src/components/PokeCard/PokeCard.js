import { Card, Alert, Spinner } from 'react-bootstrap'
import PokeCardContent from './PokeCardContent'

const PokeCard = ({ data, isLoading, isError, error }) => {
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
