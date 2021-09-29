import React, { useEffect } from 'react';
import { useContext } from 'react';
import StateContext from '../base/context';
import axios from 'axios';
import * as TYPES from '../base/types';
import Product from '../components/Product';
import Favorites from '../components/Favorites';
import AddToCart from '../components/AddToCart';

const ProductsList = () => {
  const [state, dispatch] = useContext(StateContext);
  const {
    shop: { products },
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

  const getProducts = async () => {
    const res = await axios.get(
      'https://69442918-670e-4142-8fd5-3c056a52198b.mock.pstmn.io/products'
    );
    const { Comercio, Productos, Categorias } = res.data;
    dispatch({
      type: TYPES.FETCH_PRODUCTS,
      payload: {
        commerce: Comercio,
        products: Productos,
        categories: Categorias,
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
      {console.log(cart)}
      {products &&
        Object.entries(products).map((item, i) => {
          const { nombreProducto, idProducto } = item[1];
          const isRepeatingElement = favorites.some(
            (item) => item.id === idProducto
          );
          const isAddedToCart = cart.filter((item) => item.id === idProducto);
          return (
            <div key={i} className='d-flex justify-content-between col-4 my-1'>
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
        })}
    </div>
  );
};

export default ProductsList;
