import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/Layout/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import AuthInput from '../../components/input/AuthInput';
import ProfilePhotoSelector from '../../components/input/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/UserContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadImage';

const SignUpForm = () => {

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
          setError("Please enter a valid email address")
          return;
        }
        if (!fullName) {
          setError("Please enter a full name")
              return;
        }
        if (!userName) {
          setError("Please enter the username")
              return;
        }
        if (!password) {
          setError("Please enter the password")
          return;
    }
    setError("")
    
    // Signup API.
    try {
      // Upload image if present
      let profileImageUrl = ""
      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imageUrl || ""
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        userName,
        password,
        profileImageUrl,
      })
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token)
        updateUser(user)
        navigate('/dashboard')
      }
    } catch (error) {
     if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again")
      }
    }
  }


  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-30 mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Join us today by entering your details below</p>
      </div>
      <form onSubmit={handleSubmit}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AuthInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="abc@example.com"
            type="text"
          />
       <AuthInput
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          label="Full Name"
          placeholder="Enter your full name"
          type="text"
        />
            <AuthInput
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              label="User Name"
              placeholder="@"
              type="text"
              />
          <AuthInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
            />
        </div>
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary cursor-pointer">Create Account</button>
          <p className="text-[13px] text-slate-800 mt-3">Already have an account?{" "}
            <Link className="font-medium text-blue-400 underline" to="/login">
              Login
            </Link>
          </p>
      </form>
    </AuthLayout>
  )
}

export default SignUpForm