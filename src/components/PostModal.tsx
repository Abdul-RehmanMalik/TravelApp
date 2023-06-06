import React, { useState, useContext } from 'react'
import apiInstance from '../axios'
import { AppContext } from '../context/appContext'
import SuccessSnackbar from './SuccessResponseSnackbar'
import FailureSnackbar from './FailureResponseSnackbar'

interface PostModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PostModal({ isOpen, onClose }: PostModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [response, setResponse] = useState('')

  const appContext = useContext(AppContext)

  const handleDescriptionChange: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = (e) => {
    setDescription(e.target.value)
  }

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value)
  }

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileList = Array.from(e.target.files)
      setImages(fileList)
    }
  }

  const handleSubmit = async () => {
    const postData = new FormData()
    postData.append('title', title)
    postData.append('description', description)
    postData.append('postedBy[userId]', String(appContext.userId))
    postData.append('postedBy[username]', appContext.username)
    postData.append('postedBy[profilePicture]', appContext.profilePicture)

    images.forEach((image, index) => {
      postData.append(`images`, image)
    })

    try {
      const response = await apiInstance.post('/posts/createpost', postData)
      console.log('Response:', response.data)
      setResponse(response.data)
      setIsSuccess(true)
      // setShowSnackbar(true);
    } catch (error: any) {
      console.log(error)
      const errorMessage = error.response?.data || 'Something went wrong'
      setResponse(errorMessage)
      setIsSuccess(false)
    }

    setTitle('')
    setDescription('')
    setImages([])
    onClose()
  }

  return (
    <>
      {isOpen && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Create a Post</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="mb-4">
                    <label htmlFor="title" className="text-lg">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={handleTitleChange}
                      className="border border-gray-300 p-2 mt-1 rounded w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="text-lg">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={handleDescriptionChange}
                      className="border border-gray-300 p-2 mt-1 rounded w-full"
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="image" className="text-lg "></label>
                    <input
                      type="file"
                      id="image"
                      onChange={handleImageChange}
                      className="mt-1"
                      multiple // Added attribute for multiple image upload
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-white-600 text-red-600 active:bg-red-600  hover:bg-red-600 hover:text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <button
                    className="bg-primary text-white active:bg-primary font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          {/* {showSnackbar && isSuccess && (
            <SuccessSnackbar
              message={response}
              onClose={() => setShowSnackbar(false)}
            />
          )}
          {showSnackbar && !isSuccess && (
            <FailureSnackbar
              message={response}
              onClose={() => setShowSnackbar(false)}
            />
          )} */}
        </>
      )}
    </>
  )
}
