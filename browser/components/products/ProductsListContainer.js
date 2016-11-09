import React from'react';
import { connect } from 'react-redux';
import ProductsList from './ProductsList';
import { removeProduct } from '../../redux/products'

const mapStateToProps = ({ products }) => ({ products });

const mapDispatchtoProps = dispatch => {
	return {
		deleteProduct : (productId) => {
      console.log('deleting', productId)
			//dispatch(removeProduct(productId));
		}
	}
}

export default connect(mapStateToProps, mapDispatchtoProps)(ProductsList);
