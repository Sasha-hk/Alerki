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
                <span className="text-big">Planned:</span> 
            </div>
        </FluidFrame>
    )
}


export default Home
