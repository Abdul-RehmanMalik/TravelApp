import { useContext, useState } from 'react'
import { AppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import NavBarDropDownMenu from './NavbarDropDownMenu'
import CreatePostButton from './CreatePostButton'

interface NavbarProps {
  onCreatePost: () => void
  onSettings: () => void
  onProfile: () => void
  onMyPosts: () => void
  onHome: () => void
}

export default function Navbar({
  onCreatePost,
  onSettings,
  onProfile,
  onMyPosts,
  onHome,
}: NavbarProps) {
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
            <a href="#" className="flex items-center" onClick={onHome}>
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
              <span className="px-4 py-2 bg-primary text-white active:bg-white hover:bg-white hover:text-primary rounded-md font-semibold shadow">
                Home
              </span>
            </a>
            <div className="ml-8">
              <div className="flex space-x-4">
                {/* Search Bar */}
                <SearchBar />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-4">
              {/* "My Posts" Button */}
              <button
                type="button"
                onClick={onMyPosts}
                className="px-4 py-2 bg-primary text-white active:bg-white hover:bg-white hover:text-primary rounded-md font-semibold shadow"
              >
                My Posts
              </button>
            </div>
            <div className="mr-4">
              <CreatePostButton onCreatePost={onCreatePost} />
            </div>
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
                <img
                  className="h-8 w-8 rounded-full"
                  src={appContext.profilePicture}
                  alt="Profile"
                />
              </button>
              {/* Dropdown Menu */}
              <NavBarDropDownMenu
                isOpen={isDropdownOpen}
                onSignOut={handleSignOut}
                onSettingsClick={onSettings}
                onProfileClick={onProfile}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
