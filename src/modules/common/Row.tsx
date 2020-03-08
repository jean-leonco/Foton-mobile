import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View<Props>`
  flex-direction: row;
  align-items: ${props => props.justify || 'center'};
  justify-content: ${props => props.align || 'center'};
`;

interface Props {
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
}

const Row: React.FC<Props> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default Row;
