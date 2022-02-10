import { 
    createContext, 
    useCallback,
    useContext,
    useEffect,
    useState 
} from 'react'
import Router, {useRouter} from 'next/router'
import Cookies from 'js-cookie'
import api from '../http'
import parseToken from '../utils/parseToken'


const AuthContext = createContext({
    isAuthenticated: _ => {},
    data: {},
})

export const useAuth = () => useContext(AuthContext)

const defaultAuthData = {
    id: null,
    email: null,
    username: null,
    firstName: null,
    lastName: null,
    pictureID: null,
    clientID: null,
    authenticated: false,
}

export const AuthProvider = ({children}) => {
    const [authData, setAuthData] = useState(defaultAuthData)
    const router = useRouter()
    
    const setData = () => {
        const token = parseToken(Cookies.get('accessToken'))
        setAuthData({
            id: token.id,
            email: token.email,
            username: token.username,
            firstName: token.firstName,
            lastName: token.lastName,
            clientID: token.clientID,
            pictureID: token.pictureID,
            authenticated: true,
        })
    }

    const isAuthenticated = () => {
        return authData.authenticated
    }
    
    const register = async ({
        email,
        username,
        password,
        profileType,
    }) => {
        await api({
            method: 'post',
            url: '/auth/register',
            data: {
                email,
                username,
                password,
                profileType,
            }
        })
            .then(r => { 
                setData()
                Router.push('/')
            })
            .catch(e => {
                return e?.response?.data
            }) 
    }

    const login = async ({
        email,
        username,
        password
    }) => {
        await api({
            method: 'post',
            url: '/auth/log-in',
            data: {
                email,
                username,
                password,
            }
        })
            .then(r => {
                setData()
                Router.push('/')
            })
            .catch(e => {
                return e?.response?.data
            }) 
    }
    
    const logout = () => {
        api({
            method: 'get',
            url: '/auth/log-out',
        })
            .then(r => {
                Router.push('/')
            })
            .catch(e => {
                console.log(e)
            })
    }

    const withGoogle = (code) => {
        api({
            method: 'get',
            url: '/auth/callback/google',
            params: {
                code,
            }
        })
            .then(r => {
                setData()
                Router.push('/')
            })
            .catch(e => {
                console.log(e)
            })
    }

    const refresh = async () => {
        await api({
            method: 'get',
            url: '/auth/refresh'
        })
            .then(r => {
                setData({
                    ...authData,
                    authenticated: true,
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

    
    // refresh or set authData from accessToken
    useEffect(() => {
        if (Cookies.get('accessToken') === undefined && Cookies.get('authenticated')) {
            refresh()
        }
        else if (Cookies.get('authenticated') && authData.authenticated === false) {
            setData()
        }
    }, [])
    
    // handle authentication with Google
    useEffect(() => {
        if (router.isReady) {
            if (router?.query?.code) {
                withGoogle(router.query.code)
            }
        }
    }, [router.isReady])
    
    return (
        <AuthContext.Provider value={{
            authData,
            isAuthenticated,
            register,
            refresh,
            login,
            logout,
            withGoogle,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
