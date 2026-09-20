import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CinemandoTitleProps {
  fontSize?: number;
}

export default function CinemandoTitle({ fontSize = 36 }: CinemandoTitleProps): React.JSX.Element {
  const title = "CINEMANDO";
  
  // Paleta de vermelhos: da ponta (índice 0, mais escuro) até o centro (índice 4, mais claro)
  const redShades = [
    '#800303', // (C e O)
    '#a10f0f', // (I e D) 
    '#942020', // (N e N) 
    '#b82834', // (E e A) 
    '#b93e3e', // (M) 
  ];

  const letters = title.split('');
  const centerIndex = (letters.length - 1) / 2; // Para 9 letras, o centro é o índice 4 (M)

  return (
    <View style={styles.container}>
      {letters.map((letter, index) => {
        // Calcula a distância da letra atual em relação ao centro
        const distanceFromCenter = Math.abs(index - centerIndex);
        
        // Inverte a distância para que a cor mais clara (último índice) fique no centro
        const colorIndex = Math.round(centerIndex - distanceFromCenter);
        const color = redShades[colorIndex];

        return (
          <Text
            key={index}
            style={[
              styles.letter,
              {
                color: color,
                fontSize: fontSize,
              },
            ]}
          >
            {letter}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  letter: {
    fontWeight: '900', // Deixa bem grosso para destacar o tom de cada letra
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});