import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import jobService from "./jobservice";

export const getJob = createAsyncThunk("job/getAllJob", async (thunkAPI) => {
  try {
    return await jobService.getJobs();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const createJob = createAsyncThunk(
  "job/createJob",
  async (jobData, thunkAPI) => {
    try {
      return await jobService.createJob(jobData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAAJob = createAsyncThunk(
  "job/get-job",
  async (id, thunkAPI) => {
    try {
      return await jobService.getJob(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAJob = createAsyncThunk(
  "job/get-update",
  async (id, thunkAPI) => {
    try {
      return await jobService.updateJob(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAJob = createAsyncThunk(
  "job/delete-job",
  async (id, thunkAPI) => {
    try {
      await jobService.deleteJob(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  jobs: [],
  isError: false,
  isLoding: false,
  isSuccess: false,
  job: {},
  message: "",
};
export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJob.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getJob.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.jobs = action.payload;
      })
      .addCase(getJob.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createJob.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdjob = action.payload;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAAJob.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getAAJob.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.job.jobData = action.payload.title;
        state.job.jobData = action.payload.company;
        state.job.jobData = action.payload.location;
        state.job.jobData = action.payload.description;
        state.job.jobData = action.payload.responsibilities;
        state.job.jobData = action.payload.qualifications;
        state.job.jobData = action.payload.skills;
        state.job.jobData = action.payload.employmentType;
        state.job.jobData = action.payload.experienceLevel;
        state.job.jobData = action.payload.educationLevel;
        state.job.jobData = action.payload.salary;
        state.job.jobData = action.payload.applicationDeadline;
        state.job.jobData = action.payload.contactEmail;
      })
      .addCase(getAAJob.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAJob.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(updateAJob.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedJob = action.payload;
      })
      .addCase(updateAJob.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAJob.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(deleteAJob.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.deltedJob = action.payload;
      })
      .addCase(deleteAJob.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default jobSlice.reducer;
