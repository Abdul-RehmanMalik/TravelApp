interface CreatePostButtonProps {
  onCreatePost: () => void
}
const CreatePostButton = ({ onCreatePost }: CreatePostButtonProps) => {
  return (
    <button
      className="bg-primary text-white active:bg-white hover:bg-white hover:text-primary font-semibold shadow px-4 py-2 rounded-md"
      onClick={onCreatePost}
    >
      Create Post
    </button>
  )
}

export default CreatePostButton
