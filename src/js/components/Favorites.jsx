import React from 'react';

const Favorites = ({ productName, productId, isRepeating, addFavorites }) => {
  return (
    <button
      type='button'
      onClick={() => addFavorites({ productId, productName })}
    >
      <i
        className={`fa${isRepeating ? 's' : 'r'} fa-heart ${
          isRepeating ? 'text-danger' : ''
        }`}
      ></i>
    </button>
  );
};

export default Favorites;
