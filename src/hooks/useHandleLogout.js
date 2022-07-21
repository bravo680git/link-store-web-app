import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setLoginState } from "../store/authSlice";
import authApi from "../apis/auth";

const useHandleLogout = () => {
  const dispatch = useDispatch();
  return useCallback(async () => {
    dispatch(
      setLoginState({
        isLogin: false,
        role: "",
      })
    );
    await authApi.logout();
    localStorage.clear();
  }, [dispatch]);
};

export default useHandleLogout;
