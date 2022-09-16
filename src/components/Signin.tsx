import React, { useState } from 'react'
import { api } from '../services/api'
import { Link } from 'react-router-dom';

type Props = {
  setToken: Function
}

const Signin = ({ setToken }: Props) => {
  // TODO: keeping this here might be a security concern
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCreds, setInvalidCreds] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.logInGetToken(email, password).then(
      token => {
        if (token) {
          setToken(token);
        } else {
          setInvalidCreds(true);
        }
      }
    );
  }

  return (
    <div className="App">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        {invalidCreds && <p style={{ color: 'red' }}> Invalid Email/Password</p>}
        <p> Don't have an account? <Link to='/signup'>Sign Up</Link></p>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Signin

