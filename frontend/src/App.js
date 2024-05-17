import { useState, useEffect } from 'react';
// import React from 'react';
import Modal from 'react-modal';

import ProductCard from './Components/ProductCard/ProductCard';
import ProductForm from './Components/ProductForm/ProductForm';


import './App.css';

Modal.setAppElement('#root');


const App = () => {
  // State
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);

  // Comportement
  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
    }, []);

    const toggleModal = () => {
      setModal(!modal);
    }

  // Affichage
  return (
    <div className="app">
        
         <div className="app-header">
            <div className="app-title">Mes produits</div>
            <button className='product-add-button' onClick={toggleModal}>Ajouter un produit</button>
        </div>

        <div className="app-content">
          {products.map(product => (
          <ProductCard
            name={product.name}
            price={product.price}
            description={product.description}
            imageUrl={product.imageUrl}
          />
          ))}
        </div>

        <modal>
            <ProductForm/>
        </modal>
    </div>
  );
}

export default App;
