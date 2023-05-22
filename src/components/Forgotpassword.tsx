import { useState, FormEvent } from 'react'
import { forgotPasswordFields } from '../constants/formFields'
import Input from './Input'
import FormAction from './FormAction'
const fields = forgotPasswordFields
let fieldsState: { [key: string]: string } = {}
fields.forEach((field) => (fieldsState[field.id] = ''))

const Forgotpassword = () => {
  const [passwordState, setPasswordState] = useState(fieldsState)

  const handleChange = (e: { target: { id: any; value: any } }) => {
    setPasswordState({ ...passwordState, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    authenticateUser()
  }

  const authenticateUser = () => {}

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
      <FormAction handleSubmit={handleSubmit} text="Send" />
    </form>
  )
}

export default Forgotpassword
