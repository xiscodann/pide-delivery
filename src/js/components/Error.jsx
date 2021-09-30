import React from 'react';

const Error = () => (
  <>
    <div className='d-flex align-items-center justify-content-center'>
      <img
        className='img-fluid'
        src='/assets/img/error.svg'
        alt='Error'
        width='400'
      />
    </div>
    <div className='text-center'>
      <h2>Oops</h2>
      <p>Al parecer tenemos problemas, intentalo más tarde</p>
    </div>
  </>
);

export default Error;
