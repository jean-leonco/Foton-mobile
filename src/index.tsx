import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './Routes';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Routes />
    </>
  );
}
