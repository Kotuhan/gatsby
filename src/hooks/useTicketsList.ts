import BackendService, { Ticket } from '../services/backend';

import { useTickets } from '../context/Tickets';
import { useFetch } from './useFetch';

export const useTicketsList = () =>
  useFetch<Ticket[]>({
    handler: BackendService.tickets,
    context: useTickets,
  });
