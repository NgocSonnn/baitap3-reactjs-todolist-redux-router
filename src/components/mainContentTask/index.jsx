import React from 'react'
import './style.scss'
import Task from '../task'


const MainContentTask = (props) => {

    const renderTask = (tasks) => {
        return tasks.map((_task) => {
            return <Task key={_task.id} _task={_task}></Task>
        })
    }
    return (
        <div className='main-content-task'>
            {renderTask(props.tasks)}
        </div>
    )
}

export default MainContentTask