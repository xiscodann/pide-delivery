import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import StateContext from '../base/context';
import axios from 'axios';
import * as TYPES from '../base/types';
import Product from '../components/Product';
import Favorites from '../components/Favorites';
import AddToCart from '../components/AddToCart';
import Categories from '../components/Categories';

const ProductsList = () => {
  const [state, dispatch] = useContext(StateContext);
  const [tabId, setTabId] = useState(7);
  const {
    shop: { products, categories },
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
    const commerce = [];
    const products = [];
    const categories = [];
    Object.entries(Productos).map((item) => {
      const { nombreProducto, idCategoria, idProducto } = item[1];
      return products.push({ idProducto, idCategoria, nombreProducto });
    });
    Object.entries(Categorias).map((item) => {
      const { idCategoria, nombreCat } = item[1];
      return categories.push({ idCategoria, nombreCat });
    });
    Object.entries(Comercio).map((item) => {
      const { nombreComercio } = item[1];
      return commerce.push({ nombreComercio });
    });
    dispatch({
      type: TYPES.FETCH_PRODUCTS,
      payload: {
        commerce,
        products,
        categories,
      },
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className='list-group h-100'>
      <h3>Agregados a favoritos {favorites.length}</h3>
      <h3>Carrito {cart.length}</h3>
      <div className='d-flex'>
        {categories &&
          categories.map((item) => {
            const { idCategoria, nombreCat } = item;
            if (
              !!products.find((product) => product.idCategoria === idCategoria)
            )
              return (
                <Categories
                  categoryId={idCategoria}
                  categoryName={nombreCat}
                  changeTab={(e) => handlerChangeTab(e)}
                />
              );
          })}
      </div>
      {products &&
        products.map((item, i) => {
          const { nombreProducto, idProducto, idCategoria } = item;
          if (tabId === idCategoria) {
            const isRepeatingElement = favorites.some(
              (item) => item.id === idProducto
            );
            const isAddedToCart = cart.filter((item) => item.id === idProducto);
            return (
              <div
                key={i}
                className='d-flex justify-content-between col-4 my-1'
              >
                <Product productName={nombreProducto} />
                <Favorites
                  productName={nombreProducto}
                  productId={idProducto}
                  isRepeating={isRepeatingElement}
                  addFavorites={(e) => handlerAddFavorites(e)}
                />
                <AddToCart
                  cart={isAddedToCart}
                  productId={idProducto}
                  decreaseProducts={(e) => handlerDecreaseProducts(e)}
                  increaseProducts={(e) => handlerIncreaseProducts(e)}
                />
              </div>
            );
          }
        })}
    </div>
  );
};

export default ProductsList;
