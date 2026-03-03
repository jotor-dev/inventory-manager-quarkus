
import { useDispatch } from 'react-redux';
import { Pencil, Trash2 } from 'lucide-react';
import { Button, Table } from 'react-bootstrap';
import { deleteRawMaterial } from '../features/rawMaterials/rawMaterialSlice';

function RawMaterialTable({ list, onEdit }) {
  const dispatch = useDispatch();

  if (!list || list.length === 0) {
    return <p className="text-center text-muted p-5 border rounded bg-light">No raw materials found.</p>;
  }

  return (
    <div className="bg-white rounded shadow-sm border overflow-hidden">
      <Table hover responsive className="mb-0">
        <thead className="bg-light text-secondary">
          <tr>
            <th className="px-4 py-3 border-0">Code</th>
            <th className="px-4 py-3 border-0">Name</th>
            <th className="px-4 py-3 border-0">Stock Quantity</th>
            <th className="px-4 py-3 border-0 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((rawMaterial) => (
            <tr key={rawMaterial.id} className="align-middle">
              <td className="px-4 py-3 font-monospace text-primary">{rawMaterial.code}</td>
              <td className="px-4 py-3 fw-medium">{rawMaterial.name}</td>
              <td className="px-4 py-3 text-success font-monospace">{rawMaterial.stockQuantity}</td>
              <td className="px-4 py-3 text-center">
                <div className="d-flex justify-content-center gap-2">
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    onClick={() => onEdit(rawMaterial)}
                    title="Edit Raw Material"
                  >
                    <Pencil size={16} />
                  </Button>

                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => {
                      if(window.confirm(`Exterminate raw material ${rawMaterial.name}?`)) {
                        dispatch(deleteRawMaterial(rawMaterial.id));
                      }
                    }}
                    title="Delete Raw Material"
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

export default RawMaterialTable;