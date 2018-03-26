import { connect } from 'react-redux';
import Nav from '../components/Nav';

const mapStateToProps = state => ({
    // state.shopping.categoriesをNavコンポーネントのprops.categoriesに紐づける
    categories: state.shopping.categories
});

export default connect(mapStateToProps)(Nav);
