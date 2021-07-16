import { Button, Card, Form } from 'react-bootstrap'
import './PokeForm.css'

const PokeForm = ({ setId }) => {
    const submitHandler = (event) => {
        event.preventDefault()
        setId(+event.target[0].value)
    }

    return (
        <Card className="px-4 py-3">
            <Form onSubmit={submitHandler}>
                <Form.Label>Pokemon ID</Form.Label>
                <Form.Group className="d-flex flex-row">
                    <Form.Control
                        className="pokemon-id"
                        type="number"
                        min="1"
                        defaultValue="1"
                    />
                    <Button type="submit">Submit</Button>
                </Form.Group>
            </Form>
        </Card>
    )
}

export default PokeForm
