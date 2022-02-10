import { useDispatch } from "react-redux"
import { setLoginState } from "../store/authSlice"

const useHandleLogout = () => {
    const dispatch = useDispatch()
    return () => {
        dispatch(setLoginState(false))
        localStorage.removeItem('isLogin')
        localStorage.removeItem('authToken')
    }
}

export default useHandleLogout