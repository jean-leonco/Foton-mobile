import styled from 'styled-components/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20, alignItems: 'center' },
})`
  flex: 1;
`;

export const Logo = styled.Image`
  width: 100px;
  height: 100px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const TInput: any = styled(Input)`
  margin-top: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 50px;
`;

export const SignLinkText = styled.Text`
  color: #333;
  font-size: 16px;
`;
