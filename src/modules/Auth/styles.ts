import styled from 'styled-components/native';

import Input from '../Input';
import Button from '../common/Button';

export const Container = styled.View`
  background: #fff;
  padding: 20px;
  flex: 1px;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  width: 100px;
  height: 100px;
`;

export const Form = styled.KeyboardAvoidingView`
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
  align-self: center;
`;
