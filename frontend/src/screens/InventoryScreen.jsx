import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  View,
} from "react-native";

export default function InventoryScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/extra/menuitem_background.png")}>
         
        {/* Painel de Inventário */}

        <View style={styles.inventoryPanel}>

        {/* Botão de Sair (Canto Superior Esquerdo) */}
            <View style={styles.panelHeader}>
                <TouchableOpacity
                    style={styles.backbutton}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        style={styles.iconsize}
                        source={require('../../assets/extra/leave_button.png')}
                    />
                </TouchableOpacity>
            </View>
        {/* Itens do Inventário */}
            <View style={styles.gridContainer}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                <View key={item} style={styles.slotitem}>
                    <Image
                    source={require("../../assets/extra/slot.png")}
                    style={styles.slotImage}
                />
            </View>
          ))}
            </View>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        allignItems: 'center',
    },

    panelHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },

    backbutton: {
        padding: 5,
    },

    iconsize: {
        width: 150,
        height: 150,
    },

    inventoryPanel: {
        flex: 0.9, 
        padding: 10, 
        justifyContent: 'flex-start',
    },

    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 0,
    },

    slotitem: {
        width: 80, 
        height: 80,
        margin: 20,  
        justifyContent: "center",
        alignItems: "center",
    }
});
