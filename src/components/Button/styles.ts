import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 45px;
  background: #4b3bff;
  border-radius: 4px;

  opacity: ${(props: any) => (props.empty ? 0.5 : 1)};

  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;
