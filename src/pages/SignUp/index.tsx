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

export default function SignUp({ navigation }) {
  const passwordRef = useRef<any>();
  const emailRef = useRef<any>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [empty, setEmpty] = useState(true);

  useMemo(() => {
    if (!name || !email || !password) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [name, email, password]);

  function handleSubmit() {
    if (empty) return;
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
          onSubmitEditing={() => emailRef.current.focus()}
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
          Sign up
        </SubmitButton>
      </Form>

      <SignLink onPress={() => navigation.navigate('SignIn')}>
        <SignLinkText>Back to login</SignLinkText>
      </SignLink>
    </Container>
  );
}
