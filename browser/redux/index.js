import { combineReducers } from 'redux';
import products from './products'
import currentProduct from './product'
import cartProducts from './cart'
import order from './order'
import user from './user'

export default combineReducers({
  products,
  currentProduct,
  cartProducts,
  order,
  user
});
