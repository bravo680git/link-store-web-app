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
    sessionStorage.removeItem("isLogin");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("role");
  }, [dispatch]);
};

export default useHandleLogout;
