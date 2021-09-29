import React from 'react';

const Product = ({ productName, productImage }) => {
  return (
    <div className='product__img col-3'>
      <img
        className='img-fluid product__img--src'
        src={`${productImage}`}
        alt={`${productName}`}
      />
    </div>
  );
};

export default Product;
