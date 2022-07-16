import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import Header from "../../components/Header";
import style from "./HomePage.module.scss";

function HomePage() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate("/store");
    }
  }, [navigate, isLogin]);
  return (
    <>
      <Header />
      <div className={clsx(style.homeContent)}>
        <p>
          Welcome to link store app, an app can help you store and manage your
          links.
        </p>
        <div>
          <div>
            <span>Easy and</span>
            <span>Convenient</span>
          </div>
          <span>to</span>
          <div>
            <span>save,</span>
            <span>search,</span>
            <span>& access</span>
          </div>
        </div>
        <hr />
        <p>
          <Link to="/register">Sign up</Link> or{" "}
          <Link to="/login">Sign in</Link> to start.
        </p>
      </div>
    </>
  );
}

export default HomePage;
