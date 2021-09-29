import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import StateContext from '../base/context';
import axios from 'axios';
import * as TYPES from '../base/types';
import ProductImage from '../components/ProductImage';
import ProductDescription from '../components/ProductDescription';
import Favorites from '../components/Favorites';
import AddToCart from '../components/AddToCart';
import Categories from '../components/Categories';
import Header from '../components/Header';
import StorePresentation from '../components/StorePresentation';

const ProductsList = () => {
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
    setTabId(tab);
  };

  const getProducts = async () => {
    const res = await axios.get(
      'https://69442918-670e-4142-8fd5-3c056a52198b.mock.pstmn.io/products'
    );
    const { Comercio, Productos, Categorias } = res.data;
    const products = [];
    const categories = [];
    Object.entries(Productos).map((item) => {
      const {
        nombreProducto,
        idCategoria,
        idProducto,
        descriProducto,
        imagenProducto,
        precioProducto,
      } = item[1];
      return products.push({
        idProducto,
        idCategoria,
        nombreProducto,
        descriProducto,
        imagenProducto,
        precioProducto,
      });
    });
    Object.entries(Categorias).map((item) => {
      const { idCategoria, nombreCat } = item[1];
      return categories.push({ idCategoria, nombreCat });
    });
    dispatch({
      type: TYPES.FETCH_PRODUCTS,
      payload: {
        commerce: Comercio,
        products,
        categories,
      },
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Header favorites={favorites} cart={cart} />
      <div className='container'>
        <StorePresentation commerce={commerce} />
        <section className='d-flex'>
          {categories &&
            categories.map((item) => {
              const { idCategoria, nombreCat } = item;
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
                    changeTab={(e) => handlerChangeTab(e)}
                  />
                );
            })}
        </section>
        <section className='row'>
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
                  <div key={i} className='product row col-6 my-3'>
                    <ProductImage
                      productName={nombreProducto}
                      productImage={imagenProducto}
                    />
                    <div className='col-9'>
                      <Favorites
                        productName={nombreProducto}
                        productId={idProducto}
                        isRepeating={isRepeatingElement}
                        addFavorites={(e) => handlerAddFavorites(e)}
                      />
                      <ProductDescription productDescription={descriProducto} />
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
  );
};

export default ProductsList;
