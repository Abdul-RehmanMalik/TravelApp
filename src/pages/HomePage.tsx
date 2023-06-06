import { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import VerificationPopUp from '../components/VerificationPopup'
import { AppContext } from '../context/appContext'
import PostModal from '../components/PostModal'
import ProfileModal from '../components/ProfileModal'
import SettingsModal from '../components/SettingsModal'
import Feed from '../components/PostsFeed'
export default function HomePage() {
  const appContext = useContext(AppContext)
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleProfileModal = () => {
    setIsProfileOpen(true)
    // setIsDropdownOpen(false)
  }
  const closeProfileModal = () => {
    setIsProfileOpen(false)
  }
  const handleCreatePost = () => {
    setIsPostModalOpen(true)
  }
  const handleSettings = () => {
    setIsSettingsOpen(true)
    // setIsDropdownOpen(false)
  }
  // if (!appContext.loggedIn) {
  //   return <Navigate to="/" />
  // }

  const closeSettings = () => {
    setIsSettingsOpen(false)
  }
  const accessToken = localStorage.getItem('accessToken')
  //console.log(accessToken)
  console.log(appContext.userId)
  console.log('LoggedIn:', appContext.loggedIn)
  //console.log(appContext.checkingSession)
  console.log('isAct:', appContext.isActivated)

  console.log('user id:', appContext.userId)
  console.log('Profilepic:', appContext.profilePicture)
  return (
    <>
      <Navbar
        onCreatePost={handleCreatePost}
        onSettings={handleSettings}
        onProfile={handleProfileModal}
      />
      {appContext.isActivated ? null : (
        <VerificationPopUp isOpen={true} isVerified={false} />
      )}
      {isPostModalOpen && (
        <PostModal
          isOpen={isPostModalOpen}
          onClose={() => setIsPostModalOpen(false)}
        />
      )}
      <ProfileModal isOpen={isProfileOpen} onClose={closeProfileModal} />
      <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}
      >
        <Feed />
      </div>
      {/*other components here*/}{' '}
    </>
  )
}
