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
  userId: number
  setUserId: Dispatch<SetStateAction<number>> | null
  username: string
  setUsername: Dispatch<SetStateAction<string>> | null
  logout: (() => void) | null
}
export const AppContext = createContext<AppContextProps>({
  checkingSession: false,
  loggedIn: false,
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
  const [userId, setUserId] = useState(0)
  const [username, setUsername] = useState('')
  useEffect(() => {
    setCheckingSession(true)
    apiInstance
      .get('/session')
      .then((res) => res.data)
      .then((data: any) => {
        setCheckingSession(false)
        setUserId(data.id)
        setUsername(data.name)
        setLoggedIn(true)
      })
      .catch(() => {
        setLoggedIn(false)
      })
  }, [])
  const logout = useCallback(() => {
    apiInstance.get('/auth/logout').then(() => {
      setLoggedIn(false)
      setUsername('')
      setUserId(0)
    })
  }, [])

  return (
    <AppContext.Provider
      value={{
        checkingSession,
        loggedIn,
        setLoggedIn,
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
