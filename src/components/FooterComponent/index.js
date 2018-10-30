import React from 'react';
import { Text } from 'react-native';
import { FooterTab, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
//import styles from '../../routes/Home/components/SearchBox/SearchBoxStyle';
import styles from './FooterComponentStyles';

export const FooterComponent = () => {
    return (
        <FooterTab style={{ backgroundColor: '#ff5e3a' }} iosBarStyle='light-content'>
            <Left>
                <Button transparent>
                    <Icon name='bars' style={styles.icon} />
                </Button>
            </Left>
            <Body>
                <Text style={styles.headerText}>Taxi Booking</Text>
            </Body>

            <Right>
                <Button transparent>
                    <Icon name='gift' style={styles.icon} />
                </Button>
            </Right>
        </FooterTab>
    );
}

export default FooterComponent;