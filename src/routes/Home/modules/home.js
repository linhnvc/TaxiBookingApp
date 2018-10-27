import update from 'react-addons-update';
import constants from './actionConstants';
import { Dimensions } from 'react-native';

// Constant
const { GET_CURRENT_LOCATION } = constants;

const { width, height } = Dimensions.get('window');
const ASPECT_RATION = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATION * LATITUDE_DELTA;


// Actions
export function getCurrentLocation() {
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch({
                    type: GET_CURRENT_LOCATION,
                    payload: position
                })
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }
}

// Action handler
function handleGetCurrentLocation(state, action) {
    return update(state, {
        region: {
            latitude: {
                $set: action.payload.coords.latitude
            },
            longtitude: {
                $set: action.payload.coords.longtitude
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
    region: {}
};

export function HomeReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state; 
}