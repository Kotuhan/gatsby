import React from 'react';

import { TicketsList } from '../components/Tickets';

import { useTicketsList } from '../hooks/useTicketsList';

export default () => {
  const { data: tickets, loading, error } = useTicketsList();

  return (
    <div>
      {loading && <span>Loading...</span>}
      {error && <span>{error}</span>}
      {tickets.length > 0 && <TicketsList data={tickets} />}
    </div>
  );
};
