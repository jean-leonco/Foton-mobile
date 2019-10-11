import React from 'react';
import { useState, useRef, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Title, Form, TInput, SubmitButton } from './styles';

export default function Create() {
  const priceRef = useRef<any>();
  const descriptionRef = useRef<any>();

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
          onSubmitEditing={() => descriptionRef.current.focus()}
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
          onSubmitEditing={() => priceRef.current.focus()}
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
