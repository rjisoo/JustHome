'use strict';

import { connect } from 'react-redux';
import Account from './Account';

const mapStateToProps = ({ account }) => ({
  account
});

const mapDispatchToProps = dispatch => {
	return {
	}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
