import { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { Provider } from 'react-redux'
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

    // refresh if accessToken has expired
    useEffect(() => {
        if (Cookies.get('authenticated') && Cookies.get('accessToken') == undefined) {
            api.get(
                '/auth/refresh',
            )
        }
    }, [])

    return (
        <Provider store={store}>
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    )
}


export default App
