import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width
const styles = {
    searchBox:{
        top:45,
        position:"absolute",
        width:width
    },
    inputWrapper:{
        marginLeft:12,
        marginRight:12,
        marginTop:10,
        marginBottom:0,
        backgroundColor:"white",
        opacity:0.8,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderBottomWidth: 1,
        borderColor: '#E8E8FA'
    },
    secondInputWrapper:{
        marginLeft:12,
        marginRight:12,
        marginTop:0,
        backgroundColor:"white",
        opacity:0.9,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
    },
    inputSearch:{
        fontSize:14
    },
    label:{
        fontSize:10,
        fontStyle: "italic",
        marginLeft:10,
        marginTop:10,
        marginBottom:0
    }
};

export default styles;