import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useSelector, useDispatch } from 'react-redux'
import { initializeStore } from '../store'
import FluidFrame from '../components/frames/FluidFrame'
import Button from '../components/UI/Button/Button'
import Input from '../components/UI/Input/Input'


const Home = () => {
    const {theme, setTheme} = useTheme()

    // const profile = useSelector((store) => store.profile)

    return (
        <FluidFrame navigation={true}>
            <div className="container">
                The current theme is: {theme}
                <Button onClick={() => setTheme('light')} className="little primary mr-3">Light Mode</Button>
                <Button onClick={() => setTheme('dark')} className="little primary mb-3 mr-3">Dark Mode</Button>
                <Input className="middle" placeholder="name" />
            </div>
        </FluidFrame>
    )
}

Home.getInitialProps = (ctx) => {
    const reduxStore = initializeStore()
    const {dispatch} = reduxStore

    console.log(dispatch({type: 'NEXT'}))

    console.log(reduxStore.getState())

    Object.keys(ctx).forEach(k => console.log('   ', k))

    return {props: {}}
}



export default Home
