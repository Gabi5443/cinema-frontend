import React from 'react';
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Movie } from '../data/movie';

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {movies.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => router.push(`/filmes/${item.id}`)}
            style={({ pressed, hovered }) => [
              styles.card,
              pressed && styles.cardPressed,
              Platform.OS === 'web' && hovered && styles.cardHovered,
            ]}
          >
            <View style={styles.imageWrapper}>
              <Image
                source={item.imagem}
                style={styles.poster}
                resizeMode="cover"
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={1}>
                {item.titulo}
              </Text>

              <Text style={styles.subtitle} numberOfLines={1}>
                {item.subtitulo}
              </Text>

              <View style={styles.details}>
                <Text style={styles.classificacao}>{item.classificacao}</Text>
                <Text style={styles.duration}>{item.duracao}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingHorizontal: 16,
    paddingBottom: 30,
    justifyContent: 'center',
    maxWidth: 1100,
    width: '100%',
  },

  card: {
    backgroundColor: '#171717',
    borderRadius: 12,
    overflow: 'hidden',
    // Define larguras fixas por breakpoint CSS flexível
    width: '100%',
    maxWidth: 180, // Limita a largura máxima do card no PC
    minWidth: 140, // Garante um tamanho mínimo no telemóvel
    flexGrow: 1,
  },

  cardPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },

  cardHovered: {
    opacity: 0.92,
    transform: [{ scale: 1.02 }],
  },

  imageWrapper: {
    width: '100%',
    aspectRatio: 2 / 3, // Força a proporção do cartaz sem depender de cálculo JS
    backgroundColor: '#222',
  },

  poster: {
    width: '100%',
    height: '100%',
  },

  info: {
    padding: 8,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  subtitle: {
    color: '#999999',
    fontSize: 10,
    marginTop: 2,
  },

  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 6,
  },

  classificacao: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },

  duration: {
    color: '#888',
    fontSize: 10,
  },
});