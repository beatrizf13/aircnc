import React, { useState } from 'react';

import api from '~/services/api';

export default function Login({ history }) {
  const [email, setEmail] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/sessions', { email });

    const { _id } = response.data;

    localStorage.setItem('user', _id);

    history.push('/dashboard');
  }
  return (
    <>
      <p>
        Offer developer <strong>spots</strong> and find
        <strong> talents</strong> for your business.
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          E-mail
          <input
            placeholder="ex.: company@email.com"
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>

        <button className="btn" type="submit">
          Sign In
        </button>
      </form>
    </>
  );
}
