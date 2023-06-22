import React, { useState } from 'react'
import apiInstance from '../axios'
import { useContext } from 'react'
import { AppContext } from '../context/appContext'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdatePasswordClick: () => void
  onUpdateUserinfoClick: () => void
}

const SettingsModal = ({
  isOpen,
  onUpdatePasswordClick,
  onUpdateUserinfoClick,
  onClose,
}: SettingsModalProps) => {
  if (!isOpen) {
    return null
  }

  const [response, setResponse] = useState('')
  const appContext = useContext(AppContext)

  const handleUpdatePasswordClick = () => {
    setIsDirty(true)
    // Handle update password button click
  }

  const handleChangeProfilePictureClick = () => {
    fileInputRef.current?.click()
  }

  const handleUpdateNameClick = () => {
    setIsDirty(true)
  }

  const handleUpdateEmailClick = () => {
    setIsDirty(true)
  }

  const handleUpdateAddressClick = () => {
    setIsDirty(true)
  }

  const handleSaveClick = async () => {
    try {
      if (selectedProfilePicture) {
        const formData = new FormData()
        formData.append('profilePicture', selectedProfilePicture)
        formData.append('id', String(appContext.userId))
        const response = await apiInstance.put(
          '/user/updateprofilepic',
          formData
        )
        setResponse(response.data)
      }
    } catch (error: any) {
      console.error('Error updating profile picture:', error)
      setResponse(error)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const selectedFile = files[0]
      setSelectedProfilePicture(selectedFile)
      setIsDirty(true)
    }
  }

  const [selectedProfilePicture, setSelectedProfilePicture] =
    useState<File | null>(null)
  const fileInputRef = React.createRef<HTMLInputElement>()
  const [isDirty, setIsDirty] = useState(false)

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="relative bg-white p-4 rounded-lg w-66 h-66 sm:max-w-sm md:max-w-md lg:max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
          <img
            src={
              selectedProfilePicture
                ? URL.createObjectURL(selectedProfilePicture)
                : appContext.profilePicture
            }
            className="flex-shrink-0 object-cover object-center btn- flex w-16 h-16 mr-auto -mb-8 ml-auto rounded-full shadow-xl"
            alt="Profile"
          />
          <p className="mt-12 text-lg font-semibold leading-none text-black tracking-tighter lg:text-3xl">
            {appContext.username}
          </p>
          <div className="w-full mt-6">
            <button
              className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base font-medium text-white bg-primary rounded-xl transition duration-500 ease-in-out transform hover:bg-hovercolor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onUpdatePasswordClick}
            >
              Update Password
            </button>
          </div>
          <div className="w-full mt-4">
            <button
              className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base font-medium text-white bg-primary rounded-xl transition duration-500 ease-in-out transform hover:bg-hovercolor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              onClick={handleChangeProfilePictureClick}
            >
              Change Profile Picture
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>
          <div className="w-full mt-4">
            <button
              className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base font-medium text-white bg-primary rounded-xl transition duration-500 ease-in-out transform hover:bg-hovercolor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              onClick={onUpdateUserinfoClick}
            >
              Update Info
            </button>
          </div>
          {/* <div className="w-full mt-4"> */}
          {/* <button
              className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base font-medium text-white bg-primary rounded-xl transition duration-500 ease-in-out transform hover:bg-hovercolor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              onClick={handleUpdateEmailClick}
            >
              Update Email
            </button>
          </div>
          <div className="w-full mt-4">
            <button
              className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base font-medium text-white bg-primary rounded-xl transition duration-500 ease-in-out transform hover:bg-hovercolor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              onClick={handleUpdateAddressClick}
            >
              Update Address
            </button> */}
          {/* </div> */}
        </div>
        <div className="flex justify-end mt-4">
          {isDirty && (
            <button
              className="bg-primary hover:bg-hovercolor text-white font-bold py-2 px-4 rounded m-2"
              onClick={handleSaveClick}
            >
              Save
            </button>
          )}
          <button
            className="bg-primary hover:bg-red-600 text-white font-bold py-2 px-4 rounded m-2"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
