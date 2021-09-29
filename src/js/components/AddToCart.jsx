import React from 'react';

const AddToCart = ({
  cart,
  productId,
  decreaseProducts,
  increaseProducts,
  productPrice,
}) => {
  const count = cart.length > 0 ? cart.map((item) => item.count) : 0;
  return (
    <div className='product__cart  d-flex justify-content-end'>
      <div className='d-inline-flex mx-5'>
        <button
          type='button'
          className={`btn product__button${count <= 0 ? '--disable' : ''}`}
          onClick={() => decreaseProducts(productId)}
          disabled={count <= 0}
        >
          <i class='fas fa-minus'></i>
        </button>
        <p className='m-0 font-size-26'>{count}</p>
        <button
          type='button'
          className={`btn product__button`}
          onClick={() => increaseProducts(productId)}
        >
          <i class='fas fa-plus'></i>
        </button>
      </div>
      <h5>${productPrice}</h5>
    </div>
  );
};

export default AddToCart;
