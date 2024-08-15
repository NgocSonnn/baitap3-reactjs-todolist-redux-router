import React, { useEffect } from 'react'
import './style.scss'
import { Button, Input } from 'antd'
import { format } from 'date-fns'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { actCreateNewTask, actDeleteById, actUpdateTaskById } from '../../redux/features/tasks/taskSlice'
import { useNavigate } from 'react-router-dom'
import { TASK_STATUS } from '../../constants/task.constant'
import { Radio } from 'antd';

const schema = Yup.object().shape({
    title: Yup.string().required('Please input title'),
    creator: Yup.string().required('Please input creator'),
    description: Yup.string().required('Please input description'),

})

const TaskForm = ({ isEdit = false, currentTask }) => {

    const dispath = useDispatch();
    const navigate = useNavigate()
    const methods = useForm({
        defaultValues: {
            title: '',
            creator: '',
            createAt: new Date(),
            status: TASK_STATUS.NEW,
            description: '',
        },
        resolver: yupResolver(schema)
    });
    const { handleSubmit, control, formState: { errors }, reset } = methods
    const onValid = (formValue) => {
        if (isEdit) {
            dispath(actUpdateTaskById({
                id: currentTask.id,
                taskUpdate: formValue,
            }))
            return

        }
        dispath(actCreateNewTask(formValue))
        navigate('/alltasks')
    }
    useEffect(() => {
        if (isEdit && !!currentTask.createAt) {
            reset({ ...currentTask, createAt: new Date(currentTask.createAt) })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentTask])

    const handleResetForm = () => {
        reset({ ...currentTask, createAt: new Date(currentTask.createAt) })

    }
    const handdleDelTaskById = () => {
        dispath(actDeleteById(currentTask.id))
        navigate('/alltasks')

    }

    return (
        <div className='task-form-wrapper'>
            <form className='task-form-container' onSubmit={handleSubmit(onValid)}>
                <div className='task-form'>
                    <label className='task-form__label'>Title:</label>
                    <Controller
                        control={control}
                        name='title'
                        render={({ field }) => {
                            <Input placeholder='Please Input...'></Input>
                            return <Input placeholder='Please Input...' {...field}></Input>
                        }}
                    ></Controller>
                </div>
                {!!errors.title?.message && <span style={{ color: "red", marginLeft: '115px', marginTop: '-6px' }}>{errors.title?.message}</span>}
                <div className='task-form'>
                    <label className='task-form__label'>Creator:</label>
                    <Controller
                        control={control}
                        name='creator'
                        render={({ field }) => {
                            return <Input placeholder='Please Input...'{...field}></Input>
                        }}>
                    </Controller>
                </div>
                {!!errors.creator?.message && <span style={{ color: "red", marginLeft: '115px', marginTop: '-6px' }}>{errors.creator?.message}</span>}
                <div className='task-form'>
                    <label className='task-form__label'>Create At:</label>
                    <Controller
                        control={control}
                        name='createAt'
                        render={({ field }) => {
                            return <Input disabled value={format(field.value, 'yyyy-MM-dd HH:mm')}></Input>
                        }}>
                    </Controller>
                </div>
                <div className='task-form'>
                    <label className='task-form__label'>Description: </label>
                    <Controller
                        control={control}
                        name='description'
                        render={({ field }) => {
                            return <Input placeholder='Please Input...' {...field}></Input>
                        }}>
                    </Controller>

                </div>
                {!!errors.description?.message && <span style={{ color: "red", marginLeft: '115px', marginTop: '-6px' }}>{errors.description?.message}</span>}
                {isEdit && <div className='task-form'>
                    <label className='task-form__label'> </label>

                    <Controller control={control} name='status' render={({ field }) =>
                        <Radio.Group onChange={field.onChange} value={field.value}>
                            <Radio value={TASK_STATUS.NEW}>{TASK_STATUS.NEW}</Radio>
                            <Radio value={TASK_STATUS.DOING}>{TASK_STATUS.DOING}</Radio>
                            <Radio value={TASK_STATUS.DONE}>{TASK_STATUS.DONE}</Radio>
                        </Radio.Group>
                    }></Controller>
                </div>}
                <div className='task-form-btn'>
                    {isEdit && <Button onClick={handleResetForm} >Reset</Button>}
                    <Button htmlType='submit'>Save</Button>
                    {isEdit && <Button onClick={handdleDelTaskById}>Delete</Button>}
                </div>
            </form>
        </div>
    )
}

export default TaskForm