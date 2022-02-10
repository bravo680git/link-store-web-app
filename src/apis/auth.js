
import axiosClient from "./axiosClient"

const authAPI = {
    login : account => axiosClient.post('/auth/login', account),
    register : account => axiosClient.post('/auth/register', account)
}

export default authAPI