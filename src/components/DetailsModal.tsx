import { useState, useEffect } from 'react'
import apiInstance from '../axios'

interface DetailsModalProps {
  postId: number
  closeModal: () => void
}

interface PostDetails {
  location: string
  heritage: string
  placesToVisit: string
  communityAccess: string
  easeOfTransportation: string
  safety: string
  cost: string
}

export default function DetailsModal({
  postId,
  closeModal,
}: DetailsModalProps) {
  const [postDetails, setPostDetails] = useState<PostDetails | null>(null)
  const [expandedAttributes, setExpandedAttributes] = useState<string[]>([])

  useEffect(() => {
    fetchPostDetails()
  }, [postId])

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

  const toggleAttributeExpansion = (attribute: string) => {
    if (expandedAttributes.includes(attribute)) {
      setExpandedAttributes((prevExpandedAttributes) =>
        prevExpandedAttributes.filter((attr) => attr !== attribute)
      )
    } else {
      setExpandedAttributes((prevExpandedAttributes) => [
        ...prevExpandedAttributes,
        attribute,
      ])
    }
  }

  const isAttributeExpanded = (attribute: string) =>
    expandedAttributes.includes(attribute)

  const shouldShowSeeMore = (text: string | undefined) => {
    if (typeof text !== 'string') {
      return false
    }
    const words = text.split(' ')
    return words.length > 10
  }

  const renderContent = (attribute: keyof PostDetails, text: string) => {
    if (shouldShowSeeMore(text)) {
      if (isAttributeExpanded(attribute)) {
        return (
          <>
            {text}
            <span
              className="text-primary cursor-pointer ml-2"
              onClick={() => toggleAttributeExpansion(attribute)}
            >
              See Less
            </span>
          </>
        )
      } else {
        const truncatedText = text.split(' ').slice(0, 10).join(' ')
        return (
          <>
            {truncatedText}...
            <span
              className="text-primary cursor-pointer ml-2"
              onClick={() => toggleAttributeExpansion(attribute)}
            >
              See More
            </span>
          </>
        )
      }
    }
    return text
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-4 w-full sm:w-96 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Post Details</h3>
        {postDetails ? (
          <div>
            <p className="mb-2">
              <strong>Location:</strong>{' '}
              {renderContent('location', postDetails.location)}
            </p>
            <p className="mb-2">
              <strong>Heritage:</strong>{' '}
              {renderContent('heritage', postDetails.heritage)}
            </p>
            <p className="mb-2">
              <strong>Places to Visit:</strong>{' '}
              {renderContent('placesToVisit', postDetails.placesToVisit)}
            </p>
            <p className="mb-2">
              <strong>Community Access:</strong>{' '}
              {renderContent('communityAccess', postDetails.communityAccess)}
            </p>
            <p className="mb-2">
              <strong>Ease of Transportation:</strong>{' '}
              {renderContent(
                'easeOfTransportation',
                postDetails.easeOfTransportation
              )}
            </p>
            <p className="mb-2">
              <strong>Safety:</strong>{' '}
              {renderContent('safety', postDetails.safety)}
            </p>
            <p className="mb-2">
              <strong>Cost:</strong> {renderContent('cost', postDetails.cost)}
            </p>
          </div>
        ) : (
          <p>Loading post details...</p>
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
    </div>
  )
}
