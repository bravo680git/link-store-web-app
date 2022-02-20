import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: [], 
    loading: false
}

const dataSlice = createSlice({
    name:'data',
    initialState,
    reducers: {
        setData: (state, action) => ({
            ...state,
            data: action.payload
        }),
        setLoading: (state, action) => ({
            ...state,
            loading: action.payload
        }),
    }
})

export default dataSlice.reducer
export const { setData, setLoading } = dataSlice.actions