import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';

import MapContainer from './MapContainer';
import HeaderComponent from '../../../components/HeaderComponent/index';
import FooterComponent from '../../../components/FooterComponent';

class Home extends React.Component {

    componentDidMount() {
        this.props.getCurrentLocation();
    }
    render() {
        const region = {
            latitude:21.027763,
            longitude:105.834160,
            latitudeDelta:0.0922,
            longitudeDelta: 0.0421
        }
        return (
            <Container>
                <HeaderComponent />
                {   
                    this.props.region && 
                    <MapContainer   
                        region={this.props.region} 
                        getInputData={this.props.getInputData} 
                        toggleSearchResult={this.props.toggleSearchResult}
                        getAddressPrediction={this.props.getAddressPrediction}
                        resultType={this.props.resultType}
                        predictions={this.props.predictions}
                    />
                }
                <FooterComponent />
            </Container>
        );
    }
}

export default Home;