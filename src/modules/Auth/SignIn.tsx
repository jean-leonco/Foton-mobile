import React from 'react';
import { useState, useRef, useMemo } from 'react';

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

  useMemo(() => {
    if (!email || !password) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [email, password]);

  function handleSubmit() {
    if (empty) return;
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

        <SubmitButton loading={false} empty={empty} onPress={handleSubmit}>
          Login
        </SubmitButton>
      </Form>

      <SignLink onPress={() => navigation.navigate('SignUp')}>
        <SignLinkText>Need an account? Signup</SignLinkText>
      </SignLink>
    </Container>
  );
}
