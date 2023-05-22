import { useState, FormEvent } from 'react'
import { signupFields } from '../constants/formFields'
import FormAction from './FormAction'
import Input from './Input'
import apiInstance from '../axios'
import SuccessSnackbar from './SuccessResponseSnackbar'
import FailureSnackbar from './FailureResponseSnackbar'
const fields = signupFields
let fieldsState: { [key: string]: string } = {}
fields.forEach((field) => (fieldsState[field.id] = ''))

const Signup = () => {
  const [signupState, setSignupState] = useState(fieldsState)

  const handleChange = (e: { target: { id: any; value: any } }) => {
    setSignupState({ ...signupState, [e.target.id]: e.target.value })
  }
  const [response, setResponse] = useState('')
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(signupState)
    createAccount()
  }
  console.log(signupState)
  const getSignUpReqData = () => ({
    name: signupState.username,
    email: signupState.email,
    password: signupState.password,
    address: signupState.address
  })
  console.log('SignUpReqData:', getSignUpReqData)
  const createAccount = async () => {
    try {
      console.log('called')
      const response = await apiInstance.post(
        '/auth/signup',
        getSignUpReqData()
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
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
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
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  )
}

export default Signup
