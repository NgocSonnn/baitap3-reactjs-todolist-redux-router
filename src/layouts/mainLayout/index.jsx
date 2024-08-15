import React from 'react'
import HeaderComponent from '../../components/headerComponent'
import SideBar from '../../components/sideBar'
import './style.scss'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div className='main-layout-container'>
            <HeaderComponent></HeaderComponent>
            <div className='main-layout-container__content'>
                <SideBar></SideBar>
                <div className='right-side'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}

export default MainLayout