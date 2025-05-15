import { baseUrl } from '../config';

// Function to register a new user
export const register = async (name, email, password) => {
  const res = await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  if (res.status !== 201) {
    throw new Error(data.msg || 'Registration failed');
  }

  return data;
};


// Function to login a user
export const login = async (email, password) => {
  const res = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || 'Login failed');
  return data;
};

export const logout = async () => {
  // Add any API logout call if needed
  // await fetch(`${baseUrl}/api/auth/logout`, { method: 'POST' });
};


export const requestPasswordReset = async (email) => {
  const res = await fetch(`${baseUrl}/api/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || 'Password reset request failed');
  return data;
};

export const resetPassword = async (token, newPassword) => {
  const res = await fetch(`${baseUrl}/api/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || 'Password reset failed');
  return data;
};