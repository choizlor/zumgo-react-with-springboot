import React from 'react';
import ProductItem from '../components/Product/ProductItem';
import {useNavigate} from 'react-router-dom';
import styles from './styles/SearchList.module.css';

export default function SearchList({products}) {
  const navigate = useNavigate();
  const clickProduct = (id) => {
    navigate(`/detail/${id}`);
  };
    return (
        <div className={styles.body}>
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