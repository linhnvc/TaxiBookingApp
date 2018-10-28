import { connect } from 'react-redux';
import Home from '../components/Home';
import { getCurrentLocation, getInputData,
    toggleSearchResult, getAddressPrediction
} from '../modules/home';

const mapStateToProps = (state) => ({
    region: state.home.region,
    updateData: state.home.updateData || {},
    resultType: state.home.resultType || {},
    predictions: state.home.predictions || []
});

const mapActionCreators = {
    getCurrentLocation,
    getInputData,
    toggleSearchResult,
    getAddressPrediction
};

export default connect(mapStateToProps, mapActionCreators)(Home);