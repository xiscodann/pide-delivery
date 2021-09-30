import React, { useState } from 'react';
import { useContext } from 'react';
import StateContext from '../base/context';
import * as TYPES from '../base/types';
import ProductImage from '../components/ProductImage';
import ProductDescription from '../components/ProductDescription';
import Favorites from '../components/Favorites';
import AddToCart from '../components/AddToCart';
import Categories from '../components/Categories';
import Header from '../components/Header';
import StorePresentation from '../components/StorePresentation';
import Error from '../components/Error';
import Loading from '../components/Loading';

const ProductsList = ({ loading, errorHanlder }) => {
  const [state, dispatch] = useContext(StateContext);
  const [tabId, setTabId] = useState(7);

  const {
    shop: { products, categories, commerce },
    favorites,
    cart,
  } = state;

  const handlerAddFavorites = (productSelected) => {
    const { productId, productName } = productSelected;
    const isRepeatingElement = favorites.some((item) => item.id === productId);
    if (!isRepeatingElement) {
      dispatch({
        type: TYPES.ADD_FAVORITES_PRODUCTS,
        payload: { productId, productName },
      });
    } else {
      dispatch({
        type: TYPES.DELETE_FAVORITES_PRODUCTS,
        payload: { productId },
      });
    }
  };

  const handlerIncreaseProducts = (productId) => {
    dispatch({
      type: TYPES.INCREASE_TO_CART,
      payload: { productId },
    });
  };

  const handlerDecreaseProducts = (productId) => {
    dispatch({
      type: TYPES.DECREASE_TO_CART,
      payload: { productId },
    });
  };

  const handlerChangeTab = (tab) => {
    const sectionProducts = document.querySelector('#show-products');
    if (tab !== tabId) {
      sectionProducts.classList.add(
        `${tab > tabId ? 'transitionToRight' : 'transitionToLeft'}`
      );
      setTabId(tab);
      setTimeout(() => {
        sectionProducts.classList.remove(
          `${tab > tabId ? 'transitionToRight' : 'transitionToLeft'}`
        );
      }, 800);
    }
  };

  const handlerShareProduct = (productName) => {
    if (navigator.share) {
      navigator
        .share({
          title: 'PIDE DELIVERY - MÁS QUE UN DELIVERY',
          text: `Mira esta deliciosa ${productName} para que te antojes 😄.\n`,
          url: 'https://pide-qa.web.app/',
        })
        .then(() => {
          console.info('Excelente, gracias por compartir');
        })
        .catch((err) => {
          console.info(`No se pudo compartir, ${err}`);
        });
    }
  };

  return (
    <>
      <Header favorites={favorites} cart={cart} />
      {!loading && !errorHanlder ? (
        <>
          <StorePresentation commerce={commerce} />
          <div className='container'>
            <section className='d-flex justify-content-md-center overflow-auto'>
              {categories &&
                categories.map((item) => {
                  const { idCategoria, nombreCat, imagenCat } = item;
                  if (
                    !!products.find(
                      (product) => product.idCategoria === idCategoria
                    )
                  )
                    return (
                      <Categories
                        tabSelected={tabId}
                        categoryId={idCategoria}
                        categoryName={nombreCat}
                        categoryImage={imagenCat}
                        changeTab={(e) => handlerChangeTab(e)}
                      />
                    );
                })}
            </section>
            <section className='row position-relative' id='show-products'>
              {products &&
                products.map((item, i) => {
                  const {
                    nombreProducto,
                    idProducto,
                    idCategoria,
                    descriProducto,
                    imagenProducto,
                    precioProducto,
                  } = item;
                  if (tabId === idCategoria) {
                    const isRepeatingElement = favorites.some(
                      (item) => item.id === idProducto
                    );
                    const isAddedToCart = cart.filter(
                      (item) => item.id === idProducto
                    );
                    return (
                      <div key={i} className='product row col-12 col-lg-6 my-3'>
                        <ProductImage
                          productName={nombreProducto}
                          productImage={imagenProducto}
                        />
                        <div className='col-8 col-sm-9'>
                          <Favorites
                            productName={nombreProducto}
                            productId={idProducto}
                            isRepeating={isRepeatingElement}
                            addFavorites={(e) => handlerAddFavorites(e)}
                            shareProduct={(e) => handlerShareProduct(e)}
                          />
                          <ProductDescription
                            productDescription={descriProducto}
                          />
                          <AddToCart
                            productPrice={precioProducto}
                            cart={isAddedToCart}
                            productId={idProducto}
                            decreaseProducts={(e) => handlerDecreaseProducts(e)}
                            increaseProducts={(e) => handlerIncreaseProducts(e)}
                          />
                        </div>
                      </div>
                    );
                  }
                })}
            </section>
          </div>
        </>
      ) : errorHanlder ? (
        <Error />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProductsList;
