import React, { useState, useContext } from 'react'
import apiInstance from '../axios'
import { AppContext } from '../context/appContext'

interface PostModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PostModal({ isOpen, onClose }: PostModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState<number | ''>(0)
  const [heritage, setHeritage] = useState('')
  const [placesToVisit, setPlacesToVisit] = useState<string[]>([])
  const [communityAccess, setCommunityAccess] = useState('')
  const [easeOfTransportation, setEaseOfTransportation] = useState('')
  const [safety, setSafety] = useState('')
  const [location, setLocation] = useState('')
  const [images, setImages] = useState<File[]>([])

  const appContext = useContext(AppContext)

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('postedBy', String(appContext.userId))
    formData.append('cost', String(cost))
    formData.append('heritage', heritage)
    placesToVisit.forEach((place, index) => {
      formData.append(`placesToVisit[${index}]`, place)
    })
    formData.append('communityAccess', communityAccess)
    formData.append('easeOfTransportation', easeOfTransportation)
    formData.append('safety', safety)
    formData.append('location', location)

    images.forEach((image, index) => {
      formData.append(`images`, image)
    })

    try {
      console.log('formdata:', formData)
      await apiInstance.post('/posts/createpost', formData)
      onClose()
    } catch (error: any) {
      console.log(error)
    }

    setTitle('')
    setDescription('')
    setCost(0)
    setHeritage('')
    setPlacesToVisit([])
    setCommunityAccess('')
    setEaseOfTransportation('')
    setSafety('')
    setLocation('')
    setImages([])
  }

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCost(value !== '' ? Number(value) : '')
  }

  const handleCostFocus = () => {
    if (cost === 0) {
      setCost('')
    }
  }

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileList = Array.from(e.target.files)
      setImages(fileList)
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-1/2">
            <div className="flex justify-between items-center bg-primary p-4">
              <h3 className="text-white font-semibold">Create a Post</h3>
              <button
                className="text-white hover:text-red-600 focus:outline-red-600"
                onClick={onClose}
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-4"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-4"
              ></textarea>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-4"
              />
              <input
                type="number"
                placeholder="Cost"
                value={cost}
                onChange={handleCostChange}
                onFocus={handleCostFocus}
                className="border border-gray-300 p-2 rounded w-full mb-4"
              />
              <input
                type="text"
                placeholder="Heritage"
                value={heritage}
                onChange={(e) => setHeritage(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-4"
              />
              <textarea
                placeholder="Places to Visit (one per line)"
                value={placesToVisit.join('\n')}
                onChange={(e) => setPlacesToVisit(e.target.value.split('\n'))}
                className="border border-gray-300 p-2 rounded w-full mb-4"
              ></textarea>
              <input
                type="text"
                placeholder="Community Access"
                value={communityAccess}
                onChange={(e) => setCommunityAccess(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-4"
              />
              <input
                type="text"
                placeholder="Ease of Transportation"
                value={easeOfTransportation}
                onChange={(e) => setEaseOfTransportation(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-4"
              />
              <input
                type="text"
                placeholder="Safety"
                value={safety}
                onChange={(e) => setSafety(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-4"
              />
              <input
                className="ml-0 mb-4"
                type="file"
                onChange={handleImageChange}
                multiple
              />
              <div className="flex justify-end">
                <button
                  className="bg-red-600 text-white active:bg-white hover:bg-white hover:text-red-600 font-semibold px-4 py-2 rounded mr-2"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="bg-primary text-white active:bg-white hover:bg-white hover:text-primary font-semibold px-4 py-2 rounded"
                  onClick={handleSubmit}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
