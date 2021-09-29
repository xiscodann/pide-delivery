import React from 'react';

const Product = ({ productName }) => {
  return (
    <div className='list-group text-danger'>
      <p>{productName}</p>
    </div>
  );
};

export default Product;
