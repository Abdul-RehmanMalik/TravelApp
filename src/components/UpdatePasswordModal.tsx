import { useState, useEffect } from 'react'
import apiInstance from '../axios'
import { useContext } from 'react'
import { AppContext } from '../context/appContext'

interface UpdatePasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

const UpdatePasswordModal = ({ isOpen, onClose }: UpdatePasswordModalProps) => {
  if (!isOpen) {
    return null
  }

  const [response, setResponse] = useState('')
  const appContext = useContext(AppContext)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isOldPasswordCorrect, setIsOldPasswordCorrect] = useState(false)
  const [isPasswordMatch, setIsPasswordMatch] = useState(false)

  const verifyOldPassword = async () => {
    try {
      const data = {
        id: appContext.userId,
        password: oldPassword,
      }

      const response = await apiInstance.post('/auth/verifypassword', data)
      setIsOldPasswordCorrect(response.data)
    } catch (error: any) {
      console.error('Error verifying password:', error)
      setIsOldPasswordCorrect(false)
    }
  }

  useEffect(() => {
    if (oldPassword !== '') {
      verifyOldPassword()
    }
  }, [oldPassword])

  useEffect(() => {
    setIsPasswordMatch(newPassword === confirmPassword)
  }, [newPassword, confirmPassword])

  const handleUpdatePasswordClick = async () => {
    try {
      if (!isPasswordMatch) {
        setResponse('Passwords do not match.')
        return
      }

      const data = {
        id: appContext.userId,
        newPassword,
      }

      const response = await apiInstance.put('/auth/updatepassword', data)
      setResponse(response.data)
    } catch (error: any) {
      console.error('Error updating password:', error)
      setResponse(error)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="relative bg-white p-4 rounded-lg w-46 h-46 sm:max-w-sm md:max-w-md lg:max-w-lg">
        <h2 className="text-lg font-bold mb-4">Update Password</h2>
        <div className="flex flex-col items-center pt-4 pr-4 pb-4 pl-4">
          <img
            src={appContext.profilePicture}
            className="flex-shrink-0 object-cover object-center btn- flex w-16 h-16 mr-auto -mb-8 ml-auto rounded-full shadow-xl"
            alt="Profile"
          />
          <p className="mt-12 text-lg font-semibold leading-none text-black tracking-tighter lg:text-3xl">
            {appContext.username}
          </p>
          <div className="w-full mt-6">
            <input
              type="password"
              placeholder="Old Password"
              className={`w-full mb-4 p-2 rounded-lg border ${
                isOldPasswordCorrect ? 'bg-green-100' : 'bg-red-100'
              }`}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              className={`w-full mb-4 p-2 rounded-lg border ${
                isPasswordMatch && newPassword ? 'bg-green-100' : 'bg-red-100'
              }`}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className={`w-full mb-4 p-2 rounded-lg border ${
                isPasswordMatch && confirmPassword
                  ? 'bg-green-100'
                  : 'bg-red-100'
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {isOldPasswordCorrect &&
          isPasswordMatch &&
          oldPassword &&
          newPassword &&
          confirmPassword ? (
            <div className="flex justify-end mt-4">
              <button
                className="bg-primary hover:bg-hovercolor text-white font-bold py-2 px-4 rounded m-2"
                onClick={handleUpdatePasswordClick}
              >
                Submit
              </button>
            </div>
          ) : null}
          <div className="flex justify-end mt-4">
            <button
              className="bg-primary hover:bg-red-600 text-white font-bold py-2 px-4 rounded m-2"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
        {response && <div className="text-red-500 mt-2">{response}</div>}
      </div>
    </div>
  )
}

export default UpdatePasswordModal
