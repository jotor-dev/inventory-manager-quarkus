import { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import { Plus, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addMaterialToProduct, removeMaterialFromProduct } from '../features/compositions/compositionSlice';

function CompositionModal({ show, handleClose, product, rawMaterials }) {
  const dispatch = useDispatch();
  const { currentProductCompositions } = useSelector(state => state.compositions);
  
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAdd = () => {
    if (!selectedMaterial || !quantity) return;
    
    dispatch(addMaterialToProduct({
      productId: product.id,
      rawMaterialId: parseInt(selectedMaterial),
      requiredQuantity: parseFloat(quantity)
    }));
    
    setSelectedMaterial('');
    setQuantity('');
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="fs-5">Recipe for: <span className="text-primary">{product?.name}</span></Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Form className="row g-2 mb-4 align-items-end">
          <Form.Group className="col-md-6">
            <Form.Label className="small fw-bold">Raw Material</Form.Label>
            <Form.Select value={selectedMaterial} onChange={e => setSelectedMaterial(e.target.value)}>
              <option value="">Select material...</option>
              {rawMaterials && rawMaterials.map(mat => (
                <option key={mat.id} value={mat.id}>{mat.name} (Stock: {mat.stockQuantity})</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-md-4">
            <Form.Label className="small fw-bold">Quantity Needed</Form.Label>
            <Form.Control type="number" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="0.00" />
          </Form.Group>

          <div className="col-md-2">
            <Button variant="primary" onClick={handleAdd}>
              <Plus size={18} />
            </Button>
          </div>
        </Form>

        <Table hover responsive size="sm" className="border">
          <thead className="table-light">
            <tr>
              <th>Material</th>
              <th>Quantity</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProductCompositions.map((comp) => (
              <tr key={comp.id} className="align-middle">
                <td className="fw-bold">{comp.rawMaterialName}</td>
                <td>{comp.requiredQuantity}</td>
                <td className="text-center">
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => {
                      if (window.confirm(`Exterminate material from product ${product.name}?`)) {
                        dispatch(removeMaterialFromProduct({ id: comp.id, productId: product.id }));
                      }
                    }}
                  >
                    <Trash2 size={14} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}

export default CompositionModal;