import { useState, useEffect, useRef } from 'react'
import apiInstance from '../axios'
import { useContext } from 'react'
import { AppContext } from '../context/appContext'
import CommentsModal from './CommentsModal'
import LikesModal from './Likesmodal'
import ProfileModal from './ProfileModal'
import DetailsModal from './DetailsModal'

interface FeedProps {
  userId?: number | null
}
interface User {
  id: number
  name: string
  profilePicture: string
}
const Feed = ({ userId }: FeedProps) => {
  const [posts, setPosts] = useState<
    {
      pid: number
      images: string[]
      title: string
      description: string
      postedBy: {
        _id: string
        id: number
        name: string
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
  const [isDetailsModalVisible, setisDetailsModalVisible] = useState(false)

  const [isLikesModalVisible, setIsLikesModalVisible] = useState(false) // Updated variable
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})
  const pageRef = useRef<number>(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  useEffect(() => {
    if (userId) {
      fetchUserPosts(userId)
    } else {
      fetchPosts()
    }
  }, [userId])

  const handleScroll = () => {
    if (loadingRef.current) return

    const bottomOfPosts = containerRef.current?.getBoundingClientRect()
      .bottom as number
    const heightOfWindow = window.innerHeight

    if (bottomOfPosts < heightOfWindow && bottomOfPosts !== undefined) {
      loadMorePosts()
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await apiInstance.get('/posts/getall', {
        params: {
          page: 1,
        },
      })
      setPosts(response.data.data)
      pageRef.current = 1
      console.log('response:', response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUserPosts = async (userId: number) => {
    try {
      const response = await apiInstance.get(
        `/posts/getuserposts?userId=${userId}`,
        {
          params: {
            page: 1,
          },
        }
      )
      setPosts(response.data.data)
      pageRef.current = 1
      console.log('response:', response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const loadMorePosts = async () => {
    try {
      if (loadingRef.current) return

      loadingRef.current = true

      const response = await apiInstance.get('/posts/getall', {
        params: {
          page: pageRef.current + 1,
        },
      })

      if (response.data.data.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...response.data.data])
        pageRef.current = pageRef.current + 1
      }

      loadingRef.current = false
    } catch (error) {
      console.log(error)
    }
  }

  const calculateImageSize = (numImages: number): string => {
    const containerWidth = containerRef.current?.clientWidth || 0
    const maxImageSize = Math.floor(containerWidth / numImages) / 2
    const imageSize = Math.min(maxImageSize, 400) //maximum size of 400px
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
  const handleLikeCountClick = (postId: number) => {
    setSelectedPostId(postId)
    setIsLikesModalVisible(true)
  }

  const toggleDescription = (postId: number) => {
    setExpandedDescription((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }))
  }
  const likePost = async (postId: number) => {
    try {
      const post = posts.find((post) => post.pid === postId)
      if (!post) return

      const updatedPost = { ...post }
      if (updatedPost.liked) {
        updatedPost.liked = false
        updatedPost.likes = updatedPost.likes.filter(
          (likeId) => likeId !== appContext.userId
        )
      } else {
        updatedPost.liked = true
        updatedPost.likes.push(appContext.userId)
      }

      setPosts((prevPosts) =>
        prevPosts.map((prevPost) =>
          prevPost.pid === postId ? updatedPost : prevPost
        )
      )

      const postLikeData = {
        userId: appContext.userId,
        pid: postId,
      }

      const response = await apiInstance.put('/posts/like', postLikeData)
      const updatedLikeCount = response?.data?.likeCount

      if (updatedLikeCount !== undefined) {
        updatedPost.likes = updatedLikeCount

        setPosts((prevPosts) =>
          prevPosts.map((prevPost) =>
            prevPost.pid === postId ? updatedPost : prevPost
          )
        )
      }
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
                className={`w-1/2 h-auto mr-2 cursor-pointer ${
                  window.innerWidth <= 640 ? 'w-full' : ''
                }`}
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

  const handleEditPost = (postId: number) => {}

  const handleDeletePost = (postId: number) => {}
  const toggleDropdown = (postId: number) => {
    dropdownRefs.current[postId]?.classList.toggle('hidden')
  }
  const openProfileModal = (user: User) => {
    setSelectedUser(user)
  }

  const closeProfileModal = () => {
    setSelectedUser(null)
  }
  const openDetailsModal = (postId: number) => {
    setSelectedPostId(postId)
    setisDetailsModalVisible(true)
  }

  return (
    <div className="flex justify-center mt-6 sm:mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {posts.map((post) => (
          <div
            key={post.pid}
            className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col relative"
          >
            <div className="flex items-center mb-2">
              <img
                src={post.postedBy.profilePicture}
                alt="Profile Picture"
                className="w-8 h-8 rounded-full mr-2 cursor-pointer hover:opacity-75"
                onClick={() => openProfileModal(post.postedBy)}
              />
              <h3
                className="font-bold text-lg cursor-pointer hover:text-primary"
                onClick={() => openProfileModal(post.postedBy)}
              >
                {post.postedBy.name}
              </h3>
              <div className="ml-auto relative">
                <button
                  id={`dropdownMenuIconButton-${post.pid}`}
                  data-dropdown-toggle={`dropdownDots-${post.pid}`}
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-primary focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600 hover:text-white"
                  type="button"
                  onClick={() => toggleDropdown(post.pid)}
                >
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                  </svg>
                </button>
                <div
                  id={`dropdownDots-${post.pid}`}
                  ref={(el) => {
                    dropdownRefs.current[post.pid] = el
                  }}
                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute top-10 right-0"
                >
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <a
                        href="#"
                        className="block px-2 py-2 text-blue-600 hover:bg-primary hover:text-white font-semibold"
                        onClick={() => handleEditPost(post.pid)}
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-2 py-2 text-red-600 hover:bg-primary  hover:text-white font-semibold"
                        onClick={() => handleDeletePost(post.pid)}
                      >
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
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
                  className="w-4 h-4 "
                >
                  <path
                    fillRule="evenodd"
                    d="M10.707 3.293A1 1 0 0 0 9.293 4.707L11 6.414V15a1 1 0 1 0 2 0V6.414l1.707-1.707A1 1 0 0 0 13.707 3.293l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L5 4.414V15a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V4.414l2.293 2.293a1 1 0 0 0 1.414-1.414l-5-5zM6 7a1 1 0 0 0-1 1v7.586l-1.293-1.293a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0-1.414-1.414L7 15.586V8a1 1 0 0 0-1-1zm8 0H6a1 1 0 0 0-1 1v7.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0-1.414-1.414L15 15.586V8a1 1 0 0 0-1-1z"
                  />
                </svg>
                {post.liked ? 'Liked' : 'Like'}
              </button>
              <span className="mx-1"></span>
              <button
                className="flex items-center text-primary ml-0 mr-2"
                onClick={() => handleLikeCountClick(post.pid)}
              >
                {post.likes.length}
              </button>

              <button
                className="flex items-center text-primary"
                onClick={() => openCommentsModal(post.pid)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3zm3 5a1 1 0 1 1 0-2h8a1 1 0 1 1 0 2H6zm0 4a1 1 0 1 1 0-2h8a1 1 0 1 1 0 2H6zm0 4a1 1 0 1 1 0-2h4a1 1 0 1 1 0 2H6z"
                  />
                </svg>
                Comment
              </button>
              <button
                className="flex items-center text-primary ml-2 mr-1"
                onClick={() => openDetailsModal(post.pid)}
              >
                Details
              </button>
            </div>
          </div>
        ))}
        <div ref={containerRef}></div>
        {/* Comments modal */}
        {isCommentsModalVisible && selectedPostId && (
          <CommentsModal
            postId={selectedPostId}
            closeModal={() => setIsCommentsModalVisible(false)}
          />
        )}
        {isLikesModalVisible && selectedPostId && (
          <LikesModal
            postId={selectedPostId}
            closeModal={() => setIsLikesModalVisible(false)}
          />
        )}
        {selectedUser && (
          <ProfileModal
            isOpen={true}
            userId={selectedUser.id}
            onClose={closeProfileModal}
          />
        )}
        {isDetailsModalVisible && selectedPostId !== undefined && (
          <DetailsModal
            postId={selectedPostId}
            closeModal={() => setisDetailsModalVisible(false)}
          />
        )}
      </div>
    </div>
  )
}

export default Feed
