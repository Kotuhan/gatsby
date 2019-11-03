import { useState } from 'react';
import BackendService, { Ticket } from '../services/backend';

import { useFetch } from './useFetch';

export const useTicket = (id: number) =>
  useFetch<Ticket | undefined>({
    handler: () => BackendService.ticket(id),
    context: useState,
  });
