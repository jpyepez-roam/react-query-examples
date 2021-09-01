import { Card, Alert, Spinner } from 'react-bootstrap'
import PokeCardContent from './PokeCardContent'

const PokeCard = ({ data, isLoading, isError, error }) => {
    return (
        <>
            <Card className="d-flex flex-col justify-content-center align-items-center">
                {isLoading ? (
                    <div className="p-5">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : isError ? (
                    <Alert variant="danger">{error.toString()}</Alert>
                ) : (
                    <PokeCardContent {...data}></PokeCardContent>
                )}
            </Card>
        </>
    )
}

export default PokeCard
