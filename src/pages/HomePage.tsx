import { useContext, useState } from 'react'
import VerificationPopUp from '../components/VerificationPopup'
import { AppContext } from '../context/appContext'
import PostModal from '../components/PostModal'
import ProfileModal from '../components/ProfileModal'
import SettingsModal from '../components/SettingsModal'
import Feed from '../components/PostsFeed'
import NavbarModified from '../components/bar'
import UpdatePasswordModal from '../components/UpdatePasswordModal'
import UpdateUserInfoModal from '../components/UpdateUserinfo'

export default function HomePage() {
  const appContext = useContext(AppContext)
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [myPostsUserId, setMyPostsUserId] = useState<number | null>(null)
  const [isUpdatePasswordModalOpen, setIsUpdatePasswordModalOpen] =
    useState(false)
  const [isUpdateUserinfoModalOpen, setIsUpdateUserinfoModalOpen] =
    useState(false)
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
  const handleOpenUpdatePasswordModal = () => {
    setIsSettingsOpen(false)
    setIsUpdatePasswordModalOpen(true)
  }

  const handleCloseUpdateUserinfoModal = () => {
    setIsUpdateUserinfoModalOpen(false)
  }
  const handleOpenUpdateUserinfoModal = () => {
    setIsSettingsOpen(false)
    setIsUpdateUserinfoModalOpen(true)
  }

  const handleCloseUpdatePasswordModal = () => {
    setIsUpdatePasswordModalOpen(false)
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
      <NavbarModified
        onSettings={handleSettings}
        onCreatePost={handleCreatePost}
        onMyPosts={handleMyPosts}
        onHome={handleHome}
      />

      {isPostModalOpen && (
        <PostModal
          isOpen={isPostModalOpen}
          onClose={() => setIsPostModalOpen(false)}
        />
      )}
      {/* <ProfileModal isOpen={isProfileOpen} onClose={closeProfileModal} /> */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={closeSettings}
        onUpdatePasswordClick={handleOpenUpdatePasswordModal}
        onUpdateUserinfoClick={handleOpenUpdateUserinfoModal}
      />
      <UpdatePasswordModal
        isOpen={isUpdatePasswordModalOpen}
        onClose={handleCloseUpdatePasswordModal}
      />
      <UpdateUserInfoModal
        isOpen={isUpdateUserinfoModalOpen}
        onClose={handleCloseUpdateUserinfoModal}
      />
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
