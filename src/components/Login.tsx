import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom'
import { api } from '../services/api'

type Props = {
  setToken: Function
}

const Login = ({ setToken }: Props) => {
  // TODO: keeping this here might be a security concern
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [invalidCreds, setInvalidCreds] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.logInGetToken(username, password).then(
      response => {
        if (response) {
          setToken(response.data.access_token);
        } else {
          alert('Wrong Username/Password');
        }
      }
    );
  }

  return (
    <div className="App login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        {/* {invalidCreds && <p style={{color: 'red'}}> Invalid Username/Password</p>} */}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Login

