import { useContext, useState } from 'react'
import apiInstance from '../axios'
import { AppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const appContext = useContext(AppContext)
  const navigate = useNavigate()
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  const handleSignOut = async () => {
    try {
      if (appContext.logout) {
        appContext.logout()
        navigate('/')
      }
    } catch (error: any) {
      console.log('Logout failed:', error)
    }

    setIsDropdownOpen(false)
  }
  return (
    <nav className="bg-white shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <svg
                className="h-6 w-6 mr-2 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <span className="text-lg font-medium text-gray-900">Home</span>
            </a>
            <div className="ml-8">
              <div className="flex space-x-4">
                {/* Search Bar */}
                <SearchBar />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {/* Profile Picture */}
            <div className="relative ml-3">
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex text-sm bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary"
                id="user-menu"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <img className="h-8 w-8 rounded-full" src="" alt="Profile" />
              </button>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
