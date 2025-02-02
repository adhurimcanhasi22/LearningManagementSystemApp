import { TouchableOpacity, StyleSheet } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

export const FloatingActionButton = ({ onPress }: { onPress: () => void }) => {

  return (

    <TouchableOpacity style={styles.button} onPress={onPress}>

      <MaterialIcons name="add" size={28} color="white" />

    </TouchableOpacity>

  );

};

const styles = StyleSheet.create({

  button: {

    position: 'absolute',

    bottom: 24,

    right: 24,

    backgroundColor: '#3498db',

    width: 56,

    height: 56,

    borderRadius: 28,

    justifyContent: 'center',

    alignItems: 'center',

    elevation: 4,

  },

});
