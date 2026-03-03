import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchSuggestions = createAsyncThunk(
    'suggestions/fetchAllSuggestions',
    async () => {
        const response = await api.get('/suggestion');
        return response.data;
    }
);

const suggestionSlice = createSlice({
    name: 'suggestions',
    initialState: {
        list: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSuggestions.fulfilled, (state, action) => {
                state.list = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchSuggestions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSuggestions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default suggestionSlice.reducer;