import { useState, FormEvent } from 'react'
import { forgotPasswordFields } from '../constants/formFields'
import Input from './Input'
import FormAction from './FormAction'
import apiInstance from '../axios'
import FailureSnackbar from './FailureResponseSnackbar'
import SuccessSnackbar from './SuccessResponseSnackbar'
const fields = forgotPasswordFields //same fields as forgot password
let fieldsState: { [key: string]: string } = {}
fields.forEach((field) => (fieldsState[field.id] = ''))

const Resendpasswordresetmail = () => {
  const [ResendPasswordResetState, setResendPasswordResetState] =
    useState(fieldsState)

  const handleChange = (e: { target: { id: any; value: any } }) => {
    setResendPasswordResetState({
      ...ResendPasswordResetState,
      [e.target.id]: e.target.value
    })
  }
  const [response, setResponse] = useState('')
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    authenticateUser()
  }
  const getResendPasswordResetReqData = () => ({
    email: ResendPasswordResetState.email
  })
  console.log(getResendPasswordResetReqData())

  const authenticateUser = async () => {
    try {
      //console.log("called");
      const response = await apiInstance.post(
        '/auth/resendpasswordtoken',
        getResendPasswordResetReqData()
      )
      setResponse(response.data)
      setIsSuccess(true)
    } catch (error: any) {
      const errorMessage = error.response?.data || 'Something went wrong'
      setResponse(errorMessage)
      setIsSuccess(false)
      console.log(error)
    } finally {
      setShowSnackbar(true)
    }
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={ResendPasswordResetState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
            customClass=" "
          />
        ))}
      </div>
      {showSnackbar && isSuccess && (
        <SuccessSnackbar
          message={response}
          onClose={() => setShowSnackbar(false)}
        />
      )}
      {showSnackbar && !isSuccess && (
        <FailureSnackbar
          message={response}
          onClose={() => setShowSnackbar(false)}
        />
      )}
      <FormAction handleSubmit={handleSubmit} text="Resend Mail" />
    </form>
  )
}

export default Resendpasswordresetmail
