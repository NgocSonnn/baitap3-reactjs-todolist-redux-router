import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TaskApi } from "../../../apis/taskApi"
import { message } from "antd";

const initialState = {
    isLoading: false,
    tasks: [],
    currentTask: {},
    error: {},
    pagination: {
        currentPage: 1,
        limitPerPage: 8,
        total: 8,

    },
    searchKey: "",
    sortField: "createAt",
    sortOrder: "desc",
}
export const actfetchAllTask = createAsyncThunk('task/fetchAllTask',
    async (params = {}) => {
        const response = await TaskApi.getAllTask(params);
        return {
            data: response.data,
            total: response.headers.get('X-Total-Count')
        }
    }
)

export const actFetchTaskById = createAsyncThunk('task/actFetchTaskById',
    async (taskId) => {
        const task = await TaskApi.getTaskById(taskId);
        return task
    }
)
export const actCreateNewTask = (task) => {
    return async () => {
        try {
            await TaskApi.createTask(task);
            message.success("Create Task success!!!!")
        } catch (error) {
            console.log(error, 'error');
        }
    }
}

export const actUpdateTaskById = createAsyncThunk("task/updateTaskById", async ({ id, taskUpdate }) => {
    await TaskApi.updateTaskById(id, taskUpdate);
    return null
})

export const actDeleteById = createAsyncThunk("task/actDeleteById", async (id) => {
    await TaskApi.deleteTaskById(id)
    return null
})

const taskSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {

        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        resetCurrentTask: (state, action) => {
            state.currentTask = {};
        },
        setNewPage: (state, action) => {
            state.pagination = {
                ...state.pagination,
                currentPage: action.payload,
            }
        },
        setSearchKey: (state, action) => {
            state.searchKey = action.payload
        },

        setSortField: (state, action) => {
            state.sortField = action.payload
        },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actfetchAllTask.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(actfetchAllTask.rejected, (state, action) => {
            state.error = {};
            state.isLoading = false;

        })
        builder.addCase(actfetchAllTask.fulfilled, (state, action) => {
            state.tasks = action.payload.data
            state.isLoading = false;
            state.pagination.total = action.payload.total

        })
        builder.addCase(actFetchTaskById.fulfilled, (state, action) => {
            state.currentTask = action.payload;
        })
        builder.addCase(actUpdateTaskById.fulfilled, (state, action) => {
            message.success("Update Task success!!!!")
        })
        builder.addCase(actDeleteById.fulfilled, (state, action) => {
            message.success("Delete Task success!!!!")
        })
    }
})


export const { getAllTasks, setLoading, setNewPage, setSearchKey, setSortField, setSortOrder } = taskSlice.actions
export const taskReducer = taskSlice.reducer