import { useEffect, useState } from 'react';
import { Context } from '../types';

interface Args<P> {
  handler: (id?: number) => Promise<P>;
  context: () => Context<P>;
}

export const useFetch = <P>({ handler, context }: Args<P>) => {
  const [data, setData] = context();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async () => {
    setError(null);
    setLoading(true);

    try {
      const result = await handler();

      setData(result);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    request();
  }, []);

  return { data, loading, error, fetch, update: setData };
};
