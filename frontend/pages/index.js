import { useTheme } from 'next-themes'
import FluidFrame from '../components/frames/FluidFrame'


const Home = () => {
    const {theme, setTheme} = useTheme()
    return (
        <FluidFrame>
            The current theme is: {theme}
            <button onClick={() => setTheme('light')}>Light Mode</button>
            <button onClick={() => setTheme('dark')}>Dark Mode</button>
        </FluidFrame>
    )
}

export default Home
