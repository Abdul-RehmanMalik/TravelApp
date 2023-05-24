import Header from '../components/Header'
import Resetpassword from '../components/Resetpassword'
export default function ResetPasswordPage() {
  return (
    <>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {' '}
          <Header
            heading="Reset Your Password"
            paragraph=""
            linkName=""
            linkUrl=""
          />
          <Resetpassword />
        </div>
      </div>
    </>
  )
}
