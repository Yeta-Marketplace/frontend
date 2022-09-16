import React, { useState } from 'react'
import { api } from '../services/api'
import axios, { AxiosError } from 'axios'
import { Link } from 'react-router-dom';

type Props = {}

const Signup = ({ }: Props) => {
  // TODO: keeping this here might be a security concern
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFullname] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.createUserOpen({ email, password, full_name })
      .then(response => {
        const user = response.data;
        console.log(`Hello ${user.full_name}`);
        setSuccessMsg(user.full_name);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
          console.log(error);
          setErrorMsg(error.message);
        } else {
          console.log('unexpected error: ', error);
          setErrorMsg(`Unexpected error: ${error.message}`);
        }
      });
  }

  if (successMsg) {
    return (
      <div className='App'>
        <h1>Welcome to the club, {successMsg}!</h1>
        <h2><Link to='/signin'>Sign In</Link></h2>
      </div>
    )
  }

  return (
    <div className="App signup-wrapper">
      <h1>Sign Up?</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Name</p>
          <input type="text" onChange={e => setFullname(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        {errorMsg && <p style={{ color: 'red' }}> {errorMsg} </p>}
        <p> Already have an account? <Link to='/signin'>Sign In</Link></p>
        <div>
          <button type="submit">Sign Up!</button>
        </div>
      </form>
    </div>
  )
}

export default Signup

