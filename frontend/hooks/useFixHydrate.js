import {useEffect, useState} from 'react'

// crutch to fix "React hydration error"
export default (toHydrate, deps = []) => {
    const [hydrate, setHydrate] = useState(null)

    if (typeof body == 'function') {
        useEffect(() => {
            setHydrate(toHydrate)
        }, deps)
    }
    else {
        useEffect(() => {
            setHydrate(toHydrate)
        }, deps)
    }

    return hydrate
}
