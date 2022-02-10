import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLogin: localStorage.getItem('isLogin') ?? false
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setLoginState: (state, action) => ({
            isLogin: action.payload
        })
    }
})

export default authSlice.reducer
export const { setLoginState } = authSlice.actions