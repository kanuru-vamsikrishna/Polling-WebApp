import React from 'react'
import { SIDE_MENU_DATA } from '../../utils/data'

const SideMenu = ({ activeMenu }) => {
  return (
    <div className="">
      {SIDE_MENU_DATA.map((item) => {
        item.label
      })}
    </div>
  )
}

export default SideMenu