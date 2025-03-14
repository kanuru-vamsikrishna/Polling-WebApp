import React, { useState } from 'react'
import AuthLayout from '../../components/Layout/AuthLayout'
import AuthInput from '../../components/input/AuthInput'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'

const LoginForm = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return;
    }

    if (!password) {
      setError("Please enter the password")
      return;
    }

    setError("")
  }

  return (
    <AuthLayout>
    <div className="lg:w-[100%] h-auto md:h-100 mt-10 md:mt-0 flex flex-col justify-center">
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
          <AuthInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary cursor-pointer">LOGIN</button>
          <p className="text-[13px] text-slate-800 mt-3">Don't have an account?{" "}
            <Link className="font-medium text-blue-400 underline" to="/sign-up">
              SignUp
            </Link>
          </p>
        </form>
    </div>
    </AuthLayout>
  )
}

export default LoginForm