import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useFetch from "../../hooks/useFetch";
import adminAPI from "../../apis/admin";

function Users() {
  const [users, setUsers] = useState([]);
  const fetch = useFetch();

  useEffect(() => {
    (async () => {
      const resData = await fetch(adminAPI.getAllUsers);
      setUsers(resData);
    })();
  }, [fetch]);

  const handleDelete = async (id) => {
    await fetch(() => adminAPI.deleteUser(id));
    toast.success("Delete user successfully");
    setUsers((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <>
      {users.map((user, index) => (
        <li key={index}>
          {user.username}
          <span onClick={() => handleDelete(user._id)}> &times; </span>
        </li>
      ))}
    </>
  );
}

export default Users;
