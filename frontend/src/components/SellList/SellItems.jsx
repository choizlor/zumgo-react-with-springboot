import React, {useState} from 'react';
import './SellItem';
import SellItem from './SellItem';


export default function SellItems({filter}) {
  //총 상품 목록들 
  const [products, setProducts] = useState([
    {id:'123',name:'가방',price:'8000',status:'onsale',image:'이미지요~'},
    {id:'124',name:'옷',price:'7000',status:'inprogress',image:'이미지입니다~'}
  ]);
  const filtered = getFilteredItems(products,filter)
        return (
          <ul>
            {filtered.map((item ) => (
              <SellItem
              key={item.id}
              product={item}/>
            ))}
          </ul>
        
    );
}

function getFilteredItems(products,filter) {
  console.log(products)
  return products.filter((product) => product.status ===filter)
}