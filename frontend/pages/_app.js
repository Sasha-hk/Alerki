// providers
import { Provider } from 'react-redux'
import { AuthProvider } from '../provider/AuthProvider'
import { ThemeProvider } from 'next-themes'

// Redux
import useStore from '../store'

// CSS
import '../styles/base.css'
import '../styles/nav-bar.css'
import '../styles/theme.css'
import '../styles/margins-paddings.css'
import '../styles/typography.css'
import '../styles/forms.css'
import '../styles/user-picture.css'
import '../styles/frames/fluid-frame.css'
import '../styles/frames/scroll-frame.css'
import '../styles/UI/button.css'
import '../styles/UI/input.css'
import '../styles/UI/select.css'
import '../styles/UI/textarea.css'


function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  )
}


export default App
