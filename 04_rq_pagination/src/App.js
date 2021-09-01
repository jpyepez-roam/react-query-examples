import { useState } from 'react'
import { Button } from 'react-bootstrap'
import './App.css'
import PokeIndex from './components/PokeIndex'
import usePokemon from './hooks/usePokemon'

function App() {
    const [page, setPage] = useState(0)
    const query = usePokemon(['pokemonPage', page])

    return (
        <div className="App">
            <main>
                <h1 className="mt-5">Pokemon Index</h1>
                <PokeIndex query={query} />

                <div className="index-control">
                    <Button
                        variant="primary"
                        onClick={() => setPage((prev) => prev - 1)}
                        disabled={page === 0}
                    >
                        Previous Page
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Next Page
                    </Button>
                </div>
            </main>
        </div>
    )
}

export default App
