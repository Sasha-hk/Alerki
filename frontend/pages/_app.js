import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'next-themes'
import useStore from '../store'

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


export default App
