import React, { useState } from 'react'
import AuthLayout from '../../components/Layout/AuthLayout'
import { useNavigate } from 'react-router-dom';
import AuthInput from '../../components/input/AuthInput';
import ProfilePhotoSelector from '../../components/input/ProfilePhotoSelector';

const SignUpForm = () => {

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
  }


  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Join us today by entering your details below</p>
      </div>

      <form onSubmit={handleSubmit}>
       <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}  />
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
          placeholder=""
          type="text"
        />
        <AuthInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          placeholder="abc@example.com"
          type="text"
        />
        <AuthInput
          value={userName}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Min 8 characters"
          type="password"
        />
      </form>
    </AuthLayout>
  )
}

export default SignUpForm