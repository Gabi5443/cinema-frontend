import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useWindowDimensions } from 'react-native';
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import CinemandoTitle from '../components/cinemandoTitle';
import Carrossel from '../components/carrossel';

export default function IndexScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();

    // Se a largura for maior que 768px (PC/Tablet), usa tamanho 42, senão usa 22 (Celular)
    const titleSize = width > 768 ? 42 : 30;

    const [menuAberto, setMenuAberto] = useState(false);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    const navegarPara = (caminho: string) => {
        setMenuAberto(false);

        router.push(caminho as any);
    };

    return (
        <ScrollView style={styles.all}>

            <View style={styles.header}>

                <View style={styles.menuContainer}>

                    <TouchableOpacity style={styles.btnMenu} onPress={toggleMenu}>
                        <AntDesign name="menu" size={24} color="#fff" />
                    </TouchableOpacity>

                    {menuAberto && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity
                                style={styles.dropdownBtn}
                                onPress={() => navegarPara('/cadastro')}
                            >
                                <Text style={styles.btnText}>Cadastro</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.dropdownBtn}
                                onPress={() => navegarPara('/carrinho')}
                            >
                                <Text style={styles.btnText}>Meu carrinho</Text>
                            </TouchableOpacity>

                        </View>
                    )}
                </View>

                <CinemandoTitle fontSize={titleSize} />

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
        justifyContent: 'center',
        paddingTop: 15,
        paddingHorizontal: 20,
        position: 'relative',
        minHeight: 80, // Mantém altura suficiente para o botão não encavalar
        zIndex: 100,  // Garante que o header inteiro fique acima do carrossel no iOS
        elevation: 10, // Garante sobreposição no Android
    },

    menuContainer: {
        position: 'absolute',
        left: 20,
        top: 30,
        zIndex: 101, // Fica acima do próprio header
        alignItems: 'flex-start',
    },

    btnMenu: {
        padding: 10,
        borderRadius: 6,
        backgroundColor: '#770b10',
    },
    dropdown: {
        position: 'absolute',
        top: 50,
        left: 0,
        backgroundColor: '#770b10',
        borderRadius: 8,
        paddingVertical: 8,
        width: 180,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 10,
        zIndex: 102,
    },
    dropdownBtn: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    btnText: {
        fontSize: 16,
        color: '#fff',
        
    },
});