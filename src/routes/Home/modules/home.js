import update from 'react-addons-update';
import constants from './actionConstants';
import { Dimensions } from 'react-native';

// Constant
const { GET_CURRENT_LOCATION } = constants;

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.022; //0.0922
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;


// Actions
export function getCurrentLocation() {
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch({
                    type: GET_CURRENT_LOCATION,
                    payload: position
                    
                });
                
            },
            
            (error) => console.log(error.message),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        );
    }
}

// Action handler
function handleGetCurrentLocation(state, action) {
    return update(state, {
        region: {
            latitude: {
                // $set: action.payload.coords.latitude
                $set: 20.990210
            },
            longitude: {
                // $set: action.payload.coords.longitude
                $set: 105.854332
            },
            latitudeDelta: {
                $set: LATITUDE_DELTA
            },
            longitudeDelta: {
                $set: LONGITUDE_DELTA
            }
        }
    })
}



const ACTION_HANDLERS = {
    GET_CURRENT_LOCATION: handleGetCurrentLocation
}
const initialState = {
    region: {
        latitude:21.027763,
        longitude:105.834160,
        latitudeDelta:0.0922,
        longitudeDelta: 0.0421
    }
};

export function HomeReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state; 
}