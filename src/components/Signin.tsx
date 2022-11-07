// Material UI rewrite:
// https://github.com/mui/material-ui/blob/v5.10.5/docs/data/material/getting-started/templates/sign-in/SignIn.tsx

import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

import { IUserSignin } from '../interfaces/user';
import { LoginService } from '../services/client'

type Props = {
  setToken: Function
}

const Signin = ({ setToken }: Props) => {
  const [errorMsg, setErrorMsg] = useState("");


  const initialValues: IUserSignin = {
    email: "",
    password: ""
  };

  const formik = useFormik({
    initialValues: initialValues,
    //   validationSchema: validationSchema,
    onSubmit: (values) => {
      async function signinUser() {
        await LoginService.loginAccessToken({ username: values.email, password: values.password }).then(
          token => setToken(token)
        ).catch(
          error => setErrorMsg("Invalid Email/Password")
        )
      }
      signinUser();
    },
  });


  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <h1>Sign In</h1>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            required
            fullWidth
            margin="normal"
            autoComplete="email"
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            required
            fullWidth
            margin="normal"
            autoComplete="current-password"
          />
          <Stack spacing={1}>
            {errorMsg && <Alert severity="error"> {errorMsg}</Alert>}
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              Submit
            </Button>
            <p> Don't have an account? <Link to='/signup'>Sign Up</Link></p>
          </Stack>
        </form>
      </Box>
    </Container>
  )
}

export default Signin

