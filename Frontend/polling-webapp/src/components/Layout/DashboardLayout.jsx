import React from "react"
import Navbar from "./Navbar"
import SideMenu from "./SideMenu"

const DashboardLayout = ({ children, activeMenu }) => {
  return (
    <div>
      <div className="max-[1080px]: hidden">
        <SideMenu activeMenu={activeMenu} />
      </div>
      <Navbar />
      {children}
    </div>
  )
}

export default DashboardLayout