import React, { useEffect } from 'react'
import MainContentTask from '../../components/mainContentTask'
import { useDispatch, useSelector } from 'react-redux'
import { actfetchAllTask, setNewPage } from '../../redux/features/tasks/taskSlice';
import { Pagination, Spin } from 'antd';
import { TASK_STATUS } from '../../constants/task.constant';



const DoneTasks = () => {

    const dispath = useDispatch();
    const { isLoading, tasks, pagination, searchKey, sortField, sortOrder } = useSelector(state => state.task)
    useEffect(() => {
        dispath(actfetchAllTask({
            _page: 1,
            _limit: pagination.limitPerPage,
            q: searchKey,
            status: TASK_STATUS.DONE,
            _sort: sortField,
            _order: sortOrder

        }))
        return () => {
            dispath(setNewPage(1))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (isLoading) {
        return <Spin></Spin>
    }
    const handleChangePage = (newPage) => {
        dispath(setNewPage(newPage));
        dispath(actfetchAllTask({
            _page: newPage,
            _limit: pagination.limitPerPage,
            q: searchKey,
            status: TASK_STATUS.DONE,
            _sort: sortField,
            _order: sortOrder

        }))
    }

    return (
        <div>
            {
                tasks.length === 0 ? <div>No tasks</div> : <div><MainContentTask tasks={tasks}></MainContentTask>
                    <Pagination style={{ marginTop: 10 }} defaultPageSize={pagination.limitPerPage}
                        current={pagination.currentPage}
                        total={pagination.total}
                        onChange={handleChangePage}></Pagination></div>
            }
        </div>
    )
}
export default DoneTasks