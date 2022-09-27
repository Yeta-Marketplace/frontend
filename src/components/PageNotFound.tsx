import Box from '@mui/material/Box'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

function PageNotFound({ }: Props) {
    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
            }}
        >
            <h1>404 - Page Not Found || Return <Link to='/'>Home</Link></h1>
        </Box>
    )
}

export default PageNotFound