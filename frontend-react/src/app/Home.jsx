import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Factory, Leaf, Cpu } from 'lucide-react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

function Home() {
  return (
    <Container className="py-5 text-center">
      <header className="mb-5">
        <h1 className="fw-bold display-5">
          Inventory <span className="text-primary">Management</span>
        </h1>
        <p className="text-muted">Simple, scalable, and industrial-ready.</p>
        
        <div className="mt-4">
          <Button as={Link} to="/suggestion" variant="primary" className="m-2 px-4 d-inline-flex align-items-center justify-content-center"
    style={{ minWidth: '200px' }}>
            <Rocket size={18} className="me-2" /> Suggestions
          </Button>
          <Button as={Link} to="/materials" variant="outline-dark" className="m-2 px-4 d-inline-flex align-items-center justify-content-center"
    style={{ minWidth: '200px' }}>
            Manage Stock
          </Button>
        </div>
      </header>

      <Row className="g-4 mt-4">
        <Col md={4}>
          <Card className="border-0 bg-light p-3">
            <Card.Body>
              <Factory size={32} className="text-primary mb-3" />
              <Card.Title className="fw-bold">Industrial</Card.Title>
              <Card.Text className="small text-muted">
                Optimized for flexible packaging systems.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="border-0 bg-light p-3">
            <Card.Body>
              <Leaf size={32} className="text-success mb-3" />
              <Card.Title className="fw-bold">Sustainable</Card.Title>
              <Card.Text className="small text-muted">
                Smart algorithms designed to reduce raw material waste.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="border-0 bg-light p-3">
            <Card.Body>
              <Cpu size={32} className="text-info mb-3" />
              <Card.Title className="fw-bold">Modern</Card.Title>
              <Card.Text className="small text-muted">
                Powered by Quarkus, React, Redux, and Oracle DB.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;