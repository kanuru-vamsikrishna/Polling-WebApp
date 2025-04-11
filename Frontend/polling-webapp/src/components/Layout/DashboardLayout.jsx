import React from "react"
import Navbar from "./Navbar"
import SideMenu from "./SideMenu"

const DashboardLayout = ({ children, activeMenu }) => {
  return (
    <div>
      <Navbar />
      <div>
        <SideMenu activeMenu={activeMenu} />
      </div>
      {children}
    </div>
  )
}

export default DashboardLayout