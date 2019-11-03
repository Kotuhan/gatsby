import { Dispatch, SetStateAction } from 'react';

export type Context<T> = [T, Dispatch<SetStateAction<T>>];
