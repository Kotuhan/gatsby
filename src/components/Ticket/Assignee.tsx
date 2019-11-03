import React from 'react';

import { User } from '../../services/backend';

interface Props {
  users: User[];
  assigneeId: number | null;
  loading: boolean;
  onChange: (e: any) => void;
  updating: boolean;
}

export const Assignee = ({
  users,
  assigneeId,
  onChange,
  loading,
  updating,
}: Props) => {
  return (
    <div>
      <span>Assignee: </span>
      {loading && <span>Loading users... </span>}
      {updating && <span>Updating... </span>}
      <select
        value={assigneeId || undefined}
        onChange={onChange}
        disabled={loading || updating}
      >
        <option value="null">Unassigned</option>
        {users.map(({ id, name }: User) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
