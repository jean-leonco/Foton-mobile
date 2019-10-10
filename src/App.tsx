import React from 'react';

import createRouter from './Routes';

export default function App() {
  const isAuth = true;

  const Routes = createRouter(isAuth);

  return <Routes />;
}
