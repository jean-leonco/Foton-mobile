import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 0 5px;

  flex-direction: column;

  border-bottom-color: #999;
  border-bottom-width: 1px;
`;

export const Label = styled.Text`
  font-size: 18px;
  color: #999;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#333',
})`
  flex: 1;
  font-size: 18px;
  color: #333;
`;
