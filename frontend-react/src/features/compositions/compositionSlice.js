import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchProductCompositions = createAsyncThunk(
    'compositions/fetchByProduct',
    async (productId) => {
        const response = await api.get(`/product-composition/product/${productId}`);
        return response.data;
    }
);

export const addMaterialToProduct = createAsyncThunk(
    'compositions/add',
    async (compositionData, { dispatch }) => {
        await api.post('/product-composition', compositionData);
        dispatch(fetchProductCompositions(compositionData.productId));
    }
);

export const removeMaterialFromProduct = createAsyncThunk(
    'compositions/remove',
    async ({ id, productId }, { dispatch }) => {
        await api.delete(`/product-composition/${id}`);
        dispatch(fetchProductCompositions(productId));
    }
);

const compositionSlice = createSlice({
    name: 'compositions',
    initialState: {
        currentProductCompositions: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductCompositions.fulfilled, (state, action) => {
                state.currentProductCompositions = action.payload;
                state.status = 'succeeded';
            });
    }
});

export default compositionSlice.reducer;