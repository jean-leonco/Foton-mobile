import React, { useEffect } from 'react';
import { Animated } from 'react-native';

//@ts-ignore
import logo from '../../assets/logo.png';

import { Container } from './styles';

const offset = new Animated.ValueXY({ x: 0, y: 0 });

export default function LoadingScreen() {
  function runAnimation() {
    Animated.sequence([
      Animated.timing(offset.y, {
        toValue: -25,
        duration: 1000,
        useNativeDriver: true,
      }),

      Animated.timing(offset.y, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => runAnimation());
  }

  useEffect(() => {
    runAnimation();
  }, []);

  return (
    <Container>
      <Animated.Image
        source={logo}
        style={[
          { transform: [...offset.getTranslateTransform()] },
          { width: 150, height: 150 },
        ]}
      />
    </Container>
  );
}
