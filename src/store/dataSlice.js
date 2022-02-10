import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: []
}

const dataSlice = createSlice({
    name:'data',
    initialState,
    reducers: {
        setData: (state, action) => ({
            data: action.payload
        })
    }
})

export default dataSlice.reducer
export const { setData } = dataSlice.actions