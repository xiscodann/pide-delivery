import React, { useReducer } from 'react';
import '../../scss/app.scss';
import { reducer } from '../reducers/index';
import ProductsList from './ProductsList';
import StateContext from '../base/context';
import { store } from '../states/index';

const App = () => {
  const [state, dispatch] = useReducer(reducer, store);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      <ProductsList />
    </StateContext.Provider>
  );
};

export default App;
