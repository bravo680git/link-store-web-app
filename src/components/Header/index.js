import clsx from "clsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import storeAPI from "../../apis/store";
import useHandleLogout from "../../hooks/useHandleLogout";
import { setData } from "../../store/dataSlice";
import { handleData } from "../../ultils/functions";
import style from "./Header.module.scss";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = useHandleLogout();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [query, setQuery] = useState("title");
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    if (!isLogin) return;
    try {
      const resData = await storeAPI.searchLink({ [query]: search });
      const returnData = handleData(resData);
      dispatch(setData(returnData));
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className={clsx(style.container)}>
      <header>
        <div className={clsx(style.searchBox)}>
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={query} onChange={(e) => setQuery(e.target.value)}>
            <option value="title">title</option>
            <option value="type">type</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>
        {!isLogin ? (
          <div className={clsx(style.btn)}>
            <div>
              <button
                className={clsx(style.signIn)}
                onClick={() => navigate("/login")}
              >
                Sign in
              </button>
            </div>
            <div>
              <button
                className={clsx(style.signUp)}
                onClick={() => navigate("/register")}
              >
                Sign up
              </button>
            </div>
          </div>
        ) : (
          <div>
            <button className={clsx(style.logOut)} onClick={handleLogout}>
              Log out
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
