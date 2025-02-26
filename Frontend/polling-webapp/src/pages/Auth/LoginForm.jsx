import React, { useState } from 'react'
import AuthLayout from '../../components/Layout/AuthLayout'
import AuthInput from '../../components/input/AuthInput'

const LoginForm = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const handleSubmit = () => {}

  return (
    <AuthLayout>
    <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
      <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700  mt-[5px] mb-6">Please enter your details to login</p>
        <form onSubmit={handleSubmit}>
          <AuthInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="abc@example.com"
            type="text"
          />
        </form>
    </div>
    </AuthLayout>
  )
}

export default LoginForm