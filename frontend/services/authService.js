import { baseUrl } from '../config';
// import * as Google from 'expo-auth-session/providers/google';
// import * as Facebook from 'expo-auth-session/providers/facebook';
// import * as WebBrowser from 'expo-web-browser';

// WebBrowser.maybeCompleteAuthSession();

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
  try {
    const res = await fetch(`${baseUrl}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    // First check if response is JSON
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();
      throw new Error(`Expected JSON but got: ${text.substring(0, 100)}...`);
    }

    const data = await res.json();
    
    if (!res.ok) throw new Error(data.msg || 'Password reset failed');
    return data;
  } catch (error) {
    console.error('Password reset error:', error);
    throw new Error(error.message || 'Failed to process password reset');
  }
};
