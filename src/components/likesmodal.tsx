import { useState, useEffect } from 'react'
import apiInstance from '../axios'

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

  useEffect(() => {
    fetchLikes()
  }, [])

  const fetchLikes = async () => {
    try {
      const response = await apiInstance.get<{ likes: Like[] }>(
        `/posts/getlikes?postId=${postId}`
      )
      setLikes(response.data.likes || [])
      console.log('response:', response.data.likes)
    } catch (error) {
      console.error('Failed to fetch likes:', error)
    }
  }

  const renderLikes = () => {
    if (!likes || likes.length === 0) {
      return <p>No likes found.</p>
    }
    return likes.map((user) => (
      <div key={user.id} className="flex items-center mb-4">
        <img
          src={user.profilePicture}
          alt="Profile Picture"
          className="w-8 h-8 rounded-full mr-2"
        />
        <span>{user.name}</span>
      </div>
    ))
  }

  return (
    <div className="">
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
  )
}
