import { useState, useEffect } from 'react'

interface Comment {
  id: number
  content: string
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
  console.log(postId)
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('/posts/fetchcomment')
        const data = await response.json()
        setComments(data)
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }

    fetchComments()
  }, [])

  const handlePostComment = () => {
    const newCommentObj: Comment = {
      id: comments.length + 1,
      content: newComment,
    }
    setComments([...comments, newCommentObj])
    setNewComment('')
  }

  return (
    <div className="comments-modal">
      <h2 className="modal-title">Comments</h2>
      <div className="comments-container">
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              {comment.content}
            </div>
          ))}
        </div>
        <div className="comment-input">
          <input
            type="text"
            id="comment-text"
            placeholder="Post a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button id="post-comment" onClick={handlePostComment}>
            Post Comment
          </button>
        </div>
      </div>
    </div>
  )
}
