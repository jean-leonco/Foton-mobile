import React, { forwardRef } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

//  ### STYLES

const Container = styled.View`
  flex-direction: column;
`;

const Label = styled.Text`
  font-size: 18px;
  color: #333;

  margin-bottom: 5px;
`;

const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  height: 45px;
  color: rgba(0, 0, 0, 0.7);
  font-size: 16px;

  border: 1px solid #ddd;
  border-radius: 4px;

  padding: 0 10px;
`;

//  ### JSX

function Input({ style, label, ...rest }, ref) {
  return (
    <Container style={style}>
      <Label>{label}</Label>
      <TInput {...rest} ref={ref} />
    </Container>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Input.defaultProps = {
  style: {},
};

export default forwardRef(Input);
