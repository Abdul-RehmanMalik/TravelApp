import { useState, useEffect, FormEvent } from 'react'
import { resetPasswordFields } from '../constants/formFields'
import Input from './Input'
import FormAction from './FormAction'
import apiInstance from '../axios'
import SuccessSnackbar from './SuccessResponseSnackbar'
import FailureSnackbar from './FailureResponseSnackbar'
import { useLocation } from 'react-router-dom'
const fields = resetPasswordFields
let fieldsState: { [key: string]: string } = {}
fields.forEach((field) => (fieldsState[field.id] = ''))

const Resetpassword = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token')
  const id = searchParams.get('id')

  const [passwordState, setPasswordState] = useState(fieldsState)

  useEffect(() => {
    if (token && id) {
      setPasswordState({ ...passwordState, token, id })
    }
  }, [token, id])

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
  const getResetPasswordReqData = () => ({
    email: passwordState.email,
    password: passwordState.password,
    token: passwordState.token,
    id: passwordState.id
  })
  console.log(getResetPasswordReqData())
  const authenticateUser = async () => {
    try {
      //console.log("called");
      const response = await apiInstance.post(
        '/auth/resetpassword',
        getResetPasswordReqData()
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
      <FormAction handleSubmit={handleSubmit} text="Change Password" />
    </form>
  )
}

export default Resetpassword
