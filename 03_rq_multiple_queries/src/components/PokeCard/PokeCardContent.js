import { Card } from 'react-bootstrap'

const PokeCardContent = ({ name, sprites }) => {
    return (
        <Card.Body>
            <Card.Img
                style={{ minWidth: '200px' }}
                src={sprites.front_default}
            />
            <Card.Title className="text-capitalize text-center">
                {name}
            </Card.Title>
        </Card.Body>
    )
}

export default PokeCardContent
