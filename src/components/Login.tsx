import { useState, FormEvent, useContext } from 'react'
import { loginFields } from '../constants/formFields'
import Input from './Input'
import FormAction from './FormAction'
import FormExtra from './FormExtra'
import apiInstance from '../axios'
import SuccessSnackbar from './SuccessResponseSnackbar'
import FailureSnackbar from './FailureResponseSnackbar'
import { AppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
const fields = loginFields
let fieldsState: { [key: string]: string } = {}
fields.forEach((field) => (fieldsState[field.id] = ''))

const Login = () => {
  const [loginState, setLoginState] = useState(fieldsState)
  const appContext = useContext(AppContext)
  const navigate = useNavigate()
  const handleChange = (e: { target: { id: any; value: any } }) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value })
  }
  const [response, setResponse] = useState('')
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    authenticateUser()
  }

  //console.log(loginState);

  const getLoginReqData = () => ({
    email: loginState.email,
    password: loginState.password,
  })
  console.log(getLoginReqData())
  const authenticateUser = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      console.log('Access Token in start:', accessToken)
      console.log(appContext.userId)
      console.log(appContext.loggedIn)
      console.log(appContext.checkingSession)
      console.log(appContext.isActivated)
      //console.log("called");
      const response = await apiInstance.post('/auth/login', getLoginReqData())
      setResponse(response.data)
      // console.log('tokens:', response.data.tokens)
      // console.log('id from data:', response.data.id)
      const { tokens } = response.data
      const { id } = response.data
      const { isActivated } = response.data

      appContext.setUserId?.(id)
      appContext.setLoggedIn?.(true)
      appContext.setIsActivated?.(isActivated)
      localStorage.setItem('accessToken', tokens.accessToken)
      apiInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${accessToken}`
      if (response.data.tokens) {
        setIsSuccess(true)
        navigate('/home')
      } else {
        setIsSuccess(false)
      }
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
            value={loginState[field.id]}
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
          message={'Login Successful...!'}
          onClose={() => setShowSnackbar(false)}
        />
      )}
      {showSnackbar && !isSuccess && (
        <FailureSnackbar
          message={response}
          onClose={() => setShowSnackbar(false)}
        />
      )}
      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  )
}

export default Login
