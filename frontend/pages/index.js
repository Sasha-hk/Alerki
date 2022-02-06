import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import profileActions from '../store/actions/profileActions'
import FluidFrame from '../components/frames/FluidFrame'
import Button from '../components/UI/Button/Button'
import Input from '../components/UI/Input/Input'
import useFixHydrate from '../hooks/useFixHydrate'
import { useAuth } from '../provider/AuthProvider'


const Home = () => {
    const {theme, setTheme} = useTheme()

    const {isAuthenticated, register, data} = useAuth()

    console.log(isAuthenticated())
    register()
    
    // const router = useRouter()

    // const dispatch = useDispatch()

    // useEffect(() => {
    //     if (router.isReady) {
    //         if (router?.query?.code) {
    //             dispatch(profileActions.withGoogle(router.query.code))
    //         }
    //     }
    // }, [router.isReady])

    const hydratedTheme = useFixHydrate(theme)

    return (
        <FluidFrame navigation={true}>
            <div className="container">
                The current theme is: {hydratedTheme} 
                <Button onClick={() => setTheme('light')} className="little primary mr-3">Light Mode</Button>
                <Button onClick={() => setTheme('dark')} className="little primary mb-3 mr-3">Dark Mode</Button>
                <Input className="middle" placeholder="name" />
            </div>
        </FluidFrame>
    )
}


export default Home
