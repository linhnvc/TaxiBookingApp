import React from "react";
import {Text} from "react-native";
import { View, Button } from "native-base";

import styles from "./FabStyles";

export const PrepareFab = () => {
    return(
        <Button style={styles.prepareFabContainer}>
            <Text style={styles.btnText}>
                Book
            </Text>
        </Button>
    );
}

export default PrepareFab;