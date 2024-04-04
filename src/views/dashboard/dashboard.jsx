import React from 'react'
import Header from '../../components/HEADER/header'

import './_StyleDashboard.css'
import Sidebar from '../../components/sidebar/sidebar'

const Dashboard = ({Contenido}) => {
  return (
    <div style={{backgroundColor:'#283048' }} className="container">
    <Header className="header "/>
    <Sidebar className="sidebar "/>
    <section className="bg-dark text-light ">
     {Contenido} 
    </section>
  </div>   
  ) 
}

export default Dashboard