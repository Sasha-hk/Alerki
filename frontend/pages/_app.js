import { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { useDispatch, Provider } from 'react-redux'
import profileActions from '../store/actions/profileActions'
import useStore from '../store'
import Cookies from 'js-cookie'
import api from '../http'

// CSS
import '../styles/base.css'
import '../styles/nav-bar.css'
import '../styles/theme.css'
import '../styles/margins-paddings.css'
import '../styles/typography.css'
import '../styles/frames/fluid-frame.css'
import '../styles/frames/scroll-frame.css'
import '../styles/UI/button.css'
import '../styles/UI/input.css'


function App({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)

    useEffect(() => {
        // refresh if accessToken has expired
        if (Cookies.get('authenticated') && Cookies.get('accessToken') == undefined) {
            api.get(
                '/auth/refresh',
            )
        }

        // upload profile data
        store.dispatch(profileActions.upload({username: 'css'}))
    }, [store])

    return (
        <Provider store={store}>
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    )
}


export default App
