import React from 'react';

const Favorites = ({ productName, addFavorites }) => {
  return (
    <button type='button' onClick={() => addFavorites(productName)}>
      <i className='far fa-heart'></i>
    </button>
  );
};

export default Favorites;
