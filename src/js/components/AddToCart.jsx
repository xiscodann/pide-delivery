import React from 'react';

const AddToCart = ({ cart, productId, decreaseProducts, increaseProducts }) => {
  return (
    <>
      <button type='button' onClick={() => decreaseProducts(productId)}>
        -
      </button>
      {cart.length > 0 ? cart.map((item) => <p>{item.count}</p>) : 0}
      <button type='button' onClick={() => increaseProducts(productId)}>
        +
      </button>
    </>
  );
};

export default AddToCart;
