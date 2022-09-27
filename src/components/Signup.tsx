import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios'
import { useFormik } from 'formik';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

import { api } from '../services/api'
import { IUserProfileCreateOpen } from '../interfaces/user';
import { ApiError } from '../interfaces/api';

type Props = {}

const Signup = ({ }: Props) => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const initialValues: IUserProfileCreateOpen = {
    full_name: "",
    email: "",
    password: ""
  };

  const formik = useFormik({
    initialValues: initialValues,
    //   validationSchema: validationSchema,
    onSubmit: (values) => {
      async function createUserOpen() {
        const response = await api.createUserOpen(values)
          .then(response => {
            const user = response.data;
            setErrorMsg("");
            setSuccessMsg("User Created Successfully! Redirecting to Sign In...");

            setTimeout(() => {
              navigate('/signin')
            }, 3000);
          })
          .catch((error) => {
            if (axios.isAxiosError(error)) {
              try {
                const data = error.response?.data as ApiError;
                setErrorMsg(data.detail);
              } catch (e) {
                setErrorMsg(`Unexpected error: error.message`);
              }
            } else {
              setErrorMsg(`Unexpected error: ${error.message}`);
            }
          });
      }
      createUserOpen();
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
        <h1>Sign Up!</h1>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="full_name"
            name="full_name"
            label="Name"
            value={formik.values.full_name}
            onChange={formik.handleChange}
            error={formik.touched.full_name && Boolean(formik.errors.full_name)}
            helperText={formik.touched.full_name && formik.errors.full_name}
            required
            fullWidth
            margin="normal"
            autoComplete="name"
            autoFocus
          />
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
            autoComplete="new-password"
          />
          <Stack spacing={1}>
            {errorMsg && <Alert severity="error"> {errorMsg} </Alert>}
            {successMsg && <Alert severity="success"> {successMsg} </Alert>}
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              Submit
            </Button>
            <p> Already have an account? <Link to='/signin'>Sign In</Link></p>
          </Stack>
        </form>
      </Box>
    </Container>
  )
}

export default Signup

