import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Container = styled.View`
  margin-top: 30px;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: #999;
  font-size: 25px;
  text-align: center;
  margin-top: 10px;
`;

export default function Empty() {
  return (
    <Container>
      <Icon name="not-interested" size={45} color="#999" />
      <Text>There is no product to show</Text>
    </Container>
  );
}
