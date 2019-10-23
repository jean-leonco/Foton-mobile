import React from 'react';
import { Slider } from 'react-native';
import styled from 'styled-components/native';

//  ### STYLES

const Container = styled.View`
  flex-direction: column;
`;

const Header = styled.View`
  margin-bottom: 5px;

  flex-direction: row;
  justify-content: space-between;
`;

const Label = styled.Text`
  font-size: 18px;
  color: #333;
`;

const Value = styled.Text`
  font-size: 18px;
  color: #999;
`;

//  ### JSX

export default function SliderInput({ style, label, value, ...rest }) {
  return (
    <Container style={style}>
      <Header>
        <Label>{label}</Label>
        <Value>$ {value}</Value>
      </Header>

      <Slider
        {...rest}
        maximumValue={100}
        minimumValue={0}
        thumbTintColor="#999"
        minimumTrackTintColor="#4b3bff"
        style={{
          height: 45,
        }}
      />
    </Container>
  );
}
