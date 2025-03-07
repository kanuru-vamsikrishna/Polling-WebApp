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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

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
        {type === "password" && (
          <div>
            {showPassword ? (
            <i className="bi bi-eye text-blue-400 cursor-pointer" onClick={() => toggleShowPassword()} style={{ fontSize: "17px" }}></i>
            ) : (
              <i className="bi bi-eye-slash text-slate-400 cursor-pointer" onClick={() => toggleShowPassword()} style={{ fontSize: "17      px" }}></i>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthInput