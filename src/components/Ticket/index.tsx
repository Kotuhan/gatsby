import React, { useState } from 'react';

import Backend, { Ticket as ITicket } from '../../services/backend';
import { useUsersList } from '../../hooks/useUsersList';

import { Assignee } from './Assignee';

type Props = ITicket & {
  updateTicket: (ticket: ITicket) => void;
};

export const Ticket = ({
  id,
  description,
  updateTicket,
  assigneeId,
}: Props) => {
  const [updatingAssignee, setUpdatingAssignee] = useState(false);
  const { data: users, loading: usersLoading } = useUsersList();

  const handleUpdateAssignee = async ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    setUpdatingAssignee(true);

    try {
      const response = await Backend.assign({
        ticketId: id,
        assigneeId: Number(value),
      });

      updateTicket(response);
    } catch (e) {
    } finally {
      setUpdatingAssignee(false);
    }
  };

  return (
    <div>
      <div>Id: {id}</div>
      <div>Description: {description}</div>
      <Assignee
        users={users}
        loading={usersLoading}
        updating={updatingAssignee}
        onChange={handleUpdateAssignee}
        assigneeId={assigneeId}
      />
    </div>
  );
};
