import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productSlice';
import { Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { PlusCircle } from 'lucide-react';
import ProductTable from '../../components/ProductTable';
import ProductModal from '../../components/ProductModal';

const ProductList = () => {
    const dispatch = useDispatch();
    
    const { list: products, status, error } = useSelector(state => state.products);

    const [showProductModal, setShowProductModal] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const openCreateModal = () => {
        setProductToEdit(null); 
        setShowProductModal(true);
    };

    const openEditModal = (product) => {
        setProductToEdit(product); 
        setShowProductModal(true);
    };

    const handleCloseModal = () => {
        setShowProductModal(false);
        setProductToEdit(null);
    };

    if (status === 'loading') {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p className="text-muted mt-2">Consulting the Oracle...</p>
            </Container>
        );
    }

    if (status === 'failed') {
        return (
            <Container className="mt-5">
                <Alert variant="danger">Error in the prophecy: {error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Row className="mb-4 align-items-center">
                <Col>
                    <h2 className="fw-bold text-slate-800">Product Management</h2>
                    <p className="text-muted small">Manage your industrial catalog and prices.</p>
                </Col>
                <Col className="text-end">
                    <Button variant="dark" onClick={openCreateModal} className="d-inline-flex align-items-center gap-2 shadow-sm">
                        <PlusCircle size={18} /> New Product
                    </Button>
                </Col>
            </Row>

            <ProductTable 
                list={products} 
                onEdit={openEditModal} 
            />

            <ProductModal 
                show={showProductModal} 
                handleClose={handleCloseModal}
                productToEdit={productToEdit}
            />
        </Container>
    );
};

export default ProductList;