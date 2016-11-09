import React from'react';
import { connect } from 'react-redux';
import ProductsList from './ProductsList';
import { deleteProduct } from '../../redux/products'

const mapStateToProps = ({ products }) => ({ products });

const mapDispatchtoProps = dispatch => {
	return {
		deleteProduct : (productId) => {
      console.log('deleting', productId)
			dispatch(deleteProduct(productId));
		}
	}
}

export default connect(mapStateToProps, mapDispatchtoProps)(ProductsList);
