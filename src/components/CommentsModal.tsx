import { useState, useEffect, useContext } from 'react'
import apiInstance from '../axios'
import { AppContext } from '../context/appContext'

interface Comment {
  cid: number
  commentedBy: {
    userId: number
    profilePicture: string
    name: string
  }
  text: string
}

interface CommentsModalProps {
  postId: number
  closeModal: () => void
}

export default function CommentsModal({
  postId,
  closeModal,
}: CommentsModalProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const appContext = useContext(AppContext)

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      const response = await apiInstance.get(
        `/posts/getcomments?postId=${postId}`
      )
      setComments(response.data.comments)
    } catch (error) {
      console.error('Failed to fetch comments:', error)
    }
  }

  const renderComments = () => {
    return comments.map((comment) => (
      <div key={comment.cid} className="flex items-start mb-4">
        <img
          src={comment.commentedBy.profilePicture}
          alt="Profile Picture"
          className="w-8 h-8 rounded-full mr-2"
        />
        <div>
          <div className="flex items-start mb-2">
            <h4 className="font-semibold">{comment.commentedBy.name}</h4>
          </div>
          <div className="flex items-start mb-2">
            <div className="comment-text">{comment.text}</div>
          </div>
          {comment.commentedBy.name === appContext.username && (
            <div className="flex items-start mb-2">
              <button
                className="text-blue-600 mr-2"
                onClick={() => handleEditComment(comment.cid, comment.text)}
              >
                Edit
              </button>
              <button
                className="text-red-600"
                onClick={() => handleDeleteComment(comment.cid)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    ))
  }

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)

  const handleCommentSubmit = async () => {
    try {
      if (newComment.trim() === '') {
        return
      }

      if (editingCommentId) {
        await apiInstance.put(`/posts/editcomment/${editingCommentId}`, {
          text: newComment,
        })
        const updatedComments = comments.map((comment) => {
          if (comment.cid === editingCommentId) {
            return { ...comment, text: newComment }
          }
          return comment
        })
        setComments(updatedComments)
        setEditingCommentId(null)
      } else {
        const newCommentData = {
          pid: postId,
          text: newComment,
          userId: appContext.userId,
        }

        await apiInstance.post('/posts/addcomment', newCommentData)
        fetchComments()
      }

      setNewComment('')
    } catch (error) {
      console.error('Failed to add/edit comment:', error)
    }
  }

  const handleEditComment = (cid: number, text: string) => {
    setNewComment(text)
    setEditingCommentId(cid)
  }

  const handleDeleteComment = async (cid: number) => {
    try {
      await apiInstance.delete(`/posts/deletecomment/${cid}`)
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.cid !== cid)
      )
    } catch (error) {
      console.error('Failed to delete comment:', error)
    }
  }

  return (
    <div className="bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      <div className="comments-container max-h-48 sm:max-h-96 md:max-h-144 overflow-y-scroll">
        {renderComments()}
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Add a comment"
          className="w-full px-2 py-1 border border-gray-300 rounded"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="px-4 py-2 mt-2 text-sm bg-white-600 text-primary active:bg-primary hover:bg-primary hover:text-white font-bold uppercase rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 sm:w-auto sm:ml-2"
          onClick={handleCommentSubmit}
        >
          Submit
        </button>
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
