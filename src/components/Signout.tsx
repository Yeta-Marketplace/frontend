import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom'

import { getLocalToken, removeLocalToken } from '../utils/token';

type Props = {
    setToken: Function
}

export default function Signout({ setToken }: Props) {
    const token = getLocalToken();

    useEffect(() => {
        setToken(null);  // setting null will actually save as "null". But still have to do this to trigger useState in App.tsx
        removeLocalToken(); // Actually removing the token
    });

    return (
        <Container component="main" >
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                }}
            >
                <Alert severity='success' sx={{ fontSize: 20 }}>Signout succesful!</Alert>
                <Link to='/'> Back to Home</Link>
            </Box>
        </Container>
    )
}