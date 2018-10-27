import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';

import MapContainer from './MapContainer';

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
                
                    <MapContainer region={region} />
                
                    
                
                
            </Container>
        );
    }
}

export default Home;