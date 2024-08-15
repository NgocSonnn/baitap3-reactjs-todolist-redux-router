import React from 'react'
import './style.scss'
import { generatePath, useNavigate } from 'react-router-dom'
import { TASK_STATUS } from '../../constants/task.constant';



const Task = (props) => {
    const navigate = useNavigate();
    const handleRedirectToDetailPage = () => {
        const taskId = props._task.id
        navigate(generatePath('/updatetasks/:id', { id: taskId }))

    }
    const computedStatusColor = (status) => {
        switch (status) {
            case TASK_STATUS.NEW: return "blue "
            case TASK_STATUS.DOING: return "red"
            case TASK_STATUS.DONE: return "green"
            default:
                return "green";
        }
    }

    return (
        <div className='task-container'>
            <div className='task-container__title' onClick={handleRedirectToDetailPage}>Title: {props._task.title}</div>
            <div className='task-container__author'>Creator: {props._task.creator}</div>
            <div className='task-container__status'
                style={{
                    color: computedStatusColor(props._task.status)
                }}
            >Status: {props._task.status}</div>
            <div className='task-container__divider'></div>
            <div className='task-container__decription'>
                <div className='task-container__des-title'>Description: </div>
                <div className='task-container__des-content'>{props._task.description} </div>
            </div>
        </div>
    )
}

export default Task