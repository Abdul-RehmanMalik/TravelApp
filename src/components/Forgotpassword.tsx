import { useState, FormEvent } from 'react'
import { forgotPasswordFields } from '../constants/formFields'
import Input from './Input'
import FormAction from './FormAction'
import apiInstance from '../axios'
import FailureSnackbar from './FailureResponseSnackbar'
import SuccessSnackbar from './SuccessResponseSnackbar'
import { useNavigate } from 'react-router-dom'

const fields = forgotPasswordFields
let fieldsState: { [key: string]: string } = {}
fields.forEach((field) => (fieldsState[field.id] = ''))

const Forgotpassword = () => {
  const [passwordState, setPasswordState] = useState(fieldsState)
  const navigate = useNavigate()

  const handleChange = (e: { target: { id: any; value: any } }) => {
    setPasswordState({ ...passwordState, [e.target.id]: e.target.value })
  }
  const [response, setResponse] = useState('')
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    authenticateUser()
  }
  const getForgotPasswordReqData = () => ({
    email: passwordState.email
  })
  console.log(getForgotPasswordReqData())

  const authenticateUser = async () => {
    try {
      //console.log("called");
      const response = await apiInstance.post(
        '/auth/forgotpassword',
        getForgotPasswordReqData()
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
  const handleSnackbarClose = () => {
    setShowSnackbar(false)
    if (isSuccess) {
      navigate('/resendpasswordresetmail')
    }
  }
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={passwordState[field.id]}
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
        <SuccessSnackbar message={response} onClose={handleSnackbarClose} />
      )}
      {showSnackbar && !isSuccess && (
        <FailureSnackbar
          message={response}
          onClose={() => setShowSnackbar(false)}
        />
      )}
      <FormAction handleSubmit={handleSubmit} text="Send" />
    </form>
  )
}

export default Forgotpassword
