import React from 'react'
import './style.scss'
import { Button, Input } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actfetchAllTask, setNewPage, setSearchKey } from '../../redux/features/tasks/taskSlice'
import { TASK_STATUS } from '../../constants/task.constant'

const HeaderComponent = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const searchKey = useSelector(state => state.task.searchKey)
    const pagination = useSelector(state => state.task.pagination)
    const location = useLocation()

    const handleRedirectAddTask = () => {
        navigate('/addnewtasks')
    }
    const computedCurrendStatusSearch = (pathName) => {
        switch (pathName) {
            case '/alltasks': return ""
            case '/newtasks': return TASK_STATUS.NEW
            case '/doingtasks': return TASK_STATUS.DOING
            case '/donetasks': return TASK_STATUS.DONE
            default: return ""
        }
    }
    const statusSearch = computedCurrendStatusSearch(location.pathname)

    const handleSearchTask = (event) => {
        event.preventDefault();
        dispatch(actfetchAllTask({
            _page: 1,
            _limit: pagination.limitPerPage,
            q: searchKey,
            ...(!!statusSearch ? { status: statusSearch } : {})
        }))
        dispatch(setNewPage(1));
    }
    const handleChangeInputSearch = (event) => {
        const value = event.target.value
        dispatch(setSearchKey(value))
    }
    const handleSubmitSearch = (event) => {
        event.preventDefault();
        dispatch(actfetchAllTask({
            _page: 1,
            _limit: pagination.limitPerPage,
            q: searchKey
        }))
        dispatch(setNewPage(1));
    }
    return (
        <div className='header-container'>
            <Button onClick={handleRedirectAddTask}>Create New Task</Button>
            <form className='header-container__search-area' onSubmit={handleSearchTask}>
                <Input
                    value={searchKey}
                    onChange={handleChangeInputSearch}
                    placeholder='Please input search...'></Input>
                <Button onClick={handleSubmitSearch} type='submit'>Search</Button>
            </form>
        </div>
    )
}

export default HeaderComponent