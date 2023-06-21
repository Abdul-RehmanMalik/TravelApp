import { useContext, useState } from 'react'
import VerificationPopUp from '../components/VerificationPopup'
import { AppContext } from '../context/appContext'
import PostModal from '../components/PostModal'
import ProfileModal from '../components/ProfileModal'
import SettingsModal from '../components/SettingsModal'
import Feed from '../components/PostsFeed'
import NavbarModified from '../components/bar'

export default function HomePage() {
  const appContext = useContext(AppContext)
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [myPostsUserId, setMyPostsUserId] = useState<number | null>(null)

  const handleProfileModal = () => {
    setIsProfileOpen(true)
  }

  const closeProfileModal = () => {
    setIsProfileOpen(false)
  }

  const handleCreatePost = () => {
    setIsPostModalOpen(true)
  }

  const handleSettings = () => {
    setIsSettingsOpen(true)
  }

  const closeSettings = () => {
    setIsSettingsOpen(false)
  }

  const handleMyPosts = () => {
    if (appContext.loggedIn && appContext.userId) {
      setMyPostsUserId(appContext.userId)
    } else {
      setMyPostsUserId(null)
    }
  }
  const handleHome = () => {
    setMyPostsUserId(null)
  }
  console.log('userId:', appContext.userId)

  return (
    <>
      {/* <Navbar
        onCreatePost={handleCreatePost}
        onSettings={handleSettings}
        onProfile={handleProfileModal}
        onMyPosts={handleMyPosts}
        onHome={handleHome}
      /> */}
      <NavbarModified onSettings={handleSettings} />

      {isPostModalOpen && (
        <PostModal
          isOpen={isPostModalOpen}
          onClose={() => setIsPostModalOpen(false)}
        />
      )}
      {/* <ProfileModal isOpen={isProfileOpen} onClose={closeProfileModal} /> */}
      <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
      {/* <div className="flex justify-center mt-6 sm:mt-12"> */}
      <Feed userId={myPostsUserId} />
      {/* </div> */}
      {appContext.isActivated ? null : (
        <VerificationPopUp isOpen={true} isVerified={false} />
      )}
      {/* other components here */}
    </>
  )
}
