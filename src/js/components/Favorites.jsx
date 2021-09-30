import React from 'react';

const Favorites = ({
  productName,
  productId,
  isRepeating,
  addFavorites,
  shareProduct,
}) => {
  return (
    <div className='product__favorites d-flex justify-content-between'>
      <div>
        <h5>{productName}</h5>
      </div>
      <div className='d-inline-flex'>
        <button
          type='button'
          className='btn mx-1 shadow-none'
          onClick={() => addFavorites({ productId, productName })}
        >
          <i
            className={`fa${isRepeating ? 's' : 'r'} fa-heart ${
              isRepeating ? 'text-danger' : ''
            }`}
          ></i>
        </button>
        <button
          type='button'
          className={`btn mx-1 shadow-none ${!navigator.share && 'd-none'}`}
          onClick={() => shareProduct(productName)}
        >
          <i className='fas fa-share-alt'></i>
        </button>
      </div>
    </div>
  );
};

export default Favorites;
