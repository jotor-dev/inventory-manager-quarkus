import  React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from './productSlice'
import ProductTable from '../../components/ProductTable';

const ProductList = () => {
    const dispatch = useDispatch();
    const { list: products, status, error} = useSelector(state => state.products);

    useEffect(() => {
        if (status === 'idle'){
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    if (status === 'loading') return <p className="text-gray-500">Loading products...</p>;
    if (status === 'failed') return <p className="text-red-500">Error when fetching products: {error}</p>;

    return <ProductTable list={products} />;
};

export default ProductList;