import React, { useState, useRef, useMemo } from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Input from '../Input';
import Button from '../Button';
import Slider from '../Slider';
import CreateProductMutation from './mutation/CreateProductMutation';
import { showMessage } from 'react-native-flash-message';

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

const PSlider = styled(Slider)`
  margin-bottom: 20px;
`;

const SubmitButton = styled(Button)`
  margin-top: 20px;
`;

//  ### JSX

export default function Create({ navigation }) {
  const descriptionRef = useRef<TextInput>();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const [empty, setEmpty] = useState(true);
  const [loading, setLoading] = useState(false);

  useMemo(() => {
    if (!name || !description || !price) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [name, description, price]);

  function handleResponse(product, error) {
    setLoading(false);

    if (product) {
      navigation.navigate('Details', { id: product.id });
    } else {
      showMessage({
        message: 'Creation failed',
        description: error as string,
        type: 'danger',
        icon: 'info',
      });
    }
  }

  function handleSubmit() {
    if (empty) return;

    setLoading(true);

    CreateProductMutation.commit(
      { name, description, price },
      ({ CreateProductMutation }) =>
        CreateProductMutation &&
        handleResponse(
          CreateProductMutation.product,
          CreateProductMutation.error,
        ),

      error =>
        showMessage({
          message: 'Creation failed',
          description: error.message,
          type: 'danger',
          icon: 'info',
        }),
    );
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
          value={description}
          onChangeText={setDescription}
        />

        <PSlider
          placeholder="How much it cost"
          label="Price"
          value={price}
          step={0.5}
          onValueChange={(value: number) => setPrice(value)}
        />

        <SubmitButton loading={loading} empty={empty} onPress={handleSubmit}>
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
