import React from 'react'
import Header from '../../components/HEADER/header'

import './_StyleDashboard.css'
import Sidebar from '../../components/sidebar/sidebar'
import { Outlet } from 'react-router'

const Dashboard = () => {
  return (
    <div style={{backgroundColor:'#283048' }} className="container">
    <Header className="header "/>
    <Sidebar className="sidebar "/>
    <section className="leyenda bg-dark text-light ">
     <Outlet/>
    </section>
  </div>   
  ) 
}

export default Dashboard