import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import Users from "../../components/Users";

function AdminPage() {
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      toast.error("You are not admin");
      navigate("/store");
    }
  }, [role, navigate]);
  return (
    <>
      <Header />
      <Users />
    </>
  );
}

export default AdminPage;
