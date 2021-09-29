import React, { useEffect } from 'react';
import { useContext } from 'react';
import StateContext from '../base/context';
import axios from 'axios';
import Product from '../components/Product';
import Favorites from '../components/Favorites';

const ProductsList = () => {
  const [state, dispatch] = useContext(StateContext);
  const {
    shop: { products },
    favorites,
  } = state;

  const handlerAddFavorites = (event) => {
    console.log('SS', event);
  };

  const getProducts = async () => {
    const res = await axios.get(
      'https://69442918-670e-4142-8fd5-3c056a52198b.mock.pstmn.io/products'
    );
    const { Comercio, Productos, Categorias } = res.data;
    dispatch({
      type: 'FETCH_PRODUCTS',
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
      {products &&
        Object.entries(products).map((item, i) => {
          const { nombreProducto } = item[1];
          return (
            <div key={i} className='d-flex justify-content-between col-4 my-1'>
              <Product productName={nombreProducto} />
              <Favorites
                productName={nombreProducto}
                addFavorites={(e) => handlerAddFavorites(e)}
              />
            </div>
          );
        })}
    </div>
  );
};

export default ProductsList;
