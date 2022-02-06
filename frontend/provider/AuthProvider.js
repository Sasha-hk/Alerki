import { 
    createContext, 
    useCallback,
    useContext,
    useEffect,
    useState 
} from 'react'
import Cookies from 'js-cookie'
import api from '../http'


const AuthContext = createContext({
    isAuthenticated: _ => {},
    data: {},
})

export const useAuth = () => {
    const context = useContext(AuthContext)
    // console.log(context)

    return context
}

const defaultAuthData = {
    id: null,
    username: null,
    firstName: null,
    lastName: null,
    pictureID: null,
    isAuthenticated: false,
}

export const AuthProvider = ({children}) => {
    const [authData, setAuthData] = useState(defaultAuthData)

    const isAuthenticated = () => {
        return authData.isAuthenticated
    }
    
    const register = () => {
        // setAuthData({isAuthenticated: true})
        return true
    }
    
    const login = () => {
    
    }
    
    const logout = () => {
    
    }

    const withGoogle = () => {
    
    }
    
    return (
        <AuthContext.Provider value={{
            data: authData,
            isAuthenticated,
            register,
            login,
            logout,
            withGoogle,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
