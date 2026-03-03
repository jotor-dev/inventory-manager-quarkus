import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/products/productSlice';
import rawMaterialReducer from '../features/rawMaterial/rawMaterialSlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        rawMaterials: rawMaterialReducer
    }
})