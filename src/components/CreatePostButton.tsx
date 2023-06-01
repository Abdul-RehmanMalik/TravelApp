interface CreatePostButtonProps {
  onCreatePost: () => void
}
const CreatePostButton = ({ onCreatePost }: CreatePostButtonProps) => {
  return (
    <button
      className="bg-primary text-white px-4 py-2 rounded-md"
      onClick={onCreatePost}
    >
      Create Post
    </button>
  )
}

export default CreatePostButton
