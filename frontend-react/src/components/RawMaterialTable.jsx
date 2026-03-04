import { useDispatch } from 'react-redux';
import { Pencil, Trash2 } from 'lucide-react';
import { Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2'; // Padronização do sistema de alertas
import { deleteRawMaterial } from '../features/rawMaterials/rawMaterialSlice';

function RawMaterialTable({ list, onEdit }) {
  const dispatch = useDispatch();

  const handleDelete = (material) => {
    Swal.fire({
      title: 'Exterminate Raw Material?',
      text: `Are you sure you want to delete ${material.name}? This might affect existing product recipes.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Abort',
      background: '#f8f9fa'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteRawMaterial(material.id));
        
        Swal.fire({
          title: 'Deleted!',
          text: 'The material has been removed from the inventory.',
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
        <p className="m-0 fs-5">No raw materials found in the inventory.</p>
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
            <th className="px-4 py-3 border-0 text-center">Stock Quantity</th>
            <th className="px-4 py-3 border-0 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((rawMaterial) => (
            <tr key={rawMaterial.id} className="transition-all hover:bg-slate-50">
              <td className="px-4 py-3 font-monospace text-primary fw-bold">
                {rawMaterial.code}
              </td>
              <td className="px-4 py-3 fw-medium text-slate-700">
                {rawMaterial.name}
              </td>
              <td className="px-4 py-3 text-center">
                <span className={`badge ${rawMaterial.stockQuantity > 10 ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} border px-3 py-2`}>
                  {rawMaterial.stockQuantity} units
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="d-flex justify-content-center gap-2">
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="border-0 shadow-sm"
                    onClick={() => onEdit(rawMaterial)}
                    title="Edit Raw Material"
                  >
                    <Pencil size={18} />
                  </Button>

                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    className="border-0 shadow-sm"
                    onClick={() => handleDelete(rawMaterial)}
                    title="Delete Raw Material"
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

export default RawMaterialTable;