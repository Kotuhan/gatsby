import React from 'react';

import { Ticket } from '../../components/Ticket';

import { useTicket } from '../../hooks/useTicket';

const getTicketId = () => {
  const params = new URL(document.location).searchParams;
  return Number(params.get('id'));
};

export default function TicketView() {
  const ticketId = getTicketId();

  if (!ticketId) {
    return <div>Incorrect ticket id</div>;
  }

  const { data: ticket, loading, error, update } = useTicket(ticketId);

  return (
    <div>
      {loading && <span>Loading...</span>}
      {error && <span>{error}</span>}
      {ticket && <Ticket {...ticket} updateTicket={update} />}
    </div>
  );
}
