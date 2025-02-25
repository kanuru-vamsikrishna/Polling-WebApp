import React from 'react'
import polling_display from "../../assets/images/polling_display.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-1/2 px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Polling App</h2>
       {children}
      </div>
      <div className="hidden md:block w-1/2 h-screen bg-sky-100">
        <img src={polling_display} alt={polling_display} />
      </div>
    </div>
  )
}

export default AuthLayout