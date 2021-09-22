import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import './App.css'
import PokeIndex from './components/PokeIndex/PokeIndex'
import PokeIndexNav from './components/PokeIndex/PokeIndexNav'
import usePokemonPage from './hooks/usePokemonPage'
import fetchPokeAPIPage from './utils/fetchPokeApiPage'

const useEffectWithPrefetch = (page) => {
    const queryClient = useQueryClient()

    useEffect(() => {
        const nextPage = page + 1
        queryClient.prefetchQuery(['pokemonPage', nextPage], fetchPokeAPIPage)
    }, [page, queryClient])
}

function App() {
    const [page, setPage] = useState(0)
    const query = usePokemonPage(['pokemonPage', page], {
        staleTime: 2000,
    })

    useEffectWithPrefetch(page)

    return (
        <div className="App">
            <main>
                <h1 className="my-4">Pokemon Index</h1>
                <PokeIndex query={query} />
                <PokeIndexNav
                    currentPage={page}
                    onPageChange={setPage}
                ></PokeIndexNav>
            </main>
        </div>
    )
}

export default App
