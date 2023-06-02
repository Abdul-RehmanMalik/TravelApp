interface ProfileModalProps {
  isOpen: boolean
  //   user: {
  //     name: string
  //     email: string
  //     address: string
  //     profilePicture: string
  //   }
  onClose: () => void
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="relative bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
          <img
            src=""
            className="flex-shrink-0 object-cover object-center btn- flex w-16 h-16 mr-auto -mb-8 ml-auto rounded-full shadow-xl"
            alt="Profile"
          />
          <p className="mt-8 text-xl font-semibold leading-none text-black tracking-tighter lg:text-3xl">
            {'user.name'}
          </p>
          <p className="mt-2 text-gray-600">{'user.email'}</p>
          <p className="mt-2 text-gray-600">{'user.address'}</p>
        </div>
        <button
          className="bg-primary hover:bg-hovercolor text-white font-bold py-2 px-4 rounded mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default ProfileModal
