import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchRawMaterials = createAsyncThunk(
    'rawMaterial/fetchAllRawMaterials',
    async () => {
        const response = await api.get('/raw-material');
        return response.data;
    }
);

const rawMaterialSlice = createSlice({
    name: 'rawMaterials',
    initialState: {
        list: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRawMaterials.fulfilled, (state, action) => {
                state.list = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchRawMaterials.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRawMaterials.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default rawMaterialSlice.reducer;