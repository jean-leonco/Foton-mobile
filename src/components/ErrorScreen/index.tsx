import React from 'react';

import { Container, Title, Error } from './styles';

type Props = {
  error: string;
};

export default function ErrorScreen(props: Props) {
  return (
    <Container>
      <Title>Oops, an error occurred. Try again later</Title>
      <Error>Error: {props.error}</Error>
    </Container>
  );
}
