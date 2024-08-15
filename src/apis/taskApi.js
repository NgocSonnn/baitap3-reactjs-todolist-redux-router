import axios from "axios"

export const TaskApi = {
    getAllTask: async (params) => {
        const response = await axios.get(`${process.env.REACT_APP_BE_URL}tasks`, {
            params
        })
        return response
    },
    getTaskById: async (id) => {
        const response = await axios.get(`${process.env.REACT_APP_BE_URL}tasks/${id}`)
        return response.data
    },
    createTask: async (task) => {
        return await axios.post(`${process.env.REACT_APP_BE_URL}tasks`, task)
    },
    updateTaskById: async (id, taskUpdate) => {
        return await axios.patch(`${process.env.REACT_APP_BE_URL}tasks/${id}`, taskUpdate)
    },
    deleteTaskById: async (id) => {
        return await axios.delete(`${process.env.REACT_APP_BE_URL}tasks/${id}`)
    }
}