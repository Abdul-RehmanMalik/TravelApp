import Header from '../components/Header'
import Login from '../components/Login'
import { AppContext } from '../context/appContext'
import { useContext } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
export default function LoginPage() {
  const appContext = useContext(AppContext)
  const navigate = useNavigate()

  // if (appContext.loggedIn) {
  //   return <Navigate to="/home" />
  // }
  return (
    <>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {' '}
          <Header
            heading="Login to your account"
            paragraph="Don't have an account yet? "
            linkName="Sign up"
            linkUrl="/signup"
          />
          <Login />
        </div>
      </div>
    </>
  )
}
