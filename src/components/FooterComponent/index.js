import React from 'react';
import { Text } from 'react-native';
import { FooterTab, Button, Footer } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
//import styles from '../../routes/Home/components/SearchBox/SearchBoxStyle';
import styles from './FooterComponentStyles';


export const FooterComponent = () => {

    // tabBar items:
    const tabs = [
        { title: "TaxiCar", subTitle: "Cong Linh", icon: "car" },
        { title: "TaxiShare", subTitle: "Cong Linh", icon: "car" },
        { title: "TaxiPremium", subTitle: "Cong Linh", icon: "car" },
        { title: "TaxiBike", subTitle: "Cong Linh", icon: "car" },
    ];
    return (
        <Footer>
            <FooterTab style={styles.footerContainer} iosBarStyle='light-content'>
                {
                    tabs.map((obj, index) => {
                        return (
                            <Button key={index}>
                                <Icon size={18} name={obj.icon} color={(index === 0) ? '#009300' : '#eee'}/>
                                <Text style={{ fontSize: 11, fontWeight: '600', color: (index === 0) ? '#009300' : '#eee' }}>
                                    {obj.title}
                                </Text>
                                <Text style={[styles.subText, {color: (index === 0) ? '#009300' : '#eee'}]}>
                                    {obj.subTitle}
                                </Text>
                            </Button>
                        );
                    })
                }
            </FooterTab>
        </Footer>

    );
}

export default FooterComponent;