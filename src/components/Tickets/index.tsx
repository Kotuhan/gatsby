import React, { useState, useMemo } from 'react';
import { Link } from 'gatsby';

import { Ticket } from '../../services/backend';

import Filter from './Filter';

interface Props {
  data: Ticket[];
}

const Item = ({ id, description, assigneeId, completed }: Ticket) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{description}</td>
      <td>{assigneeId}</td>
      <td>{completed ? '✅' : '❌'}</td>
      <td>
        <Link to={`tickets/view/?id=${id}`}>View</Link>
      </td>
    </tr>
  );
};

const filterByDescription = (data: Ticket[], keyword: string) =>
  data.filter(datum =>
    datum.description.toLowerCase().includes(keyword.toLocaleLowerCase())
  );

export const TicketsList = ({ data }: Props) => {
  const [keyword, setKeyword] = useState('');

  const handleKeywordChange = ({
    target: { value = '' },
  }: React.ChangeEvent<HTMLInputElement>) => setKeyword(value);

  const rows = useMemo(() => {
    return filterByDescription(data, keyword).map(datum => (
      <Item key={datum.id} {...datum} />
    ));
  }, [keyword, data]);

  return (
    <div>
      <Filter value={keyword} onChange={handleKeywordChange} />
      <table>
        <caption>Tickets</caption>
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Assignee</th>
            <th>Completed</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};
