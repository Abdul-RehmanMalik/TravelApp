import React, { useEffect } from 'react'

interface PopupProps {
  isOpen: boolean
  isVerified: boolean
}

const VerificationPopUp = ({ isOpen, isVerified }: PopupProps) => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined

    if (isVerified) {
      timeoutId = setTimeout(() => {
        // No close action needed for automatic closing
      }, 3)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isVerified])

  if (!isOpen) {
    return null // Don't render anything if the popup is closed
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl mb-2">Verification Status</h2>
        {isVerified ? (
          <p className="text-green-500">User is verified</p>
        ) : (
          <p className="text-red-500">User is not verified</p>
        )}
      </div>
    </div>
  )
}

export default VerificationPopUp
