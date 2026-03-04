import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ProductList from '../features/products/ProductList';
import RawMaterialList from '../features/rawMaterials/RawMaterialList';
import SuggestionList from '../features/suggestions/SuggestionlList';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 bg-white">
        <Header />
        
        <main className="container flex-shrink-0 pb-5">
          <div className="row justify-content-center">
            <div className="col-12">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
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