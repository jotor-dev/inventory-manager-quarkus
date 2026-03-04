import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { produceProduct } from '../features/suggestions/suggestionlSlice';

function SuggestionTable({ list }) {
  const dispatch = useDispatch();
  if (!list || list.length === 0) return null;

  const handleProduce = (suggestion) => {
    Swal.fire({
      title: 'Confirm Production?',
      text: `Do you want to manufacture 1 unit of ${suggestion.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, produce it!',
      background: '#f8f9fa'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(produceProduct(suggestion.productId));
        
        Swal.fire({
            title: 'Produced!',
            text: 'Stock has been updated.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });
      }
    });
  };
  
  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Suggestions</h2>
      <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Total Value: {list.totalValue}</h3>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Quantity to produce</th>
            <th className="px-4 py-2 text-left">Subtotal Value</th>
            <th className="px-4 py-3 border-0 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.items.map((suggestion) => (
            <tr key={suggestion.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-2 font-mono text-sm">{suggestion.name}</td>
              <td className="px-4 py-2">{suggestion.quantityCanProduce}</td>
              <td className="px-4 py-2 text-green-700">{suggestion.subtotalValue}</td>
              <td className="px-4 py-2 text-center">
                <Button 
                  variant="success" 
                  size="sm" 
                  onClick={() => handleProduce(suggestion)}
                >
                  Produce 1 unit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SuggestionTable