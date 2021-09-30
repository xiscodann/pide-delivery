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
          <div className='header__favorites'>
            <button className='btn'>
              <i className='far fa-heart font-size-24 header__favorites--icon'></i>
              {favorites.length > 0 && (
                <span class='header__favorites--badge font-size-14 text-white'>
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
          <div className='header__cart mx-5'>
            <button className='btn'>
              <img
                className='header__cart--icon'
                src='https://img.icons8.com/material-outlined/24/ffffff/shopping-cart--v1.png'
                alt='Carrito'
              />
              {cart.length > 0 && (
                <span class='header__cart--badge font-size-14 text-white'>
                  {count}
                </span>
              )}
            </button>
          </div>
          <div className='header__profile'>
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
