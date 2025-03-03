import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the updateJob async action (thunk)
export const updateJob = createAsyncThunk(
    'job/updateJob',
    async ({ jobId, updatedData }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/api/v1/job/update/${jobId}`, updatedData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        loading: false,
        error: null,
    },
    reducers: {
        // sync actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateJob.fulfilled, (state, action) => {
                state.loading = false;
                // Optionally, you can update the job in the state here if needed
                const updatedJob = action.payload;
                state.allAdminJobs = state.allAdminJobs.map(job =>
                    job._id === updatedJob._id ? updatedJob : job
                );
            })
            .addCase(updateJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery
} = jobSlice.actions;

export default jobSlice.reducer;
