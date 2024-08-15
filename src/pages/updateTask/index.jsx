/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import TaskForm from '../../components/taskForm'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { actFetchTaskById } from '../../redux/features/tasks/taskSlice'

const UpdateTask = () => {
    const task = useSelector(state => state.task.currentTask)
    const dispatch = useDispatch();
    const params = useParams();
    useEffect(() => {
        dispatch(actFetchTaskById(params.id))
    }, [params])
    return (
        <div><TaskForm isEdit={true} currentTask={task}></TaskForm></div>
    )
}

export default UpdateTask