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
// className="bg-white-600 text-red-600 active:bg-red-600  hover:bg-red-600 hover:text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
