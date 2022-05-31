import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import Header from "../../components/Header";

function LoginPage() {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);
  useEffect(() => {
    if (isLogin) {
      navigate("/store");
    }
  }, [isLogin, navigate]);

  return (
    <>
      <Header />
      <AuthForm type="login" />
    </>
  );
}

export default LoginPage;
