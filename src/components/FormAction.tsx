import React, { FormEvent } from 'react'

interface FormActionProps {
  handleSubmit: (e: FormEvent) => void
  type?: 'Button'
  action?: 'submit' | 'reset' | 'button'
  text: string
}

const FormAction = ({
  handleSubmit,
  type = 'Button',
  action = 'submit',
  text
}: FormActionProps) => {
  return (
    <>
      {type === 'Button' ? (
        <button
          type={action}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-secondary bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mt-10"
          onClick={handleSubmit}
        >
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  )
}

export default FormAction
