import React from 'react';

const StorePresentation = ({ commerce }) => {
  const { bannerComercio, nombreComercio } = commerce;
  return (
    <div className='store'>
      <img
        className='store__img img-fluid'
        src={`${bannerComercio}`}
        alt={`${nombreComercio}`}
      />
    </div>
  );
};

export default StorePresentation;
