import React from 'react'
import { Card, Spinner } from 'react-bootstrap'

// TODO: turn card into component
// make spinner component
// grid is own component (card content)
const PokeIndex = ({ query }) => {
    return (
        <Card className="p-4 m-5 index-container">
            {query.isLoading ? (
                <Spinner animation="border" variant="primary" />
            ) : (
                query.data?.results.map((res) => (
                    <Card key={res.name} className="p-2 justify-content-center">
                        <Card.Title className="text-center text-capitalize m-0 ">
                            {res.name}
                        </Card.Title>
                    </Card>
                ))
            )}
        </Card>
    )
}

export default PokeIndex
