import { useState } from 'react';
import style from './App.module.css';
import TreeLocations from './Components/TreeLocations/TreeLocations';
import HierarchyConfiguration from './Components/HierarchyConfiguration/HierarchyConfiguration';
import CityInfo from './Components/CityInfo/CityInfo';

function App() {
  var {0: isOpen, 1: setIsOpen} = useState(false)
  var {0: modalWindowProps, 1: setModalWindowProps} = useState({city: "", residents: 0, name: ""})
  return (
    <div className={style.App}>
      <TreeLocations setIsOpen={setIsOpen} setModalWindowProps={setModalWindowProps}/>
      <div className={style.tehnical_bar}>
          <HierarchyConfiguration/>
          <CityInfo isOpen={isOpen} city={modalWindowProps.city} residents={modalWindowProps.residents} name={modalWindowProps.name} setIsOpen={setIsOpen}/>
      </div>
      
   
    </div>
  );
}

export default App;
