import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSuggestions } from './suggestionlSlice'
import SuggestionTable from '../../components/SuggestionTable';

const SuggestionList = () => {
    const dispatch = useDispatch();
    const { list: suggestions, status, error} = useSelector(state => state.suggestions);

    useEffect(() => {
        if (status === 'idle'){
            dispatch(fetchSuggestions());
        }
    }, [status, dispatch]);

    if (status === 'loading') return <p className="text-gray-500">Loading suggestions...</p>;
    if (status === 'failed') return <p className="text-red-500">Error when fetching suggestions: {error}</p>;

    return <SuggestionTable list={suggestions} />;
};

export default SuggestionList;