import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

function PageNotFound({ }: Props) {
    return (
        <div><h1>404 - Page Not Found || Return <Link to='/'>Home</Link></h1></div>
    )
}

export default PageNotFound