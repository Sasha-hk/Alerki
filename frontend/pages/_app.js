import { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { useDispatch, Provider } from 'react-redux'
import { AuthProvider } from '../provider/AuthProvider'
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

    return (
        <AuthProvider>
            <Provider store={store}>
                <ThemeProvider>
                    <Component {...pageProps} />
                </ThemeProvider>
            </Provider>
        </AuthProvider>
    )
}


export default App
