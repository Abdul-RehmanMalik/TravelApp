import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  HashRouter
} from 'react-router-dom'
import SignUpPage from './pages/Signup'
import LoginPage from './pages/Login'
import ForgotPasswordPage from './pages/ForgotPassword'
import ResetPasswordPage from './pages/ResetPassword'
import HomePage from './pages/HomePage'
import { useContext } from 'react'
import { AppContext } from './context/appContext'

function App() {
  const appContext = useContext(AppContext)

  if (!appContext.loggedIn) {
    return (
      <div className="">
        <div className="">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
              <Route path="/resetpassword" element={<ResetPasswordPage />} />
              {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    )
  }

  return (
    <div className="">
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            {/* <Route path="*" element={<Navigate to="/home" />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}
export default App
