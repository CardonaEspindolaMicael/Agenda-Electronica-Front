import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import desplegar from '/more.svg'

import './Dropdown.css'
const Dropdown = ({ title, links,icon}) => {
  const [isOpen, setIsOpen] = useState(false);

  return ( 
<>
  <div className='dropdownContainer'>
    <li onMouseEnter={() => setIsOpen(!isOpen)} onMouseLeave={()=>setIsOpen(false)}>
    <div className='dropdownContainer__Icon'>
      <img src={icon} />
        <Link className='barra__navegacionRutasAb' to="#">{title}</Link>
      </div>
      <div>
        <img className='flechaCambio' src={desplegar} />
      </div>
      
      </li>
      <div className={`dropdown-menu${isOpen ? 'activate' : 'inactive'}`} onMouseEnter={()=>setIsOpen(isOpen)} onMouseLeave={()=>setIsOpen(!isOpen)}>
        {links.map((link, index) => (
          <li key={index} className="dropdown-item" >
            <img src={link.icon} />
            <Link className='barra__navegacionRutasAb' to={link.path}>{link.text}</Link>
          </li>
        ))}
      </div>
    </div>
    </>
  );
};

export default Dropdown;
