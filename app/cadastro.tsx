import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CadastroScreen() {
  const router = useRouter();

  return (
    <View style={styles.all}>

      <View style={styles.header}>
        <Pressable
          style={styles.btnVoltar}
          onPress={() =>router.replace('/')}
        >
          <Ionicons name="arrow-back" size={20} color="#FFF" />
          <Text style={styles.btnVoltarText}>Voltar</Text>
        </Pressable>
      </View>

    <View style={styles.container}>
      <View style={styles.box}>

      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  all: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },

  btnVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },

  btnVoltarText: {
    color: '#FFF',
    marginLeft: 6,
    fontSize: 16,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  box: {
    width: '75%',
    height: '90%',       
    aspectRatio: 1,  
    backgroundColor: 'gray',
    borderRadius: 16,
  },

});