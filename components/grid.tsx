import React from 'react';
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Movie } from '../data/movie';

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  const router = useRouter();
  const { width } = useWindowDimensions();

  // 1. Limita a largura máxima do grid no PC (ex: no máximo 1000px)
  const maxGridWidth = Math.min(width, 1000);

  // 2. Define o número de colunas: 4 no PC, 3 em Tablets, 2 no Celular
  const numColumns = width > 900 ? 4 : width > 600 ? 3 : 2;

  const horizontalPadding = 16;
  const gap = 12;

  // 3. Calcula a largura do card com base na largura máxima controlada
  const cardWidth =
    (maxGridWidth - horizontalPadding * 2 - gap * (numColumns - 1)) / numColumns;

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {movies.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => router.push(`/filmes/${item.id}`)}
            style={({ pressed, hovered }) => [
              styles.card,
              { width: cardWidth },
              pressed && styles.cardPressed,
              Platform.OS === 'web' && hovered && styles.cardHovered,
            ]}
          >
            <Image
              source={item.imagem}
              style={[
                styles.poster,
                {
                  width: '100%',
                  height: cardWidth * 1.45, // Mantém a proporção do cartaz
                },
              ]}
              resizeMode="cover"
            />

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
    alignItems: 'center', // Centraliza o grid em telas gigantes de PC
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que os cards vão para a próxima linha
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 30,
    justifyContent: 'flex-start',
    maxWidth: 1000, // Garante que o grid não estique além de 1000px no PC
    width: '100%',
  },

  card: {
    backgroundColor: '#171717',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },

  cardPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },

  cardHovered: {
    opacity: 0.92,
    transform: [{ scale: 1.02 }],
  },

  poster: {
    backgroundColor: '#222',
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