import React from 'react';

const ProductDescription = ({ productDescription }) => {
  return (
    <div className='product__description'>
      <p>{productDescription}</p>
    </div>
  );
};

export default ProductDescription;
