import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setLoginState } from "../store/authSlice";

const useHandleLogout = () => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(
      setLoginState({
        isLogin: false,
        role: "",
      })
    );
    localStorage.removeItem("isLogin");
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
  }, [dispatch]);
};

export default useHandleLogout;
