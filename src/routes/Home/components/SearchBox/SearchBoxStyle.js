import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width
const styles = {
    searchBox:{
        top:0,
        position:"absolute",
        width:width
    },
    inputWrapper:{
        marginLeft:12,
        marginRight:12,
        marginTop:12,
        marginBottom:0,
        backgroundColor:"white",
        opacity:0.9,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        //borderBottomWidth: 1,
        borderColor: '#cccccc',
        borderBottomColor: '#cccccc',
        borderWidth: 0.5,
    },
    secondInputWrapper:{
        marginLeft:12,
        marginRight:12,
        marginTop:0,
        backgroundColor:"white",
        opacity:0.9,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        borderWidth: 0.5,
        borderColor: '#cccccc',
        borderTopColor: '#cccccc',
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