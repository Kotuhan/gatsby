import React, { createContext, useContext, useState } from 'react';

import { User } from '../services/backend';
import { Context } from '../types';

export const UsersContext = createContext<Context<User[]>>([[], () => {}]);

interface Props {
  children: JSX.Element;
}

export const UsersProvider = ({ children }: Props) => (
  <UsersContext.Provider value={useState<User[]>([])}>
    {children}
  </UsersContext.Provider>
);

export const useUsers = () => useContext(UsersContext);
