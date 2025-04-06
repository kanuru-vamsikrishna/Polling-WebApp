import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/Layout/AuthLayout'
import AuthInput from '../../components/input/AuthInput'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/UserContext'

const LoginForm = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate()

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

    // Login API
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      })

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token)
        updateUser(user)
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error, "error");
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again")
      }
    }
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