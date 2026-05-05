import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  View,
} from "react-native";

export default function ConfigMenuScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/extra/config_background.png")}
    >

      {/* Botão de Sair (Canto Superior Esquerdo) */}

      <TouchableOpacity
        style={styles.backbutton}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require('../../assets/extra/leave_button.png')}
          style={styles.iconsize}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Painel de Configurações */}

      <View style={styles.settingsPanel}>

        {/* Configurações de Idioma */}

        <View style={styles.row}>
          <Text style={styles.label}>IDIOMA</Text>
          <Image
            source={require('../../assets/extra/flag1.png')} 
            style={styles.flagIcon}
          />
          <View style={styles.emptySpace} />
        </View>

        {/* Configurações de VFX */}

        <View style={styles.row}>
          <Text style={styles.label}>VFX</Text>
          <Image
            source={require('../../assets/extra/sound_button.png')}
            style={styles.soundIcon}
          />
          <View style={styles.sliderPlaceholder} /> {/* Aqui entraria um Slider real */}
        </View>

        {/* Configurações de Som */}

        <View style={styles.row}>
          <Text style={styles.label}>SOM</Text>
          <Image
            source={require('../../assets/extra/sound_button.png')}
            style={styles.soundIcon}
          />
          <View style={styles.sliderPlaceholder} /> {/* Aqui entraria um Slider real */}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  
  backbutton: {
    position: "absolute",
    top: 30,
    left: 0,
    zIndex: 10,
  },

  settingsPanel: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 120,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25, 
    width: '80%',
    bottom: 70,
    height: 50,
    overflow: 'visible',
  },

  iconsize: {
    width: 150,
    height: 150,
  },

  label: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    width: 120, 
    marginRight: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },

  flagIcon: {
    width: 150,
    height: 90,
    top: 20,

  },

  soundIcon: {
    width: 150,
    height: 150,
    marginRight: 15,
  },

  sliderPlaceholder: {
    flex: 1,
    height: 30,
    backgroundColor: '#3b0066', 
    borderRadius: 15,
    marginLeft: 10,
  },

  emptySpace: {
    flex: 1, 
  }
});