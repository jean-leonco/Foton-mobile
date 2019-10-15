import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

//  ### STYLES

const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 25px 0 10px;
`;

const Search = styled.View`
  height: 45px;
  padding: 0 10px;

  flex: 1;
  flex-direction: row;
  align-items: center;

  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  width: 100%;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.7);
  padding: 0 10px;
`;

const Clear = styled.TouchableOpacity`
  background: #4b3bff;
  height: 45px;
  width: 50px;
  border-radius: 4px;
  margin-left: 5px;

  align-items: center;
  justify-content: center;
`;

//  ### JSX

export default function DashboardSearch() {
  const [search, setSearch] = useState('');

  return (
    <Actions>
      <Search>
        <Icon name="search" size={22} color="#333" />
        <Input
          placeholder="Search a product"
          autoCorrect={false}
          autoCapitalize="none"
          value={search}
          onChangeText={setSearch}
        />
      </Search>

      <Clear>
        <Icon name="clear" size={22} color="#fff" />
      </Clear>
    </Actions>
  );
}
