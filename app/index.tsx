import { View, StyleSheet, ScrollView, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CinemandoTitle from '../components/cinemandoTitle';
import Carrossel from '../components/carrossel';

export default function IndexScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();

    // Se a largura for maior que 768px (PC/Tablet), usa tamanho 42, senão usa 22 (Celular)
    const titleSize = width > 768 ? 42 : 22;

    return (
        <ScrollView style={styles.all}>
            <View style={styles.header}>
                <View style={styles.headerSide} />

                <View style={styles.headerCenter}>
                    <CinemandoTitle fontSize={titleSize} />
                </View>

                <View style={[styles.headerSide, styles.headerRight]}>
                    <Pressable
                        style={styles.btnCadastro}
                        onPress={() => router.push('/cadastro')}
                    >
                        <Ionicons name="person-add-outline" size={14} color="#FFF" style={{ marginRight: 4 }} />
                        <Text style={styles.btnText}>Cadastrar</Text>
                    </Pressable>
                </View>
            </View>

            <View>
                <Carrossel />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    all: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 12,
    },

    // A coluna do meio ajusta o tamanho automaticamente
    headerCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    // As colunas das pontas ocupam exatamente o mesmo espaço flexível
    headerSide: {
        flex: 1,
    },

    headerRight: {
        alignItems: 'flex-end', 
    },

    btnCadastro: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#770b10',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
    },

    btnText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12,
    },
});