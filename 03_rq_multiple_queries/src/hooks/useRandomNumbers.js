import { useState, useEffect } from 'react'

const useRandomNumbers = (query) => {
    const [randomIndices, setRandomIndices] = useState([])

    useEffect(() => {
        if (query.isSuccess) {
            const randNums = Array.from({ length: 3 }, (_) =>
                Math.floor(20 * Math.random())
            )
            setRandomIndices(randNums)
        }
    }, [query.isSuccess])

    return randomIndices
}

export default useRandomNumbers
