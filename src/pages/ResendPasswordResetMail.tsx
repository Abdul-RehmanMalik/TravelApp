import Header from '../components/Header'
import Resendpasswordresetmail from '../components/ResendPasswordResetMail'
export default function ResendPasswordResetPage() {
  return (
    <>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {' '}
          <Header
            heading="Didn't received the mail?"
            paragraph="Don't worry! Just Enter your Email"
            linkName=""
            linkUrl=""
          />
          <Resendpasswordresetmail />
        </div>
      </div>
    </>
  )
}
