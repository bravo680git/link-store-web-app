import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Content from "../../components/Content";
import Header from "../../components/Header";

function StorePage() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  return (
    <>
      <Header />
      <Content />
    </>
  );
}

export default StorePage;
