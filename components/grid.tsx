
import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
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

  

  // Espaçamento lateral da tela
  const horizontalPadding = 16;

  // Espaço entre os dois cards
  const gap = 12;

  // Largura de cada card
  const cardWidth = (width - horizontalPadding * 2 - gap) / 2;

  const renderMovie = ({ item }: { item: Movie }) => {
    return (
      <Pressable
        onPress={() => router.push(`/filmes/${item.id}`)}
        style={({ pressed, hovered }) => [
          styles.card,

          {
            width: cardWidth,
          },

          pressed && styles.cardPressed,

          Platform.OS === 'web' &&
            hovered &&
            styles.cardHovered,
        ]}
      >
        <Image
          source={item.imagem}
          style={[
            styles.poster,
            {
              width: cardWidth,
              height: cardWidth * 1.45,
            },
          ]}
          resizeMode="cover"
        />

        <View style={styles.info}>
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            {item.titulo}
          </Text>

          <Text
            style={styles.subtitle}
            numberOfLines={1}
          >
            {item.subtitulo}
          </Text>

          <View style={styles.details}>
            <Text style={styles.classificacao}>
              {item.classificacao}
            </Text>

            <Text style={styles.duration}>
              {item.duracao}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={movies}
      renderItem={renderMovie}
      keyExtractor={(item) => item.id}
      numColumns={2}

      columnWrapperStyle={styles.row}

      contentContainerStyle={styles.list}

      showsVerticalScrollIndicator={false}

      initialNumToRender={6}
      maxToRenderPerBatch={6}
      windowSize={5}

      removeClippedSubviews={Platform.OS !== 'web'}
    />
  );
}


const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
    gap:12,
  },

  card: {
    backgroundColor: '#171717',

    borderRadius: 12,

    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
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
