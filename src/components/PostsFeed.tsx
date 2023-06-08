import { useState, useEffect } from 'react'
import apiInstance from '../axios'
import { useContext } from 'react'
import { AppContext } from '../context/appContext'
import CommentsModal from './CommentsModal'
interface FeedProps {
  userId?: number | null
}

const Feed = ({ userId }: FeedProps) => {
  const [posts, setPosts] = useState<
    {
      pid: number
      images: string[]
      title: string
      description: string
      postedBy: {
        userId: string
        username: string
        profilePicture: string
      }
      likes: number[]
      liked: boolean
    }[]
  >([])
  const [clickedImage, setClickedImage] = useState<string | undefined>(
    undefined
  )
  const appContext = useContext(AppContext)
  const [selectedPostId, setSelectedPostId] = useState<number | undefined>(
    undefined
  )

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false)

  const [expandedDescription, setExpandedDescription] = useState<{
    [postId: number]: boolean
  }>({})

  useEffect(() => {
    if (userId) {
      fetchUserPosts(userId)
    } else {
      fetchPosts()
    }
  }, [userId])

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await apiInstance.get('/posts/getall')
      setPosts(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchUserPosts = async (userId: number) => {
    try {
      const response = await apiInstance.get(
        `/posts/getuserposts?userId=${userId}`
      )
      setPosts(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  console.log('UserId in Feed:', userId)
  const calculateImageSize = (numImages: number): string => {
    const totalSize = 400 //  total size for the images (width + height)
    const imageSize = Math.floor(totalSize / numImages) // Calculate the size for each image
    return `${imageSize}px`
  }

  const handleImageClick = (image: string) => {
    setClickedImage(image)
    setIsModalVisible(true)
  }
  const openCommentsModal = (postId: number) => {
    setSelectedPostId(postId)
    setIsCommentsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
    setClickedImage(undefined)
  }

  const toggleDescription = (postId: number) => {
    setExpandedDescription((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }))
  }
  const likePost = async (postId: number) => {
    try {
      const postLikeData = {
        userId: appContext.userId,
        pid: postId,
      }
      await apiInstance.put('/posts/like', postLikeData)
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.pid === postId) {
            return { ...post, liked: true }
          }
          return post
        })
      )
    } catch (error) {
      console.log(error)
    }
  }
  const renderImages = (images: string[]) => {
    const numImages = images.length
    const imageRows: string[][] = []
    let currentRow: string[] = []
    for (let i = 0; i < numImages; i++) {
      currentRow.push(images[i])
      if (currentRow.length === 2) {
        imageRows.push(currentRow)
        currentRow = []
      }
    }
    if (currentRow.length > 0) {
      imageRows.push(currentRow)
    }
    return (
      <>
        {imageRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex mb-4 justify-center">
            {row.map((image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                className="w-1/2 h-auto mr-2 cursor-pointer"
                style={{
                  width: calculateImageSize(row.length),
                  height: calculateImageSize(row.length),
                }}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        ))}
        {isModalVisible && (
          <div
            className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50"
            onClick={closeModal}
          >
            <img src={clickedImage} alt="" className="max-w-full max-h-full" />
          </div>
        )}
      </>
    )
  }

  const truncateDescription = (description: string): string => {
    if (description.length > 200) {
      return description.slice(0, 200) + '...'
    }
    return description
  }

  return (
    <div className="container mx-auto">
      {posts.map((post) => (
        <div
          key={post.pid}
          className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col"
        >
          <div className="flex items-center mb-2">
            <img
              src={post.postedBy.profilePicture}
              alt="Profile Picture"
              className="w-8 h-8 rounded-full mr-2"
            />
            <h3 className="font-bold text-lg">{post.postedBy.username}</h3>
          </div>
          <div className="mb-4">{renderImages(post.images)}</div>
          <h3 className="font-bold text-lg">{post.title}</h3>
          <p className="text-gray-700 mb-4">
            {expandedDescription[post.pid]
              ? post.description
              : truncateDescription(post.description)}
            {post.description.length > 200 && (
              <button
                className="text-primary underline"
                onClick={() => toggleDescription(post.pid)}
              >
                {expandedDescription[post.pid] ? '..See less' : '..See more'}
              </button>
            )}
          </p>
          <div className="flex items-center">
            <button
              className={`flex items-center text-primary ${
                post.liked ? 'font-bold' : ''
              }`}
              onClick={() => likePost(post.pid)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M10.707 3.293A1 1 0 0 0 9.293 4.707L11 6.414V15a1 1 0 1 0 2 0V6.414l1.707-1.707A1 1 0 0 0 13.707 3.293l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L5 4.414V15a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V4.414l2.293 2.293a1 1 0 0 0 1.414-1.414l-5-5zM6 7a1 1 0 0 0-1 1v7.586l-1.293-1.293a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0-1.414-1.414L7 15.586V8a1 1 0 0 0-1-1zm8 0H6a1 1 0 0 0-1 1v7.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0-1.414-1.414L15 15.586V8a1 1 0 0 0-1-1z"
                />
                {/* Like icon */}
              </svg>
              {post.liked ? 'Liked' : 'Like'}
            </button>
            <span className="mx-2"></span>
            <button
              className="flex items-center text-primary"
              onClick={() => openCommentsModal(post.pid)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M3 2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3zm3 5a1 1 0 1 1 0-2h8a1 1 0 1 1 0 2H6zm0 4a1 1 0 1 1 0-2h8a1 1 0 1 1 0 2H6zm0 4a1 1 0 1 1 0-2h4a1 1 0 1 1 0 2H6z"
                />
                {/* Comment icon */}
              </svg>
              Comment
            </button>
          </div>
        </div>
      ))}
      {/* Comments modal */}
      {isCommentsModalVisible && selectedPostId && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-white bg-opacity-50">
          <CommentsModal
            postId={selectedPostId}
            closeModal={() => setIsCommentsModalVisible(false)}
          />
        </div>
      )}
    </div>
  )
}

export default Feed
