import axiosClient from './axiosClient'

const storeAPI = {
    getAll: () => axiosClient.get('/store/'),
    saveLink: data => axiosClient.post('/store/', data),
    deleteLink: id => axiosClient.delete(`/store/${id}`),
    editLink: (id, data) => axiosClient.put(`/store/${id}`, data),
    searchLink: (query) => axiosClient.get('/store/search/', {params:query})
}

export default storeAPI