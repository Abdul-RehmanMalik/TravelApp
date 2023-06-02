interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  if (!isOpen) {
    return null
  }

  const handleHireMeClick = () => {
    // Handle hire me button click
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="relative bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
          <img
            src=""
            className="flex-shrink-0 object-cover object-center btn- flex w-16 h-16 mr-auto -mb-8 ml-auto rounded-full shadow-xl"
            alt="Profile"
          />
          <p className="mt-8 text-xl font-semibold leading-none text-black tracking-tighter lg:text-3xl">
            Abdul Rehman
          </p>
          <div className="w-full mt-6">
            <button
              className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base font-medium text-white bg-primary rounded-xl transition duration-500 ease-in-out transform hover:bg-hovercolor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleHireMeClick}
            >
              Update Password
            </button>
          </div>
          <div className="w-full mt-4">
            <button className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base font-medium text-white bg-primary rounded-xl transition duration-500 ease-in-out transform hover:bg-hovercolor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Update Name
            </button>
          </div>
          <div className="w-full mt-4">
            <button className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base font-medium text-white bg-primary rounded-xl transition duration-500 ease-in-out transform hover:bg-hovercolor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Update Email
            </button>
          </div>
          <div className="w-full mt-4">
            <button className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base font-medium text-white bg-primary rounded-xl transition duration-500 ease-in-out transform hover:bg-hovercolor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Update Address
            </button>
          </div>
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

export default SettingsModal
