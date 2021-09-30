import React, { useReducer, useEffect, useState } from 'react';
import '../../scss/app.scss';
import { reducer } from '../reducers/index';
import ProductsList from './ProductsList';
import StateContext from '../base/context';
import { store } from '../states/index';
import axios from 'axios';
import * as TYPES from '../base/types';

const App = () => {
  const [state, dispatch] = useReducer(reducer, store);
  const [loading, setLoading] = useState(true);
  const [errorHanlder, setErrorhandler] = useState(false);

  const getProducts = async () => {
    await axios
      .get(
        'https://69442918-670e-4142-8fd5-3c056a52198b.mock.pstmn.io/products'
      )
      .then((response) => {
        const { data, status } = response;
        if (status === 200) {
          const { Comercio, Productos, Categorias } = data;
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
            const { idCategoria, nombreCat, imagenCat } = item[1];
            return categories.push({ idCategoria, nombreCat, imagenCat });
          });
          dispatch({
            type: TYPES.FETCH_PRODUCTS,
            payload: {
              commerce: Comercio,
              products,
              categories,
            },
          });
        } else {
          setErrorhandler(true);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      <ProductsList loading={loading} errorHanlder={errorHanlder} />
    </StateContext.Provider>
  );
};

export default App;
