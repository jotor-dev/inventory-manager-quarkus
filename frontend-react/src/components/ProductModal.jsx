import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../features/products/productSlice';
import { Save, X } from 'lucide-react';

const ProductModal = ({ show, handleClose, productToEdit }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ code: '', name: '', price: '' });


    useEffect(() => {
        if (productToEdit) {
            setFormData(productToEdit);
        } else {
            setFormData({ code: '', name: '', price: '' });
        }
    }, [productToEdit, show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { ...formData, price: parseFloat(formData.price) };
        
        if (productToEdit) {
            dispatch(updateProduct(data));
        } else {
            dispatch(createProduct(data));
        }
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>{productToEdit ? 'Edit Product' : 'New Product'}</Modal.Title>
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
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Ex: Industrial Engine"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Unit Price (R$)</Form.Label>
                        <Form.Control 
                            type="number" 
                            step="0.01"
                            value={formData.price}
                            onChange={e => setFormData({...formData, price: e.target.value})}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className="d-flex align-items-center gap-2">
                        <X size={18} /> Cancel
                    </Button>
                    <Button variant="primary" type="submit" className="d-flex align-items-center gap-2">
                        <Save size={18} /> {productToEdit ? 'Update' : 'Create'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ProductModal;