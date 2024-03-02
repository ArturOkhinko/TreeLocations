import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ApiController from '../../Modules/ApiModule'
import style from "./TreeLocations.module.css"
import { useRef } from 'react'
import treeModule from '../../Modules/TreeModule'

export default function TreeLocations({setIsOpen, setModalWindowProps}) {
    var {0: locations, 1: setLocations} = useState([])
    var {0: citiesInfo, 1: setCitiesInfo} = useState([])
    var tree = useRef()

    useEffect(() => {
        (async () => {
            const locationsData = await ApiController.getLocations()
            const citiesData = await ApiController.getCity()
            setLocations(locationsData)
            setCitiesInfo(citiesData)
        }) ()
    }, [])
    
    useEffect(() => {
        if(locations[0]) {
            treeModule.buildTree(locations, tree.current, setIsOpen, setModalWindowProps, citiesInfo)
        }
    }, [locations])

  return (
    <div className={style.tree} ref={tree}>

    </div>
  )
}
