const styles = {
    fabContainer: {
        borderColor: "#fff",
        borderWidth: 5,
        height: 80,
        width: 80,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 150,
        right:20,
        shadowColor: "#000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        backgroundColor:"#009300"
    },
    disabledState:{       
        backgroundColor: "#D7D7D7",
    },
    activeState: {
        backgroundColor:"#FF5E3A",
    },
    btnText: {
        fontSize: 16,
        color:"#fff",
    },
    amount:{
        fontWeight:"bold",
        fontSize: 12
    },
    prepareFabContainer: {
        borderColor: "#fff",
        borderWidth: 5,
        height: 80,
        width: 80,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 110,
        right:20,
        shadowColor: "#000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        backgroundColor:"#009300"
    }
};

export default styles;