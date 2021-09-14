import React from 'react'
import { Card, Spinner } from 'react-bootstrap'

const PokeIndex = ({ query }) => {
    const { isLoading } = query
    const containerClass = isLoading ? 'spinner' : 'index'
    return (
        <Card className={`p-4 mx-5 ${containerClass}-container`}>
            {isLoading ? (
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
