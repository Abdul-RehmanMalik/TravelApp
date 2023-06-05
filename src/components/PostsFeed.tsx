import { useState, useEffect } from 'react'
import apiInstance from '../axios'

const Feed = () => {
  const [posts, setPosts] = useState<
    {
      id: number
      profilePicture: string
      name: string
      image: string
      title: string
      description: string
    }[]
  >([])

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await apiInstance.get('/posts/getall')
      setPosts(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mx-auto">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col"
        >
          <div className="flex items-center mb-2">
            <img
              src={post.profilePicture}
              alt="Profile Picture"
              className="w-8 h-8 rounded-full mr-2"
            />
            <h3 className="font-bold text-lg">{post.name}</h3>
          </div>
          <div className="mb-4">
            <img src={post.image} alt={post.title} className="w-full h-auto" />
          </div>
          <h3 className="font-bold text-lg">{post.title}</h3>
          <p className="text-gray-700 mb-4">{post.description}</p>
          <div className="flex items-center">
            <button className="flex items-center text-blue-500 mr-2">
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
              </svg>
              Like
            </button>
            <button className="flex items-center text-blue-500">
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
              </svg>
              Comment
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Feed
