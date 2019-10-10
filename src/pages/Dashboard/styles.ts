import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #333;
`;

export const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
`;

export const Search = styled.View`
  height: 45px;
  padding: 0 10px;

  flex: 1;
  flex-direction: row;
  align-items: center;

  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Input = styled.TextInput`
  width: 100%;
  font-size: 16px;
  padding: 0 10px;
`;

export const Clear = styled.TouchableOpacity`
  background: #4b3bff;
  height: 45px;
  width: 45px;
  border-radius: 4px;
  margin-left: 5px;

  align-items: center;
  justify-content: center;
`;

export const ProductList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10px;
`;

export const ProductCard = styled(RectButton)`
  margin-bottom: 20px;
  padding: 10px;
`;

export const Product = styled.Text`
  color: #333;
  font-size: 18px;
  font-weight: bold;
`;

export const CreatedAt = styled.Text`
  color: #999;
  font-size: 14px;
  margin-top: 10px;
`;