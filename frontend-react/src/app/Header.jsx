import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap'; 

const NavLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
        <Nav.Link
            as={Link}
            to={to}
            className={`${isActive ? 'active fw-bold border-bottom border-2 border-primary' : ''} px-3`}
        >
            {children}
        </Nav.Link>
    );
};

export default function Header() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center">
                    <img 
                        src="/autoflex_icon-nb.png" 
                        alt="Logo" 
                        width="30" 
                        height="30" 
                        className="d-inline-block align-top me-2" 
                    />
                    AUTOFLEX <span className="text-primary ms-1">INVENTORY</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto gap-2">
                        <NavLink to="/products">Products</NavLink>
                        <NavLink to="/materials">Raw Materials</NavLink>
                        <NavLink to="/suggestion">
                            <span className="text-warning">★ Suggestions</span>
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}