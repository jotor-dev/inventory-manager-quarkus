import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchProducts = createAsyncThunk(
    'products/fetchAllProducts',
    async () => {
        const response = await api.get('/product');
        return response.data;
    }
);

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (productData, { dispatch }) => {
        await api.post('/product', productData);
        dispatch(fetchProducts());
    }
)

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async (productData, { dispatch }) => {
        await api.put(`/product/${productData.id}`, productData);
        dispatch(fetchProducts()); 
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (productId, { dispatch }) => {
        await api.delete(`/product/${productId}`);
        dispatch(fetchProducts());
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
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
            })

            // Create
            .addCase(createProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(createProduct.pending, (state) => {
                state.status = 'saving'; 
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            
            // Update
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(updateProduct.pending, (state) => {
                state.status = 'updating'; 
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Delete
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'deleting'; 
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export default productSlice.reducer;