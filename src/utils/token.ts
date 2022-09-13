import { useState } from 'react';

// Regular methods
export const getLocalToken = () => localStorage.getItem('token');
export const setLocalToken = (token: string) => localStorage.setItem('token', token);
export const removeLocalToken = () => localStorage.removeItem('token');

// Web Hook
export default function useToken() {
  const [token, setToken] = useState(getLocalToken());

  const saveToken = (token: string) => {
    setLocalToken(token);
    setToken(token);
  };

  return {
    setToken: saveToken,
    token
  }
}
