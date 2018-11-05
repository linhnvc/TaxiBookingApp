import React from 'react';
import { Text } from 'react-native';
import { View } from 'native-base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './MapContainerStyle';
import SearchBox from '../SearchBox';
import SearchResults from '../SearchResults';

// const mapStyle = {
//     transform: [
//         { rotateY: '180deg'},
//         { rotateX: '90deg'},
//     ]
// }

export const MapContainer = ({
    region,
    getInputData,
    toggleSearchResult, getAddressPrediction,
    resultType, predictions, getSelectedAddress,
    selectedAddress,
    carMarker,
    nearByDrivers
}) => {

    return (
        <View style={styles.container}>
            <MapView
                provider={MapView.PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
            // customMapStyle={mapStyle}
            >
                <MapView.Marker
                    coordinate={region}
                    pinColor='#015102'
                    title="Linh"
                    description="Hahaha"
                />
                {
					nearByDrivers && nearByDrivers.map((marker, index)=>
						<MapView.Marker
							key={index}
							coordinate={{latitude:marker.coordinate.coordinates[1], longitude:marker.coordinate.coordinates[0] }}
                            image={carMarker}
						/>	
					)
				}
            </MapView>
            <SearchBox
                getInputData={getInputData}
                toggleSearchResult={toggleSearchResult}
                getAddressPrediction={getAddressPrediction}
                selectedAddress={selectedAddress}
            />
            {
                (resultType.pickUp || resultType.dropOff) &&
                <SearchResults
                    predictions={predictions}
                    getSelectedAddress={getSelectedAddress}
                />
            }
        </View>
    );
}

export default MapContainer;