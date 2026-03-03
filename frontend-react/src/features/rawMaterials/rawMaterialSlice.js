import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchRawMaterials = createAsyncThunk(
    'rawMaterial/fetchAllRawMaterials',
    async () => {
        const response = await api.get('/raw-material');
        return response.data;
    }
);

export const createRawMaterial = createAsyncThunk(
    'rawMaterials/createRawMaterial',
    async (rawMaterialData, { dispatch }) => {
        await api.post('/raw-material', rawMaterialData);
        dispatch(fetchRawMaterials());
    }
)

export const updateRawMaterial = createAsyncThunk(
    'rawMaterials/updateRawMaterial',
    async (rawMaterialData, { dispatch }) => {
        await api.put(`/raw-material/${rawMaterialData.id}`, rawMaterialData);
        dispatch(fetchRawMaterials()); 
    }
);

export const deleteRawMaterial = createAsyncThunk(
    'rawMaterials/deleteRawMaterial',
    async (rawMaterialId, { dispatch }) => {
        await api.delete(`/raw-material/${rawMaterialId}`);
        dispatch(fetchRawMaterials());
    }
)

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
            })

            // Create
            .addCase(createRawMaterial.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(createRawMaterial.pending, (state) => {
                state.status = 'saving'; 
            })
            .addCase(createRawMaterial.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            
            // Update
            .addCase(updateRawMaterial.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(updateRawMaterial.pending, (state) => {
                state.status = 'updating'; 
            })
            .addCase(updateRawMaterial.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Delete
            .addCase(deleteRawMaterial.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(deleteRawMaterial.pending, (state) => {
                state.status = 'deleting'; 
            })
            .addCase(deleteRawMaterial.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export default rawMaterialSlice.reducer;