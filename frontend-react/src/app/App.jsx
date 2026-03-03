import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from '../features/products/ProductList';
import RawMaterialList from '../features/rawMaterial/RawMaterialList';

// Componentes simplões como você pediu
const Header = () => (
  <header className="bg-slate-800 text-white p-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-xl font-bold tracking-widest">AUTOFLEX INVENTORY</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:text-slate-300 transition-colors">Products</Link>
        <Link to="/materials" className="hover:text-slate-300 transition-colors">Raw Materials</Link>
        <Link to="/suggestion" className="hover:text-slate-300 transition-colors font-semibold text-yellow-400">Suggestions</Link>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-slate-100 text-slate-500 p-4 mt-auto border-t">
    <div className="container mx-auto text-center text-sm">
      &copy; 2026 - Inventory Manager
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 text-slate-900 font-sans">
        <Header />
        
        <main className="container mx-auto p-6 flex-grow">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/materials" element={<RawMaterialList />} />
            <Route path="/suggestion" element={<div className="p-4">Suggestions</div>} />
            <Route path="*" element={<div className="p-4 text-red-500">404 - Page Not Found</div>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;