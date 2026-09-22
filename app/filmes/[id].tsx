
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getMovieById } from '../../data/movie';
import { Ionicons } from '@expo/vector-icons';

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { width } = useWindowDimensions();

  const movie = getMovieById(id as string);

  if (!movie) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>
          Filme não encontrado.
        </Text>
      </View>
    );
  }

  // Limita o tamanho da imagem no PC,
  // mas deixa ela responsiva no celular.
  const posterWidth = Math.min(width - 32, 500);
  const posterHeight = posterWidth * 1.45;

  const adicionarAoCarrinho = () => {
    router.push({
      pathname: '/carrinho',
      params: {
        titulo: movie.titulo,
        imagem: movie.imagem,
        sala: 'Sala 01 • IMAX',
        horario: '19:00',
        preco: '32',
      },
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* BOTÃO VOLTAR */}
      <Pressable
        style={styles.voltar}
        onPress={() => router.back()}
      >
        <Ionicons
          name="arrow-back"
          size={22}
          color="#FFF"
        />
        <Text style={styles.voltarText}>
          Voltar
        </Text>
      </Pressable>

      {/* IMAGEM */}
      <Image
        source={movie.imagem}
        style={[
          styles.poster,
          {
            width: posterWidth,
            height: posterHeight,
          },
        ]}
        resizeMode="cover"
      />

      {/* INFORMAÇÕES */}
      <View style={styles.info}>
        <Text style={styles.title}>
          {movie.titulo}
        </Text>

        <Text style={styles.subtitle}>
          {movie.subtitulo}
        </Text>

        <View style={styles.details}>
          <Text style={styles.classificacao}>
            {movie.classificacao}
          </Text>

          <Text style={styles.duration}>
            {movie.duracao}
          </Text>
        </View>

        <Text style={styles.categories}>
          {movie.categorias}
        </Text>

        <Text style={styles.sectionTitle}>
          Sinopse
        </Text>

        <Text style={styles.sinopse}>
          {movie.sinopse}
        </Text>

        {/* BOTÃO DO INGRESSO */}
        <Pressable
          style={({ pressed, hovered }) => [
            styles.btnCarrinho,
            pressed && styles.btnPressed,
            hovered && styles.btnHovered,
          ]}
          onPress={adicionarAoCarrinho}
        >
          <Ionicons
            name="ticket-outline"
            size={22}
            color="#FFF"
          />

          <Text style={styles.btnCarrinhoText}>
            Adicionar ingresso ao carrinho
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },

  content: {
    alignItems: 'center',
    padding: 16,
    paddingBottom: 40,
  },

  voltar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  voltarText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 6,
  },

  poster: {
    borderRadius: 14,
    backgroundColor: '#222',
  },

  info: {
    width: '100%',
    maxWidth: 500,
    paddingTop: 20,
  },

  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '700',
  },

  subtitle: {
    color: '#999',
    fontSize: 14,
    marginTop: 4,
  },

  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 15,
  },

  classificacao: {
    color: '#FFF',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 3,
    fontWeight: '700',
  },

  duration: {
    color: '#999',
    fontSize: 14,
  },

  categories: {
    color: '#AAA',
    fontSize: 14,
    marginTop: 15,
  },

  sectionTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 25,
    marginBottom: 8,
  },

  sinopse: {
    color: '#CCC',
    fontSize: 15,
    lineHeight: 23,
  },

  btnCarrinho: {
    marginTop: 25,
    width: '100%',
    backgroundColor: '#770b10',
    borderRadius: 10,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  btnPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

  btnHovered: {
    opacity: 0.9,
  },

  btnCarrinhoText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },

  notFound: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    justifyContent: 'center',
    alignItems: 'center',
  },

  notFoundText: {
    color: '#FFF',
    fontSize: 18,
  },
});
