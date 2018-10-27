import React, { Component, ReactPropTypes } from 'react';
import { Router } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import scenes from '../routes/scenes';
export default class AppContainer extends Component {
    static ReactPropTypes = {
        store: PropTypes.object.isRequired
    }
    render() {
        return(
            <Provider store={this.props.store}>
                <Router scenes={scenes} />

                
            </Provider>
        );
    }
}