import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';

import HomeContainer from './Home/containers/HomeContainer';

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="home" 
            component={HomeContainer} 
            title="Home" 
            initial 
            navigationBarStyle={{backgroundColor: '#388238'}}
            //navigationBarTitleImageStyle={{color: 'white'}}
            titleStyle={{color: 'white'}}
            statusBarStyle={{color: 'red'}}
            hideNavBar
        />
    </Scene>
);

export default scenes;