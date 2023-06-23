import { useState, useEffect } from 'react'
import apiInstance from '../axios'
import { useContext } from 'react'
import { AppContext } from '../context/appContext'

interface UpdateUserInfoModalProps {
  isOpen: boolean
  onClose: () => void
}

const UpdateUserInfoModal = ({ isOpen, onClose }: UpdateUserInfoModalProps) => {
  if (!isOpen) {
    return null
  }

  const [response, setResponse] = useState('')
  const appContext = useContext(AppContext)

  const [password, setPassword] = useState('')
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isNameValid, setIsNameValid] = useState(false)
  const [isAddressValid, setIsAddressValid] = useState(false)

  const verifyPassword = async () => {
    try {
      const data = {
        id: appContext.userId,
        password: password,
      }

      const response = await apiInstance.post('/auth/verifypassword', data)
      setIsPasswordCorrect(response.data)
    } catch (error: any) {
      console.error('Error verifying password:', error)
      setIsPasswordCorrect(false)
    }
  }

  useEffect(() => {
    if (password !== '') {
      verifyPassword()
    }
  }, [password])

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiInstance.get(`/user/${appContext.userId}`)
        const { email, name, address } = response.data
        setEmail(email)
        setName(name)
        setAddress(address)
      } catch (error: any) {
        console.error('Error fetching user info:', error)
      }
    }

    fetchUserInfo()
  }, [])

  useEffect(() => {
    setIsEmailValid(validateEmail(email))
  }, [email])

  useEffect(() => {
    setIsNameValid(name.trim() !== '')
  }, [name])

  useEffect(() => {
    setIsAddressValid(address.trim() !== '')
  }, [address])

  const validateEmail = (value: string) => {
    //  email validation
    const emailRegex = /\S+@\S+\.\S+/
    return emailRegex.test(value)
  }

  const handleUpdateUserInfoClick = async () => {
    try {
      if (
        !isEmailValid ||
        !isNameValid ||
        !isAddressValid ||
        !isPasswordCorrect
      ) {
        setResponse(
          'Please enter valid information in all fields and provide correct password.'
        )
        return
      }

      const data = {
        id: appContext.userId,
        email,
        name,
        address,
      }

      const response = await apiInstance.put('/user/updateinfo', data)
      setResponse(response.data)
    } catch (error: any) {
      console.error('Error updating user info:', error)
      setResponse(error)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="relative bg-white p-4 rounded-lg w-46 h-46 sm:max-w-sm md:max-w-md lg:max-w-lg">
        <h2 className="text-lg font-bold mb-4">Update User Information</h2>
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
              placeholder="Enter Password"
              className={`w-full mb-4 p-2 rounded-lg border ${
                isPasswordCorrect ? 'bg-green-100' : 'bg-red-100'
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder={email}
              className={`w-full mb-4 p-2 rounded-lg border ${
                isEmailValid ? 'bg-green-100' : 'bg-red-100'
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder={name}
              className={`w-full mb-4 p-2 rounded-lg border ${
                isNameValid ? 'bg-green-100' : 'bg-red-100'
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder={address}
              className={`w-full mb-4 p-2 rounded-lg border ${
                isAddressValid ? 'bg-green-100' : 'bg-red-100'
              }`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {isPasswordCorrect ? (
            <div className="flex justify-end mt-4">
              <button
                className="bg-primary hover:bg-hovercolor text-white font-bold py-2 px-4 rounded m-2"
                onClick={handleUpdateUserInfoClick}
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

export default UpdateUserInfoModal
