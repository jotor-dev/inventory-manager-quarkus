import { useDispatch } from 'react-redux';
import { Pencil, Trash2, Beaker } from 'lucide-react';
import { Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2'; // O guardião da experiência do usuário
import { deleteProduct } from '../features/products/productSlice';

function ProductTable({ list, onEdit, onManageComposition }) {
  const dispatch = useDispatch();

  const handleDelete = (product) => {
    Swal.fire({
      title: 'Exterminate Product?',
      text: `Are you sure you want to delete ${product.name}? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545', 
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, exterminate!',
      cancelButtonText: 'Abort',
      background: '#f8f9fa'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(product.id));
        
        Swal.fire({
          title: 'Deleted!',
          text: 'The product has been erased from the archives.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  if (!list || list.length === 0) {
    return (
      <div className="text-center text-muted p-5 border rounded bg-light shadow-sm">
        <p className="m-0 fs-5 italic">No ancient artifacts (products) found in the vault.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded shadow-sm border overflow-hidden mt-3">
      <Table hover responsive className="mb-0 align-middle">
        <thead className="bg-light text-secondary border-bottom">
          <tr>
            <th className="px-4 py-3 border-0">Code</th>
            <th className="px-4 py-3 border-0">Name</th>
            <th className="px-4 py-3 border-0 text-end">Price</th>
            <th className="px-4 py-3 border-0 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((product) => (
            <tr key={product.id} className="transition-all hover:bg-slate-50">
              <td className="px-4 py-3 font-monospace text-primary fw-bold">
                {product.code}
              </td>
              <td className="px-4 py-3 fw-medium text-slate-700">
                {product.name}
              </td>
              <td className="px-4 py-3 text-end text-success font-monospace fw-bold">
                R$ {product.price?.toFixed(2)}
              </td>
              <td className="px-4 py-3">
                <div className="d-flex justify-content-center gap-2">
                  <Button
                    variant="outline-info"
                    size="sm"
                    className="border-0 shadow-sm"
                    onClick={() => onManageComposition(product)}
                    title="Manage Recipe"
                  >
                    <Beaker size={18} />
                  </Button>
                  
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="border-0 shadow-sm"
                    onClick={() => onEdit(product)}
                    title="Edit Product"
                  >
                    <Pencil size={18} />
                  </Button>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="border-0 shadow-sm"
                    // Agora usamos a função handleDelete com SweetAlert
                    onClick={() => handleDelete(product)}
                    title="Delete Product"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductTable;