import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Container, Label, TInput } from './styles';

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
