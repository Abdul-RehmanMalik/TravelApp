import { useEffect, useState } from 'react'
import apiInstance from '../axios'

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
  userId: number
}

interface User {
  id: number
  profilePicture: string
  name: string
  email: string
  address: string
}

const ProfileModal = ({ isOpen, onClose, userId }: ProfileModalProps) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiInstance.get(`/user/${userId}`)
        setUser(response.data)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    if (isOpen && userId) {
      fetchUser()
    }
  }, [isOpen, userId])

  if (!isOpen || !user) {
    return null
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="relative bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
          <img
            src={user.profilePicture}
            className="flex-shrink-0 object-cover object-center btn- flex w-16 h-16 mr-auto -mb-8 ml-auto rounded-full shadow-xl"
            alt="Profile"
          />
          <p className="mt-10 text-xl font-semibold leading-none text-black tracking-tighter lg:text-3xl">
            {user.name}
          </p>
          <p className="mt-2 text-gray-600">{user.email}</p>
          <p className="mt-2 text-gray-600">{user.address}</p>
        </div>
        <button
          className="px-4 py-2 text-sm bg-white-600 text-red-600 active:bg-red-600 hover:bg-red-600 hover:text-white font-bold uppercase rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-full sm:w-auto"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default ProfileModal
