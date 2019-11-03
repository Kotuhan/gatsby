type RenameKey<T, K extends keyof T, N extends string> = Pick<
  T,
  Exclude<keyof T, K>
> &
  { [P in N]: T[K] };

const ticketsDb = [
  {
    id: 0,
    description: 'Install a monitor arm',
    assigneeId: 111,
    completed: false,
  },
  {
    id: 1,
    description: 'Move the desk to the new location',
    assigneeId: null,
    completed: false,
  },
];

const usersDb = [
  { id: 111, name: 'Julie' },
  { id: 222, name: 'Hank' },
  { id: 333, name: 'Al' },
];

export type User = typeof usersDb[0];

export type Ticket = typeof ticketsDb[0];

export type NewTicket = Pick<Ticket, 'description'>;
type TicketId = Pick<Ticket, 'id'>;
type TicketIdRenamed = RenameKey<Ticket, 'id', 'ticketId'>;
type CompleteTicket = Pick<TicketIdRenamed, 'ticketId' | 'completed'>;
type AssignTicket = Pick<TicketIdRenamed, 'ticketId' | 'assigneeId'>;

let lastId = Math.max(...ticketsDb.map(t => t.id));

const randomWait = () =>
  new Promise<void>(resolve => setTimeout(resolve, Math.random() * 4000));

export class BackendService {
  tickets() {
    return randomWait().then(() => [...ticketsDb]);
  }

  ticket(id: number) {
    const ticketId = Number(id);
    return randomWait().then(() => ticketsDb.find(t => t.id === ticketId));
  }

  users() {
    return randomWait().then(() => [...usersDb]);
  }

  user(id: number) {
    const userId = Number(id);
    return randomWait().then(() => usersDb.find(u => u.id === userId));
  }

  newTicket({ description }: NewTicket) {
    const genNew = ({ id }: TicketId) => ({
      id,
      description,
      completed: false,
      assigneeId: null,
    });
    return randomWait().then(() => {
      if (!description) {
        throw new Error('Description is required!');
      }
      ticketsDb.push(genNew({ id: ++lastId }));
    });
  }

  assign({ ticketId, assigneeId }: AssignTicket) {
    return randomWait().then(() => {
      const matchTicket = ticketsDb.find(t => t.id === ticketId);
      if (!matchTicket) {
        throw new Error(`Cannot find ticket (id:${ticketId})`);
      }

      const matchUser = usersDb.find(u => u.id === assigneeId);
      if (!matchUser) {
        throw new Error(`Cannot find ticket (id:${ticketId})`);
      }
      matchTicket.assigneeId = assigneeId;
      return matchTicket;
    });
  }

  complete({ ticketId, completed }: CompleteTicket) {
    const ticketIdNum = Number(ticketId);
    return randomWait().then(() => {
      const matchTicket = ticketsDb.find(t => t.id === ticketIdNum);
      if (!matchTicket) {
        throw new Error(`Cannot find ticket (id:${ticketId})`);
      }

      matchTicket.completed = completed;

      return matchTicket;
    });
  }
}

export default new BackendService();
