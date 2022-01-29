import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'next-themes'
import useStore from '../store'

import '../styles/base.css'
import '../styles/margins-paddings.css'
import '../styles/typography.css'


export default function App({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)

    return (
        <Provider store={store}>
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    )
}

App.propTypes = {
    Component: PropTypes.any.isRequired,
    pageProps: PropTypes.object.isRequired,
}

