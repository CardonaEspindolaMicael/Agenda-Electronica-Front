import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import desplegar from '/more.svg'

import './Dropdown.css'
const Dropdown = ({ title, links,icon}) => {
  const [isOpen, setIsOpen] = useState(false);

  return ( 
<>
  <div className='dropdownContainer'>
    <div onMouseEnter={() => setIsOpen(!isOpen)} onMouseLeave={()=>setIsOpen(false)}>
    <div className='dropdownContainer__Icon'>
      <img src={icon} />
        <Link className='barra__navegacionRutasAb' to="#">{title}</Link>
      </div>
      <div>
        <img className='flechaCambio' src={desplegar} />
      </div>
      
      </div>
      <div className={`dropdown-menu${isOpen ? 'activate' : 'inactive'}`} onMouseEnter={()=>setIsOpen(isOpen)} onMouseLeave={()=>setIsOpen(!isOpen)}>
        {links.map((link, index) => (
          <div key={index} className="dropdown-item" >
            <img src={link.icon} />
            <Link className='barra__navegacionRutasAb' to={link.path}>{link.text}</Link>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Dropdown;
