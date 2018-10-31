import update from 'react-addons-update';
import constants from './actionConstants';
import { Dimensions } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

import request from '../../../util/request';
import calculateFare from '../../../util/fareCalculator';

// Constant
const { GET_CURRENT_LOCATION, 
    GET_INPUT, 
    TOGGLE_SEARCH_RESULT,
    GET_ADDRESS_PREDICTIONS,
    GET_SELECTED_ADDRESS,
    GET_DISTANCE_MATRIX,
    GET_FARE
} = constants;

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.022; //0.0922
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;


// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------
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

// GET INPUT
export function getInputData(payload) {
    return {
        type: GET_INPUT,
        payload
    }
}

// toggle search result
export function toggleSearchResult(payload) {
    return {
        type: TOGGLE_SEARCH_RESULT,
        payload
    }
}
// GET ADDRESS 
export function getAddressPrediction() {
    return (dispatch, store) => {
        let userInput = store().home.resultType.pickUp ? store().home.inputData.pickUp : store().home.inputData.dropOff;
        RNGooglePlaces.getAutocompletePredictions(userInput,
            {
                country: "VN"
            }    
        )
        .then((results) => 
            dispatch({
                type: GET_ADDRESS_PREDICTIONS,
                payload: results
            })
        )
        .catch((error) => console.log(error.message));
    };
}

// Get selected address
export function getSelectedAddress(payload) {
    const dummyNumbers = {
        baseFare: 0.4, 
        timeRate: 0.14,  
        distanceRate: 0.97, 
        surge: 1
    }
    return (dispatch, store) => {
        RNGooglePlaces.lookUpPlaceByID(payload)
        .then((results) => {
            dispatch({
                type: GET_SELECTED_ADDRESS,
                payload: results
            })
        })
        .then(() => {
            // get distance and time
            if (store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff) {
                request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
                .query({
                    origins: store().home.selectedAddress.selectedPickUp.latitude + "," + store().home.selectedAddress.selectedPickUp.longitude,
                    destinations: store().home.selectedAddress.selectedDropOff.latitude + "," + store().home.selectedAddress.selectedDropOff.longitude,
                    mode: "driving",
                    key: "AIzaSyDUYbTR-3PDWPhgxjENs4yf35g2eHc641s"
                })
                .finish((error, res) => {
                    dispatch({
                        type: GET_DISTANCE_MATRIX,
                        payload: res.body
                    })
                })
            }
            setTimeout(function(){
                if (store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff) {
                    const fare = calculateFare(
                        dummyNumbers.baseFare,
                        dummyNumbers.timeRate,
                        store().home.distanceMatrix.rows[0].elements[0].duration.value,
                        dummyNumbers.distanceRate,
                        store().home.distanceMatrix.rows[0].elements[0].distance.value,
                        dummyNumbers.surge
                    );
                    dispatch({
                        type: GET_FARE,
                        payload: fare
                    })
                }
            }, 1000)
        })
        .catch((error) => console.log(error.message));
    }
}


// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
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

function handleGetInputData(state, action) {
    const { key, value } = action.payload;
    return update(state, {
        inputData: {
            [key]: {
                $set: value
            }
        }
    });
}
function handleToggleSearchResult(state, action) {
    if (action.payload === "pickUp") {
        return update(state, {
            resultType: {
                pickUp: {
                    $set: true,
                },
                dropOff: {
                    $set: false,
                }
            },
            predictions: {
                $set: {}
            }
        });
    }
    if (action.payload === "dropOff") {
        return update(state, {
            resultType: {
                pickUp: {
                    $set: false,
                },
                dropOff: {
                    $set: true,
                }
            },
            predictions: {
                $set: {}
            }
        });
    }
}

function handleGetAddressPredictions(state, action) {
    return update(state, {
        predictions: {
            $set: action.payload
        }
    })
}

function handleGetSelectedAddress(state, action) {
    let selectedTitle = state.resultType.pickUp ? "selectedPickUp" : "selectedDropOff";
    return update(state, {
        selectedAddress: {
            [selectedTitle]: {
                $set: action.payload
            }
            
        },
        // ẩn kết quả tìm kiếm khi ấn chọn 1 địa điểm 
        resultType: {
            pickUp: {
                $set: false
            },
            dropOff: {
                $set: false
            }
        }
    })
}

function handleGetDistanceMatrix(state,action) {
    return update(state, {
        distanceMatrix: {
            $set: action.payload
        }
    })
}

function handleGetFare(state, action) {
    return update(state, {
        fare: {
            $set: action.payload
        }
    })
}




const ACTION_HANDLERS = {
    GET_CURRENT_LOCATION: handleGetCurrentLocation,
    GET_INPUT: handleGetInputData,
    TOGGLE_SEARCH_RESULT: handleToggleSearchResult,
    GET_ADDRESS_PREDICTIONS: handleGetAddressPredictions,
    GET_SELECTED_ADDRESS: handleGetSelectedAddress,
    GET_DISTANCE_MATRIX: handleGetDistanceMatrix,
    GET_FARE: handleGetFare
}
const initialState = {
    region: {
        latitude:21.027763,
        longitude:105.834160,
        latitudeDelta:0.0922,
        longitudeDelta: 0.0421
    },
    inputData: {},
    resultType: {},
    selectedAddress: {}
};

export function HomeReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state; 
}