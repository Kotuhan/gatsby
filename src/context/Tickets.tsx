import React, { createContext, useContext, useState } from 'react';

import { Ticket } from '../services/backend';
import { Context } from '../types';

export const TicketsContext = createContext<Context<Ticket[]>>([[], () => {}]);

interface Props {
  children: JSX.Element;
}

export const TicketsProvider = ({ children }: Props) => (
  <TicketsContext.Provider value={useState<Ticket[]>([])}>
    {children}
  </TicketsContext.Provider>
);

export const useTickets = () => useContext(TicketsContext);
