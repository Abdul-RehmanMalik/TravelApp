import { useState, useEffect, useContext } from 'react'
import apiInstance from '../axios'
import { AppContext } from '../context/appContext'

interface DetailsModalProps {
  postId: number
  closeModal: () => void
}

export default function DetailsModal({
  postId,
  closeModal,
}: DetailsModalProps) {
  const [postDetails, setPostDetails] = useState<any>(null)
  const appContext = useContext(AppContext)

  useEffect(() => {
    fetchPostDetails()
  }, [])

  const fetchPostDetails = async () => {
    try {
      const response = await apiInstance.get(
        `/posts/getdetails?postId=${postId}`
      )
      setPostDetails(response.data)
    } catch (error) {
      console.error('Failed to fetch post details:', error)
    }
  }

  return (
    <div className="bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-4 w-96">
      <h3 className="text-xl font-bold mb-4">Post Details</h3>
      {postDetails && (
        <div>
          <p>Location: {postDetails.location}</p>
          <p>Heritage: {postDetails.heritage}</p>
          <p>Places to Visit: {postDetails.placesToVisit}</p>
          <p>Community Access: {postDetails.communityAccess}</p>
          <p>Ease of Transportation: {postDetails.easeOfTransportation}</p>
          <p>Safety: {postDetails.safety}</p>
          <p>Cost: {postDetails.cost}</p>
        </div>
      )}
      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-2 text-sm bg-white-600 text-red-600 active:bg-red-600 hover:bg-red-600 hover:text-white font-bold uppercase rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  )
}
