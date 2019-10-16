import React from 'react';
import { TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useState, useRef, useMemo } from 'react';
import { showMessage } from 'react-native-flash-message';

import UserRegisterWithEmailMutation from './mutation/UserRegisterWithEmailMutation';

import {
  Container,
  Logo,
  Form,
  TInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

const logo = require('../../assets/logo.png');

export default function SignUp({ navigation }) {
  const passwordRef = useRef<TextInput>();
  const emailRef = useRef<TextInput>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [empty, setEmpty] = useState(true);
  const [loading, setLoading] = useState(false);

  useMemo(() => {
    if (!name || !email || !password) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [name, email, password]);

  async function handleResponse(token: string | null, error: string | null) {
    setLoading(false);

    if (token) {
      await AsyncStorage.setItem('token', token);
      navigation.navigate('Me');
    } else {
      showMessage({
        message: 'Registration failed',
        description: error as string,
        type: 'danger',
        icon: 'info',
      });
    }
  }

  function handleSubmit() {
    if (empty) return;

    setLoading(true);

    UserRegisterWithEmailMutation.commit(
      { name, email, password },
      ({ UserRegisterWithEmail }) =>
        UserRegisterWithEmail &&
        handleResponse(
          UserRegisterWithEmail.token,
          UserRegisterWithEmail.error,
        ),

      error =>
        showMessage({
          message: 'Registration failed',
          description: error.message,
          type: 'danger',
          icon: 'info',
        }),
    );
  }

  return (
    <Container>
      <Logo source={logo} />

      <Form>
        <TInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Full name"
          label="Name"
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current && emailRef.current.focus()}
          value={name}
          onChangeText={setName}
        />

        <TInput
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Your e-mail"
          label="E-mail"
          ref={emailRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordRef.current && passwordRef.current.focus()
          }
          value={email}
          onChangeText={setEmail}
        />

        <TInput
          secureTextEntry
          placeholder="Your password"
          label="Password"
          ref={passwordRef}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={password}
          onChangeText={setPassword}
        />

        <SubmitButton loading={loading} empty={empty} onPress={handleSubmit}>
          Sign up
        </SubmitButton>
      </Form>

      <SignLink onPress={() => navigation.navigate('SignIn')}>
        <SignLinkText>Back to login</SignLinkText>
      </SignLink>
    </Container>
  );
}
