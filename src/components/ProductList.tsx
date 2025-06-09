import React from 'react';
import { ScannedProduct } from '../types/Product';

interface Props {
  products: ScannedProduct[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <ul>
      {products.map((p) => (
        <li key={p.barcode}>
          {p.name} - {p.price.toFixed(2)} lei x {p.quantity}
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
