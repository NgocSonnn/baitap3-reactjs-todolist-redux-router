import React from 'react'
import './style.scss'
import { Link, useLocation } from 'react-router-dom'

const SideBar = () => {
    const location = useLocation();
    const { pathname } = location
    return (
        <div className='side-bar-container'>
            <ul className='side-bar-container__list'>
                <li className={`side-bar-container__list-item ${pathname === '/alltasks' ? "active" : ""}`}><Link to={'/alltasks'}>All Task</Link></li>
                <li className={`side-bar-container__list-item ${pathname === '/newtasks' ? "active" : ""}`}><Link to={'/newtasks'}>New Task</Link></li>
                <li className={`side-bar-container__list-item ${pathname === '/doingtasks' ? "active" : ""}`}><Link to={'/doingtasks'}>Doing Task</Link></li>
                <li className={`side-bar-container__list-item ${pathname === '/donetasks' ? "active" : ""}`}><Link to={'/donetasks'}>Done Task</Link></li>
            </ul>

        </div>
    )
}

export default SideBar