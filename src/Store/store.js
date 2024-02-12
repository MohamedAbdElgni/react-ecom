import { createStore, applyMiddleware } from 'redux';
import { get_products } from './Reducers/ProudRducer';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const mystore = createStore(get_products,composeWithDevTools(applyMiddleware(thunk)));
export default mystore;

// Path: src/Store/store.js