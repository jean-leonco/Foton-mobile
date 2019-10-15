import React, { useEffect } from 'react';
import { ActivityIndicator, Animated } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

const opacity = new Animated.Value(0.5);

const AnimatedContainer = Animated.createAnimatedComponent(Container);

export default function Button({ style, children, loading, empty, ...rest }) {
  const enable = Animated.timing(opacity, {
    toValue: 1,
    duration: 100,
  });

  const disable = Animated.timing(opacity, {
    toValue: 0.5,
    duration: 200,
  });

  useEffect(() => {
    if (!empty) {
      enable.start();
    } else if (empty) {
      disable.start();
    } else if (!loading) {
      enable.start();
    } else if (loading) {
      disable.stop();
    }
  }, [empty, loading]);

  return (
    //@ts-ignore
    <AnimatedContainer
      {...rest}
      empty={empty}
      enabled={!loading && !empty}
      style={[...style, { opacity }]}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text>{children}</Text>
      )}
    </AnimatedContainer>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
};
