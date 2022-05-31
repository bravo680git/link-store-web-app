import { useDispatch } from "react-redux";
import { setLoginState } from "../store/authSlice";

const useHandleLogout = () => {
  const dispatch = useDispatch();
  return () => {
    dispatch(
      setLoginState({
        isLogin: false,
        role: "",
      })
    );
    sessionStorage.removeItem("isLogin");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("role");
  };
};

export default useHandleLogout;
