import React, { useState } from 'react'

const AuthInput = (props) => {
  const {
    value,
    onChange,
    label,
    placeholder,
    type,
  } = props

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="input-box">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : "text"
        }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={(e) => onChange(e)}
        />
      </div>
    </div>
  )
}

export default AuthInput