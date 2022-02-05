import {useEffect, useState} from 'react'

export default (toHydrate) => {
    const [hydrate, setHydrate] = useState(null)

    if (typeof body == 'function') {
        useEffect(() => {
            setHydrate(toHydrate)
        }, [])
    }
    else {
        useEffect(() => {
            setHydrate(toHydrate)
        }, [])
    }

    return hydrate
}