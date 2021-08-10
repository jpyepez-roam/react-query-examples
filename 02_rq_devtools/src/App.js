import './App.css'
import PokeCard from './components/PokeCard/PokeCard'
import { ReactQueryDevtools } from 'react-query/devtools'

function App() {
    return (
        <div className="App">
            <div className="main-container">
                <PokeCard></PokeCard>
            </div>
            <ReactQueryDevtools />
        </div>
    )
}

export default App
