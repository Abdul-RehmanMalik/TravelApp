import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useCallback,
  ReactNode
} from 'react'
import apiInstance from '../axios'

interface AppContextProps {
  checkingSession: boolean
  loggedIn: boolean
  setLoggedIn: Dispatch<SetStateAction<boolean>> | null
  isActivated: boolean
  setIsActivated: Dispatch<SetStateAction<boolean>> | null
  userId: number
  setUserId: Dispatch<SetStateAction<number>> | null
  username: string
  setUsername: Dispatch<SetStateAction<string>> | null
  logout: (() => void) | null
}
export const AppContext = createContext<AppContextProps>({
  checkingSession: false,
  loggedIn: false,
  isActivated: false,
  setIsActivated: null,
  setLoggedIn: null,
  userId: 0,
  setUserId: null,
  username: '',
  setUsername: null,
  logout: null
})
const AppContextProvider = (props: { children: ReactNode }) => {
  const { children } = props
  const [checkingSession, setCheckingSession] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [isActivated, setIsActivated] = useState(false)
  const [userId, setUserId] = useState(0)
  const [username, setUsername] = useState('')
  const accessToken = localStorage.getItem('accessToken')
  useEffect(() => {
    setCheckingSession(true)
    apiInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${accessToken}`
    if (accessToken) {
      apiInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${accessToken}`
    }

    apiInstance
      .get('/session')
      .then((res) => res.data)
      .then((data: any) => {
        setCheckingSession(false)
        setUserId(data?.id)
        setUsername(data?.name)
        setLoggedIn(true)
        setIsActivated(data?.isActivated)
      })
      .catch(() => {
        console.log('in context catch')
        setLoggedIn(false)
        delete apiInstance.defaults.headers.common['Authorization']
      })
  }, [])
  const logout = useCallback(() => {
    apiInstance.post('/auth/logout').then(() => {
      console.log('callback called')
      setLoggedIn(false)
      setUsername('')
      setUserId(0)
      localStorage.removeItem('accessToken')
      delete apiInstance.defaults.headers.common['Authorization']
      console.log('userId', userId)
      console.log('LoggedIn', loggedIn)
    })
  }, [])

  return (
    <AppContext.Provider
      value={{
        checkingSession,
        loggedIn,
        setLoggedIn,
        isActivated,
        setIsActivated,
        userId,
        setUserId,
        username,
        setUsername,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export default AppContextProvider
