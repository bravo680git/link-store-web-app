import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setLoginState } from "../store/authSlice";
import authApi from "../apis/auth";

const useHandleLogout = () => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(
      setLoginState({
        isLogin: false,
        role: "",
      })
    );
    authApi.logout().finally(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  }, [dispatch]);
};

export default useHandleLogout;
