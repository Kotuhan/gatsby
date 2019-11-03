import BackendService, { User } from '../services/backend';

import { useUsers } from '../context/Users';
import { useFetch } from './useFetch';

export const useUsersList = () =>
  useFetch<User[]>({
    handler: BackendService.users,
    context: useUsers,
  });
