import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRawMaterials } from './rawMaterialSlice';
import { Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { PlusCircle } from 'lucide-react';
import RawMaterialTable from '../../components/RawMaterialTable';
import RawMaterialModal from '../../components/RawMaterialModal';

const RawMaterialList = () => {
    const dispatch = useDispatch();
    
    const { list: rawMaterials, status, error } = useSelector(state => state.rawMaterials);

    const [showRawMaterialModal, setShowRawMaterialModal] = useState(false);
    const [rawMaterialToEdit, setRawMaterialToEdit] = useState(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchRawMaterials());
        }
    }, [status, dispatch]);

    const openCreateModal = () => {
        setRawMaterialToEdit(null); 
        setShowRawMaterialModal(true);
    };

    const openEditModal = (rawMaterial) => {
        setRawMaterialToEdit(rawMaterial); 
        setShowRawMaterialModal(true);
    };

    const handleCloseModal = () => {
        setShowRawMaterialModal(false);
        setRawMaterialToEdit(null);
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
                <Alert variant="danger">Error when fetching raw materials: {error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Row className="mb-4 align-items-center">
                <Col>
                    <h2 className="fw-bold text-slate-800">Raw Material Management</h2>
                    <p className="text-muted small">Manage your raw materials and stock quantities.</p>
                </Col>
                <Col className="text-end">
                    <Button variant="dark" onClick={openCreateModal} className="d-inline-flex align-items-center gap-2 shadow-sm">
                        <PlusCircle size={18} /> New Raw Material
                    </Button>
                </Col>
            </Row>

            <RawMaterialTable 
                list={rawMaterials} 
                onEdit={openEditModal} 
            />

            <RawMaterialModal 
                show={showRawMaterialModal} 
                handleClose={handleCloseModal}
                rawMaterialToEdit={rawMaterialToEdit}
            />
        </Container>
    );
};

export default RawMaterialList;