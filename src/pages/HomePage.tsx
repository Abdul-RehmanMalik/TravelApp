import { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import VerificationPopUp from '../components/VerificationPopup'
import { AppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import PostModal from '../components/PostModal'
export default function HomePage() {
  const appContext = useContext(AppContext)
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const handleCreatePost = () => {
    setIsPostModalOpen(true)
  }
  // if (!appContext.loggedIn) {
  //   return <Navigate to="/" />
  // }
  const accessToken = localStorage.getItem('accessToken')
  //console.log(accessToken)
  console.log(appContext.userId)
  console.log('LoggedIn:', appContext.loggedIn)
  //console.log(appContext.checkingSession)
  console.log('isAct:', appContext.isActivated)

  console.log('user id:', appContext.userId)

  return (
    <>
      <Navbar onCreatePost={handleCreatePost} />
      {appContext.isActivated ? null : (
        <VerificationPopUp isOpen={true} isVerified={false} />
      )}
      {isPostModalOpen && (
        <PostModal
          isOpen={isPostModalOpen}
          onClose={() => setIsPostModalOpen(false)}
        />
      )}
      {/*other components here*/}{' '}
    </>
  )
}
