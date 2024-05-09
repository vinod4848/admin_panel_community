import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import userService from "./userservice";

export const GetUsers = createAsyncThunk(
  "user/getAllUser",
  async (thunkAPI) => {
    try {
      return await userService.getUsersService();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, thunkAPI) => {
    try {
      return await userService.createUserService(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAUser = createAsyncThunk(
  "user/get-user",
  async (id, thunkAPI) => {
    try {
      return await userService.getUserService(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAUser = createAsyncThunk(
  "user/update-user",
  async (id, thunkAPI) => {
    try {
      return await userService.updateUserSercice(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAUser = createAsyncThunk(
  "user/delete-user",
  async (id, thunkAPI) => {
    try {
      await userService.deleteUserSercice(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");
const initialState = {
  users: [],
  isError: false,
  isLoding: false,
  isSuccess: false,
  user: {},
  message: "",
};
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetUsers.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(GetUsers.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(GetUsers.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createUser.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdevent = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAUser.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getAUser.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.setUserData = action.payload.getUserData.username;
        state.setUserData = action.payload.getUserData.email;
        state.setUserData = action.payload.getUserData.phone;
        state.setUserData = action.payload.getUserData.role;
        state.setUserData = action.payload.getUserData.isPublished;
      })
      
      .addCase(getAUser.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAUser.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(updateAUser.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedEvent = action.payload;
      })
      .addCase(updateAUser.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAUser.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(deleteAUser.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.deltedEvent = action.payload;
      })
      .addCase(deleteAUser.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default userSlice.reducer;
