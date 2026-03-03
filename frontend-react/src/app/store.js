import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/products/productSlice';
import rawMaterialReducer from '../features/rawMaterials/rawMaterialSlice';
import suggestionReducer from "../features/suggestions/suggestionlSlice";

export const store = configureStore({
    reducer: {
        products: productReducer,
        rawMaterials: rawMaterialReducer,
        suggestions: suggestionReducer
    }
})