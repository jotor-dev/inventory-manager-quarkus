import { deleteProduct } from '../features/products/productSlice';
import { useDispatch } from 'react-redux';
import { Pencil, Trash2, Beaker } from 'lucide-react';
import { Button, Table } from 'react-bootstrap';

function ProductTable({ list, onEdit, onManageComposition }) {
  const dispatch = useDispatch();

  if (!list || list.length === 0) {
    return <p className="text-center text-muted p-5 border rounded bg-light">No products found.</p>;
  }

  return (
    <div className="bg-white rounded shadow-sm border overflow-hidden">
      <Table hover responsive className="mb-0">
        <thead className="bg-light text-secondary">
          <tr>
            <th className="px-4 py-3 border-0">Code</th>
            <th className="px-4 py-3 border-0">Name</th>
            <th className="px-4 py-3 border-0">Price</th>
            <th className="px-4 py-3 border-0 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((product) => (
            <tr key={product.id} className="align-middle">
              <td className="px-4 py-3 font-monospace text-primary">{product.code}</td>
              <td className="px-4 py-3 fw-medium">{product.name}</td>
              <td className="px-4 py-3 text-success font-monospace">R$ {product.price.toFixed(2)}</td>
              <td className="px-4 py-3 text-center">
                <div className="d-flex justify-content-center gap-2">
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={() => onManageComposition(product)}
                    title="Manage Recipe"
                  >
                    <Beaker size={16} />
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => onEdit(product)}
                    title="Edit Product"
                  >
                    <Pencil size={16} />
                  </Button>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => {
                      if (window.confirm(`Exterminate product ${product.name}?`)) {
                        dispatch(deleteProduct(product.id));
                      }
                    }}
                    title="Delete Product"
                  >
                    <Trash2 size={16} />
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