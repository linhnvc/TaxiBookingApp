import React from 'react';
import { View } from 'native-base';
import MapView from 'react-native-maps';
import styles from './MapContainerStyle';
import SearchBox from '../SearchBox';

export const MapContainer = ({region}) => {

    return (
        <View style={styles.container}>
            <MapView
                provider={MapView.PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
            >
                <MapView.Marker 
                    coordinate={region}
                    pinColor='#015102'
                    title="Linh"
                    description="Hahaha"
                />
            </MapView>
            <SearchBox />
        </View>
    );
}

export default MapContainer;