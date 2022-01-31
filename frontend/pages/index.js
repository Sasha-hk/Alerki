import { useTheme } from 'next-themes'
import FluidFrame from '../components/frames/FluidFrame'
import Button from '../components/UI/Button/Button'
import Input from '../components/UI/Input/Input'


const Home = () => {
    const {theme, setTheme} = useTheme()


    return (
        <FluidFrame>
            <div className="container">
                The current theme is: {theme}
                <Button onClick={() => setTheme('light')} className="little primary mr-3">Light Mode</Button>
                <Button onClick={() => setTheme('dark')} className="little primary mb-3 mr-3">Dark Mode</Button>
                <Input className="middle" placeholder="name" />
            </div>
        </FluidFrame>
    )
}

export default Home
