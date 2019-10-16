import React from 'react';
import localStorage from '@react-native-community/async-storage';
import { useState, useRef, useMemo } from 'react';
import { showMessage } from 'react-native-flash-message';

import UserLoginWithEmailMutation from './mutation/UserLoginWithEmailMutation';

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

export default function SignIn({ navigation }) {
  const passwordRef = useRef<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [empty, setEmpty] = useState(true);
  const [loading, setLoading] = useState(false);

  useMemo(() => {
    if (!email || !password) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [email, password]);

  async function handleResponse(token: string | null, error: string | null) {
    if (token) {
      await localStorage.setItem('token', token);

      setLoading(false);

      navigation.navigate('Dashboard');
    } else {
      setLoading(false);

      showMessage({
        message: 'Login failed',
        description: error as string,
        type: 'danger',
        icon: 'info',
      });
    }
  }

  async function handleSubmit() {
    if (empty) return;

    setLoading(true);

    await UserLoginWithEmailMutation.commit(
      { email, password },
      ({ UserLoginWithEmail }) =>
        UserLoginWithEmail &&
        handleResponse(UserLoginWithEmail.token, UserLoginWithEmail.error),

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
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Your e-mail"
          label="E-mail"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
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
          Login
        </SubmitButton>
      </Form>

      <SignLink onPress={() => navigation.navigate('SignUp')}>
        <SignLinkText>Need an account? Signup</SignLinkText>
      </SignLink>
    </Container>
  );
}