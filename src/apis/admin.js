import axiosClient from "./axiosClient";

const adminAPI = {
  getAllUsers: () => axiosClient.get("/admin/users"),
  deleteUser: (id) => axiosClient.delete(`/admin/users/${id}`),
};

export default adminAPI;
