import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createRawMaterial, updateRawMaterial } from '../features/rawMaterials/rawMaterialSlice';
import { Save, X } from 'lucide-react';

const RawMaterialModal = ({ show, handleClose, rawMaterialToEdit }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ code: '', name: '', stockQuantity: '' });


    useEffect(() => {
        if (rawMaterialToEdit) {
            setFormData(rawMaterialToEdit);
        } else {
            setFormData({ code: '', name: '', stockQuantity: '' });
        }
    }, [rawMaterialToEdit, show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { ...formData, stockQuantity: parseFloat(formData.stockQuantity) };
        
        if (rawMaterialToEdit) {
            dispatch(updateRawMaterial(data));
        } else {
            dispatch(createRawMaterial(data));
        }
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>{rawMaterialToEdit ? 'Edit Raw Material' : 'New Raw Material'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Internal Code</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Ex: P-001"
                            value={formData.code}
                            onChange={e => setFormData({...formData, code: e.target.value})}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Raw Material</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Ex: Metal Sheet"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Stock Quantity</Form.Label>
                        <Form.Control 
                            type="number" 
                            step="0.01"
                            value={formData.stockQuantity}
                            onChange={e => setFormData({...formData, stockQuantity: e.target.value})}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className="d-flex align-items-center gap-2">
                        <X size={18} /> Cancel
                    </Button>
                    <Button variant="primary" type="submit" className="d-flex align-items-center gap-2">
                        <Save size={18} /> {rawMaterialToEdit ? 'Update' : 'Create'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default RawMaterialModal;