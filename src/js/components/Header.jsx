import React from 'react';

const Header = ({ favorites, cart }) => {
  let count = 0;
  cart.map((item) => {
    count = count + item.count;
  });
  return (
    <header className='container-fluid p-0'>
      <article className='header px-5 d-flex align-items-center justify-content-between'>
        <section>
          <a href='/' className='header__button'>
            <img
              className='header__button--img'
              src='/assets/img/header/logo.png'
              alt='Logo Pide - MÁS QUE UN DELIVERY'
              loading='lazy'
            />
          </a>
        </section>
        <section className='d-inline-flex'>
          <div className='header__favorites mx-4'>
            <button className='btn'>
              <i className='far fa-heart font-size-24 header__favorites--icon'></i>
              {favorites.length > 0 && (
                <span class='header__favorites--badge font-size-12 text-white'>
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
          <div className='header__cart mx-4'>
            <button className='btn'>
              <i className='fas fa-shopping-cart font-size-18'></i>
              {cart.length > 0 && (
                <span class='header__cart--badge font-size-12 text-white'>
                  {count}
                </span>
              )}
            </button>
          </div>
          <div className='header__profile ml-5'>
            <img
              className='header__profile--img'
              src='/assets/img/header/profile-photo.png'
              alt='Foto perfil'
              loading='lazy'
            />
          </div>
        </section>
      </article>
    </header>
  );
};

export default Header;
