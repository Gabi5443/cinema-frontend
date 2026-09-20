import { useRouter } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import { View, ImageBackground, StyleSheet, TouchableOpacity, Text, Animated, } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Array com 5 filmes reais
const FILMES = [
    {
        id: '1',
        titulo: 'HOMEM-ARANHA',
        subtitulo: 'UM NOVO DIA',
        classificacao: '12',
        duracao: '2h24',
        categorias: 'Ação, Aventura, Fantasia',
        sinopse: 'Em uma Nova York onde ninguém mais sabe sua verdadeira identidade, Peter Parker enfrenta novos vilões enquanto descobre o real significado de recomeçar.',
        imagem: require('../assets/images/homem-aranha.png'),
    },
    {
        id: '2',
        titulo: 'BATMAN',
        subtitulo: 'THE BATMAN',
        classificacao: '14',
        duracao: '2h56',
        categorias: 'Ação, Crime, Drama',
        sinopse: 'Quando um assassino sádico deixa pistas, o Batman investiga o submundo de Gotham.',
        imagem: require('../assets/images/thebatman.png'),
    },
    {
        id: '3',
        titulo: 'DA MAGIA À SEDUÇÃO',
        subtitulo: 'FEITIÇO DE AMOR',
        classificacao: '14',
        duracao: '1h58',
        categorias: 'Fantasia, Drama, Romance',
        sinopse: 'As irmãs da família Owens se reúnem novamente para quebrar de vez a antiga maldição do amor que assombra gerações de mulheres da linhagem.',
        imagem: require('../assets/images/magiaaseducao.jpg'),
    },
    {
        id: '4',
        titulo: 'A ODISSEIA',
        subtitulo: 'O RETORNO DE ODISSEU',
        classificacao: '14',
        duracao: '2h52',
        categorias: 'Ação, Aventura, Fantasia',
        sinopse: 'Após a Guerra de Troia, o lendário rei Odisseu enfrenta criaturas míticas, deuses e perigos extremos em sua épica jornada de volta para casa.',
        imagem: require('../assets/images/aodisseia.jpg'),
    },
    {
        id: '5',
        titulo: 'A QUEDA 2',
        subtitulo: 'NO LIMITE',
        classificacao: '16',
        duracao: '1h45',
        categorias: 'Suspense, Ação',
        sinopse: 'Buscando superar o luto, duas amigas encaram uma perigosa escalada na Tailândia até que um deslizamento as deixa presas a mais de 900 metros de altura.',
        imagem: require('../assets/images/aqueda2.jpg'),
    },
];

export default function IndexScreen() {
    const router = useRouter();
    //-------------------------------------------------------------
    const [activeIndex, setActiveIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    // Função para realizar a transição suave (Fade Out -> Troca de Índice -> Fade In)
    const switchSlide = (novoIndice: number) => {
        //deixa um pouco transparente antes de trocar
        Animated.timing(fadeAnim, {
            toValue: 0.2,
            duration: 200,
            useNativeDriver: false,
        }).start(() => {
            //quando troca "setActiveIndex". deixa totalmente aparente de novo
            setActiveIndex(novoIndice);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: false,
            }).start();
        });
    };
    //------------------------------------------------------------

    //------------------------------------------------------------
    //conta de matematica para deixar "infinito" o carrossel, quando pressionado as setas, nesse caso, da direita
    //Se você está no filme 0 e avança: (0 + 1) % 5 = 1 (Vai pro filme 2).
    //Se você está no filme 3 e avança: (3 + 1) % 5 = 4 (Vai pro filme 5).
    //Se você está no filme 4 e avança: (4 + 1) % 5 = 0 (Volta para o primeiro filme!).
    const avancarSlide = () => {
        const nextIndex = (activeIndex + 1) % FILMES.length;
        switchSlide(nextIndex);
    };

    //código inverso para quando clicar na seta da esquerda
    const voltarSlide = () => {
        const prevIndex = (activeIndex - 1 + FILMES.length) % FILMES.length;
        switchSlide(prevIndex);
    };

    //função das bolinhas em baixo
    const bolinhasInferiores = (index: number) => {
        //verifica se você não está clicando no filme que já está na tela
        if (index !== activeIndex) {
            switchSlide(index);
        }
    };
    //---------------------------------------------------------

    //---------------------------------------------------------
    //o temporizador par avançar os filmes 
    useEffect(() => {
        // 1. Liga o cronômetro
        const timer = setInterval(() => {
            avancarSlide(); // Chama a função de passar pro próximo filme
        }, 3000); // 3000 milissegundos = 3 segundos

        // 2. Desliga o cronômetro (Limpeza)
        return () => clearInterval(timer);
    }, [activeIndex]); //Diz ao React: "Rode esse useEffect toda vez que a variável activeIndex mudar de valor".
    //--------------------------------------------------------

    const filmeAtual = FILMES[activeIndex];
    //Essa linha diz: "Pegue na lista completa (FILMES) a ficha do filme que corresponde ao número (activeIndex) do slide atual e guarde na variável filmeAtual para colocar na tela".

    {/*--------------------------------------------------------------------------------- */ }
    return (
        //conteiner = parte principal, onde define tamanho, bordas etc
        <View style={styles.container}>

            {/* é o controle da animação de "aparecer e desaparecer" (o Fade), quando fadeAnim ta em 1, parece tudo, quando ta em 0.2, tudo fica semi-transparente */}
            <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>

                <ImageBackground //onde fica a imagem do filme, preenche o carrossel todo e é possível colocar botoes e textos por cima, oq seria impossivel com a tag <Image>
                    source={filmeAtual.imagem}
                    style={styles.image}
                    blurRadius={3} // Cria um fundo preenchido e elegante
                    resizeMode="cover"
                >
                    {/*view em que apenas da uma cor, escurece um pouco para ser visivel o texto branco por cima da foto */}
                    <View style={styles.overlay} />

                    {/* view que organiza as infos dos filmes, com position: 'absolute', bottom: 45, left: 80, para deixar estática no msm lugar, n importa o tamanho da imagem de fundo */}
                    <View style={styles.infoContainer}>
                        <Text style={styles.titulo}>{filmeAtual.titulo}</Text>
                        <Text style={styles.subtitulo}>{filmeAtual.subtitulo}</Text>

                        <View style={styles.detalhesRow}>
                            <Text style={styles.detalhesText}>Cinema</Text>
                            <Text style={styles.dotSeparator}>•</Text>
                            <View style={styles.badgeContainer}>
                                <Text style={styles.badgeText}>{filmeAtual.classificacao}</Text>
                            </View>
                            <Text style={styles.dotSeparator}>•</Text>
                            <Text style={styles.detalhesText}>{filmeAtual.duracao}</Text>
                            <Text style={styles.dotSeparator}>•</Text>
                            <Text style={styles.detalhesText}>{filmeAtual.categorias}</Text>
                        </View>

                        {/*Recorta o texto para ter no máximo 2 linhas. Se for maior que isso, o React Native corta e coloca três pontinhos (...) no final automaticamente. */}
                        <Text style={styles.sinopse} numberOfLines={2}>
                            {filmeAtual.sinopse}
                        </Text>

                        <View style={styles.botoesRow}>
                            <TouchableOpacity
                                style={styles.btnIngressos}
                                onPress={() => router.push('/cadastro')}>
                                <Text style={styles.btnIngressosText}>Ingressos</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </Animated.View>

            {/* Indicadores em Bolinhas (Dots) */}
            <View style={styles.dotsContainer}>
                {/*o map varre a lista de filmes e desenha uma bolinha (TouchableOpacity) para cada filme encontrado. Como temos 5 filmes, ele renderiza 5 bolinhas. */}
                {FILMES.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.dot,
                            activeIndex === index ? styles.dotActive : styles.dotInactive, //Se a bolinha for a do filme atual, ela recebe o estilo dotActive (branca e mais comprida). Se não for, recebe dotInactive (menor e semi-transparente).
                        ]}
                        onPress={() => bolinhasInferiores(index)} //Ao clicar na bolinha, chama a função para ir direto para aquele filme.
                    />
                ))}
            </View>

            {/* Botões de Navegação Lateral */}
            <TouchableOpacity
                style={[styles.arrowButton, styles.leftArrow]}
                onPress={voltarSlide} //onPress={voltarSlide} e onPress={avancarSlide}, conectam os cliques das setas às funções que recalculam o índice do filme.
                activeOpacity={0.7} //Controla a leve transparência que o botão faz ao ser pressionado pelo usuário.
            >
                <MaterialIcons name="keyboard-arrow-left" size={48} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.arrowButton, styles.rightArrow]}
                onPress={avancarSlide}
                activeOpacity={0.7}
            >
                <MaterialIcons name="keyboard-arrow-right" size={48} color="#fff" />
            </TouchableOpacity>
            {/*--------------------------------------------------------------------------------- */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 480,
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 24,
        overflow: 'hidden', //faz com que qualquer coisa colocada dentro dela respeite seu tamanho e bordas     
        backgroundColor: '#0a0d14',
        position: 'relative',
    },
    animatedContainer: {
        width: '100%',
        height: '100%',
    },

    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    //oq escurece atras dos textos
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(10, 13, 20, 0.55)',
    },

    infoContainer: {
        position: 'absolute',
        left: 80,
        bottom: 45,
        maxWidth: 480,
        zIndex: 5,
    },
    titulo: {
        color: '#770b10',
        fontSize: 32,
        fontWeight: '900',
        letterSpacing: 1.5,
        textShadowColor: '#FFFFFF',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    subtitulo: {
        color: '#ffffffa9',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
    },

    //cinema, duração, faixa etaria, e categoria
    detalhesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    detalhesText: {
        color: '#CCC',
        fontSize: 13,
    },

    dotSeparator: {
        color: '#888',
        marginHorizontal: 6,
    },
    //a caixinha da faixa etaria
    badgeContainer: {
        backgroundColor: '#EAB308',
        paddingHorizontal: 6,
        paddingVertical: 1,
        borderRadius: 4,
    },
    badgeText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 11,
    },

    sinopse: {
        color: '#AAA',
        fontSize: 13,
        marginBottom: 16,
        lineHeight: 18,
    },

    //botao ingresso
    botoesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    btnIngressos: {
        backgroundColor: '#770b10',
        paddingHorizontal: 22,
        paddingVertical: 10,
        borderRadius: 20,
    },
    btnIngressosText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },

    //bolinhas inferiores
    dotsContainer: {
        position: 'absolute',
        bottom: 15,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        zIndex: 5,
    },
    dot: {
        height: 8,
        borderRadius: 4,
    },
    dotActive: {
        width: 22,
        backgroundColor: '#FFF',
    },
    dotInactive: {
        width: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },

    //setas
    arrowButton: {
        position: 'absolute',
        top: '45%',
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    leftArrow: {
        left: 20,
    },
    rightArrow: {
        right: 20,
    },
});