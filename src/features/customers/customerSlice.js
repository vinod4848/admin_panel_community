import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerService";

export const getUsers = createAsyncThunk('customer/get-customer', async (thunkAPI) => {
    try {
        return await customerService.getUsers()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState = {
    customers: [],
    isError: false,
    isLoding: false,
    isSuccess: false,
    message: ""
}
export const customerSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending,
            (state) => {
                state.isLoding = true;
            })
            .addCase(getUsers.fulfilled,
                (state, action) => {
                    state.isLoding = false;
                    state.isError = false
                    state.isSuccess = true
                    state.customers = action.payload
                })
            .addCase(getUsers.rejected,
                (state, action) => {
                    state.isLoding = false;
                    state.isError = true
                    state.isSuccess = false
                    state.message = action.error;
                })
    },


})

export default customerSlice.reducer;