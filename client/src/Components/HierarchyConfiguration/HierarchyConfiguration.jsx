import React from 'react'
import style from "./HierarchyConfiguration.module.css"
import { useRef } from 'react'
import treeModule from '../../Modules/TreeModule'
import { useState } from 'react'


export default function HierarchyConfiguration() {
    var {0: needReduildTree, 1: setNeedRebuildTree} = useState(false)
    var checkedElements = useRef(new Set())

    var chooseElement = (e) => {
        if(e.target.checked === true) {
            checkedElements.current.add(e.target.name)
        }
        if(e.target.checked === false) {
            checkedElements.current.delete(e.target.name)
        }
    }
    
    var changeConfiguration = () => {
        treeModule.changeConfiguration(checkedElements.current)
        checkedElements.current = new Set()
        setNeedRebuildTree(true)

    }

    var rebuildTree = () => {
        treeModule.buildTree()
        var checkboxes = document.querySelectorAll("." + style.configurations_checkbox)
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false
        })
        setNeedRebuildTree(false)
    }

  return (
    <div className={style.main}>
        <div className={style.configurations}>
            <div><input type="checkbox" id={style.checkbox_city} className={style.configurations_checkbox} name={"city"}  onChange={e => chooseElement(e)}/><label htmlFor={style.checkbox_city}>Город</label></div>
            <div><input type="checkbox" id={style.checkbox_district} className={style.configurations_checkbox} name={"district"}  onChange={e => chooseElement(e)}/><label htmlFor={style.checkbox_district}>Район</label></div>
            <div><input type="checkbox" id={style.checkbox_street} className={style.configurations_checkbox} name={"street"}  onChange={e => chooseElement(e)}/><label htmlFor={style.checkbox_street}>Улица</label></div>
            <div><input type="checkbox" id={style.checkbox_name} className={style.configurations_checkbox} name={"name"}  onChange={e => chooseElement(e)}/><label htmlFor={style.checkbox_name}>Имя</label></div>
        </div>
        <div className={style.buttons}>
            <button onClick={() => changeConfiguration()} className={needReduildTree ? style.buttons_disabled : style.buttons_active}>Изменить иерархию</button>
            <button onClick={() => rebuildTree()} className={needReduildTree ? style.buttons_active : style.buttons_disabled}>Вернуть</button>
        </div>
    </div>
  )
}
