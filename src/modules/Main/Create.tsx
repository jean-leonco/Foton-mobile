import React, { useState, useRef, useMemo } from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Input from '../Input';
import Button from '../Button';

//  ### STYLES

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 25px;
  align-self: flex-start;
  font-weight: bold;
  color: #333;
`;

const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  align-self: stretch;
  margin-top: 25px;
  padding: 10px;
`;

const TInput: any = styled(Input)`
  margin-bottom: 20px;
`;

const SubmitButton = styled(Button)`
  margin-top: 20px;
`;

//  ### JSX

export default function Create() {
  const priceRef = useRef<TextInput>();
  const descriptionRef = useRef<TextInput>();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const [empty, setEmpty] = useState(true);

  useMemo(() => {
    if (!name || !description || !price) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [name, description, price]);

  useMemo(() => {
    setPrice(price.replace(',', '.'));
  }, [price]);

  function handleSubmit() {
    if (empty) return;
  }

  return (
    <Container>
      <Title>Create a new Product</Title>

      <Form>
        <TInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Product name"
          label="Name"
          returnKeyType="next"
          onSubmitEditing={() =>
            descriptionRef.current && descriptionRef.current.focus()
          }
          value={name}
          onChangeText={setName}
        />

        <TInput
          multiline={true}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="A little about the product"
          label="Description"
          ref={descriptionRef}
          returnKeyType="next"
          onSubmitEditing={() => priceRef.current && priceRef.current.focus()}
          value={description}
          onChangeText={setDescription}
        />

        <TInput
          keyboardType="numeric"
          placeholder="How much it cost"
          label="Price"
          ref={priceRef}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={price}
          onChangeText={setPrice}
        />

        <SubmitButton loading={false} empty={empty} onPress={handleSubmit}>
          Create Product
        </SubmitButton>
      </Form>
    </Container>
  );
}

Create.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="library-add" size={20} color={tintColor} />
  ),
};
