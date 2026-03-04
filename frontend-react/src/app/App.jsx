import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ProductList from '../features/products/ProductList';
import RawMaterialList from '../features/rawMaterials/RawMaterialList';
import SuggestionList from '../features/suggestions/SuggestionlList';

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link 
      to={to} 
      className={`nav-link ${isActive ? 'active fw-bold border-bottom border-2 border-primary' : ''}`}
    >
      {children}
    </Link>
  );
};

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4">
    <div className="container">
      <Link className="navbar-brand fw-bold letter-spacing-1" to="/">
        AUTOFLEX <span className="text-primary">INVENTORY</span>
      </Link>
      
      <div className="navbar-nav ms-auto gap-3">
        <NavLink to="/">Products</NavLink>
        <NavLink to="/materials">Raw Materials</NavLink>
        <NavLink to="/suggestion">
          <span className="text-warning">★ Suggestions</span>
        </NavLink>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="footer mt-auto py-4 bg-light border-top">
    <div className="container text-center text-muted">
      <small>&copy; 2026 — Autoflex Industrial Systems</small>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 bg-white">
        <Header />
        
        <main className="container flex-shrink-0 pb-5">
          <div className="row justify-content-center">
            <div className="col-12">
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/materials" element={<RawMaterialList />} />
                <Route path="/suggestion" element={<SuggestionList />} />
                <Route path="*" element={
                  <div className="alert alert-danger shadow-sm mt-5" role="alert">
                    <strong>Error 404:</strong> The requested archive does not exist in our systems.
                  </div>
                } />
              </Routes>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;