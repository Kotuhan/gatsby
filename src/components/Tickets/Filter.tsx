import React from 'react';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Filter({ value, onChange }: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={'Type keyword here'}
    />
  );
}
