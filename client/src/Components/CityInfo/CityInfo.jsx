import React from 'react'
import style from "./CityInfo.module.css"

export default function CityInfo({isOpen, city, residents, name, setIsOpen}) {
  return (
    <div className={style.main} onClick={() => setIsOpen(false)}>
      {isOpen ? 
      <div className={style.main_modal_window}>
        <p>Имя: {name}</p>
        <p>Город: {city}</p>
        <p>Население: {residents}</p>
      </div> : <div></div>
      }
    </div>
  )
}
