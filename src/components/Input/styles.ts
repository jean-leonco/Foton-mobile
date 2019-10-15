import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: column;
`;

export const Label = styled.Text`
  font-size: 18px;
  color: #333;

  margin-bottom: 5px;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  height: 45px;
  color: rgba(0, 0, 0, 0.7);
  font-size: 16px;

  border: 1px solid #ddd;
  border-radius: 4px;

  padding: 0 10px;
`;
