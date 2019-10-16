import React from 'react';
import { StatusBar } from 'react-native';
import { RelayEnvironmentProvider } from '@entria/relay-experimental';

import './config/ReactotronConfig';

import Routes from './routes';
import environment from './relay/Environment';

import FlashMessage from 'react-native-flash-message';

export default function index() {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Routes />
      <FlashMessage position="bottom" floating />
    </RelayEnvironmentProvider>
  );
}
