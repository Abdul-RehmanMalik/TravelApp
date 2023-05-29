import { useLocation } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import apiInstance from '../axios'
import { AppContext } from '../context/appContext'
import { useNavigate, Navigate } from 'react-router-dom'
interface PopupProps {
  isOpen: boolean
  isVerified: boolean
}

const VerificationPopUp = ({ isVerified }: PopupProps) => {
  const appContext = useContext(AppContext)
  const navigate = useNavigate()
  const location = useLocation()
  if (appContext.isActivated) {
    console.log('is Activated:', appContext.isActivated)
    return <Navigate to="/home" />
  }
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token')
  const id = searchParams.get('id')

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        if (token && id) {
          const response = await apiInstance.post('/auth/activate', {
            token,
            id
          })
          console.log(response)
          appContext.setIsActivated?.(true)
          //navigate('/home')
        }
      } catch (error) {
        console.log(error)
      }
    }

    authenticateUser()
  }, [token, id])

  // const authenticateUser = async () => {
  //   try {
  //     const response = await apiInstance.post('/auth/activate', { token, id })
  //     console.log(response)
  //   } catch (error: any) {
  //     console.log(error)
  //   }
  // }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl mb-2">Verification Status</h2>
        {isVerified ? (
          <p className="text-green-500">User is verified</p>
        ) : (
          <p className="text-red-500">User is not verified</p>
        )}
      </div>
    </div>
  )
}

export default VerificationPopUp
