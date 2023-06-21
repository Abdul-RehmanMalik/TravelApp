import { useState, useEffect } from 'react'
import apiInstance from '../axios'
import ProfileModal from './ProfileModal'

interface User {
  id: number
  profilePicture: string
  name: string
}

interface Like {
  _id: string
  id: number
  name: string
  profilePicture: string
}

interface LikesModalProps {
  postId: number
  closeModal: () => void
}

export default function LikesModal({ postId, closeModal }: LikesModalProps) {
  const [likes, setLikes] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    fetchLikes()
  }, [])

  const fetchLikes = async () => {
    try {
      const response = await apiInstance.get<{ likes: Like[] }>(
        `/posts/getlikes?postId=${postId}`
      )
      setLikes(response.data.likes || [])
    } catch (error) {
      console.error('Failed to fetch likes:', error)
    }
  }

  const openProfileModal = (user: User) => {
    setSelectedUser(user)
  }

  const closeProfileModal = () => {
    setSelectedUser(null)
  }

  const renderLikes = () => {
    if (!likes || likes.length === 0) {
      return <p>No likes found.</p>
    }
    return likes.map((user) => (
      <div key={user.id} className="flex items-center mb-4">
        <button
          className="flex items-center"
          onClick={() => openProfileModal(user)}
        >
          <img
            src={user.profilePicture}
            alt="Profile Picture"
            className="w-8 h-8 rounded-full mr-2 cursor-pointer hover:opacity-75"
          />
          <span className="font-semibold cursor-pointer hover:underline hover:text-primary">
            {user.name}
          </span>
        </button>
      </div>
    ))
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4 rounded-lg overflow-auto">
        <h3 className="text-xl font-bold mb-4">Likes</h3>
        <div className="max-h-48 sm:max-h-96 md:max-h-144 overflow-y-scroll">
          {renderLikes()}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 text-sm bg-white-600 text-red-600 active:bg-red-600 hover:bg-red-600 hover:text-white font-bold uppercase rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-full sm:w-auto"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
      {selectedUser && (
        <ProfileModal
          isOpen={true}
          onClose={closeProfileModal}
          userId={selectedUser.id}
        />
      )}
    </div>
  )
}
