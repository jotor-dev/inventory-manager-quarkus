import { Modal, Button, Form, Table } from 'react-bootstrap';
import { Plus, X } from 'lucide-react';

function CompositionModal({ show, handleClose, product, rawMaterials }) {
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Recipe for {product?.name}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Form className="row g-3 mb-4">
          <Form.Group className="col-md-6">
            <Form.Label>Raw Material</Form.Label>
            <Form.Select>
              <option>Select material...</option>
              {rawMaterials.map(mat => (
                <option key={mat.id} value={mat.id}>{mat.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-md-4">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" placeholder="0.00" />
          </Form.Group>

          <div className="col-md-2 d-flex align-items-end">
            <Button variant="primary" className="w-100">
              <Plus size={18} />
            </Button>
          </div>
        </Form>

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Material</th>
              <th>Quantity</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td>Steel</td>
              <td>10.0</td>
              <td className="text-center">
                <Button variant="outline-danger" size="sm"><X size={14} /></Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CompositionModal;