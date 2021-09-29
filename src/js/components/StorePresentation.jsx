import React from 'react';

const StorePresentation = ({ commerce }) => {
  const { bannerComercio, nombreComercio } = commerce;
  console.log(commerce);
  return (
    <div>
      <img src={`${bannerComercio}`} alt={`${nombreComercio}`} />
    </div>
  );
};

export default StorePresentation;
