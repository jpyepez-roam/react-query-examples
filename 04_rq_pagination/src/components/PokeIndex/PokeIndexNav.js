import React from 'react'
import { Button, Card } from 'react-bootstrap'

const PokeIndexNav = ({ currentPage, onPageChange }) => {
    return (
        <Card className="p-4 index-nav mx-5 my-4">
            <Button
                variant="primary"
                onClick={() => onPageChange((prev) => prev - 1)}
                disabled={currentPage === 0}
            >
                Previous Page
            </Button>
            <Button
                variant="primary"
                onClick={() => onPageChange((prev) => prev + 1)}
            >
                Next Page
            </Button>
        </Card>
    )
}

export default PokeIndexNav
