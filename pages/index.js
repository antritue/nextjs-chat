import React, { useContext } from 'react';
import { Context } from '../context';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

export default function Auth() {
  const { username, setUsername, secret, setSecret } = useContext(Context);

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length === 0 || secret.length === 0) return;
    axios
      .put(
        'https://api.chatengine.io/users/',
        {
          username,
          secret,
        },
        {
          headers: {
            'Private-Key': 'af4d269c-4fad-43da-8411-4b7393bccaf9',
          },
        }
      )
      .then(() => router.push('/chats'));
  };

  return (
    <>
      <Head>
        <title>Easy Chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="background">
        <div className="auth-container">
          <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
            <div className="auth-title">Easy Chat</div>

            <div className="input-container">
              <input
                placeholder="Email"
                className="text-input"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-container">
              <input
                type="password"
                placeholder="Password"
                className="text-input"
                onChange={(e) => setSecret(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-button">
              Login / Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
