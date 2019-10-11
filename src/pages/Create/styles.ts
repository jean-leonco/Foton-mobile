import styled from 'styled-components/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 25px;
  align-self: flex-start;
  font-weight: bold;
  color: #333;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  align-self: stretch;
  margin-top: 50px;
`;

export const TInput: any = styled(Input)`
  margin-top: 20px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 40px;
`;
