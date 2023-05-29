import { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import VerificationPopUp from '../components/VerificationPopup'
import { AppContext } from '../context/appContext'
import { useNavigate, Navigate } from 'react-router-dom'
import apiInstance from '../axios'
import { error } from 'console'

export default function HomePage() {
  const appContext = useContext(AppContext)
  const navigate = useNavigate()

  // if (!appContext.loggedIn) {
  //   return <Navigate to="/" />
  // }
  const accessToken = localStorage.getItem('accessToken')
  console.log(accessToken)
  console.log(appContext.userId)
  console.log(appContext.loggedIn)
  console.log(appContext.checkingSession)
  console.log(appContext.isActivated)

  console.log('user id:', appContext.userId)

  return (
    <>
      <Navbar />
      {appContext.isActivated ? null : (
        <VerificationPopUp isOpen={true} isVerified={false} />
      )}
      {/*other components here*/}{' '}
    </>
  )
}
