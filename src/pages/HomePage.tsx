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

  const accessToken = localStorage.getItem('accessToken')
  console.log(accessToken)
  console.log(appContext.userId)
  console.log(appContext.loggedIn)
  console.log(appContext.checkingSession)
  console.log(appContext.isActivated)
  // useEffect(() => {
  //   const getSession = async () => {
  //     try {
  //       const response = await apiInstance.get('/session')
  //       console.log(response.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getSession()
  // }, [])
  if (!appContext.userId) {
    console.log('user id:', appContext.userId)
    return <Navigate to="/" />
  }
  if (!appContext.loggedIn) {
    return <Navigate to="/" />
  }
  console.log('user id:', appContext.userId)

  return (
    <>
      <Navbar />
      {/*other components here*/}{' '}
    </>
  )
}
