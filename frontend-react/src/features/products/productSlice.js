import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchProducts = createAsyncThunk(
    'products/fetchAllProducts',
    async () => {
        const response = await api.get('/product');
        return response.data;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.list = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default productSlice.reducer;