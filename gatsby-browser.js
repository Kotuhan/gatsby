import React from 'react';
import { TicketsProvider } from './src/context/Tickets';
import { UsersProvider } from './src/context/Users';

import Layout from './src/layouts';

export const wrapRootElement = ({ element }) => (
  <TicketsProvider>
    <UsersProvider>
      <Layout>{element} </Layout>
    </UsersProvider>
  </TicketsProvider>
);
