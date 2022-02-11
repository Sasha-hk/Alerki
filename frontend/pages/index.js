import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import profileActions from '../store/actions/profileActions'
import FluidFrame from '../components/frames/FluidFrame'
import Button from '../components/UI/Button/Button'
import Input from '../components/UI/Input/Input'
import useFixHydrate from '../hooks/useFixHydrate'


const Home = () => {
    const {theme, setTheme} = useTheme()

    const hydratedTheme = useFixHydrate(theme)

    return (
        <FluidFrame navigation={true}>
            <div className="container">
                The current theme is: {hydratedTheme} 
                <Button onClick={() => setTheme('light')} className="little primary mr-3">Light Mode</Button>
                <Button onClick={() => setTheme('dark')} className="little primary mb-3 mr-3">Dark Mode</Button>
            </div>
        </FluidFrame>
    )
}


export default Home
