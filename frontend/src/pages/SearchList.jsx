import React from 'react';
import ProductItem from '../components/Product/ProductItem';
import {useNavigate} from 'react-router-dom';

export default function SearchList({products}) {
  const navigate = useNavigate();
  const clickProduct = (id) => {
    navigate(`/detail/${id}`);
  };
    return (
        <div>
           {products?.map((product) => (
            <ProductItem
            key={product.productId}
            product={product}
            clickProduct={clickProduct}
            />
           ))} 
        </div>
    );
}