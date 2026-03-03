import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRawMaterials } from './rawMaterialSlice'
import RawMaterialTable from '../../components/RawMaterialTable';

const RawMaterialList = () => {
    const dispatch = useDispatch();
    const { list: rawMaterials, status, error} = useSelector(state => state.rawMaterials);

    useEffect(() => {
        if (status === 'idle'){
            dispatch(fetchRawMaterials());
        }
    }, [status, dispatch]);

    if (status === 'loading') return <p className="text-gray-500">Loading raw materials...</p>;
    if (status === 'failed') return <p className="text-red-500">Error when fetching raw materials: {error}</p>;

    return <RawMaterialTable list={rawMaterials} />;
};

export default RawMaterialList;