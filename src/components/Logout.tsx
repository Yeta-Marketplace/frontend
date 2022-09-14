import { useEffect } from 'react'
import { getLocalToken } from '../utils/token';

type Props = {
    setToken: Function
}

export default function Logout({ setToken }: Props) {
    const token = getLocalToken();

    useEffect(() => {
        if (!!token) {
            setToken(null);
        }
    });

    return (
        <div><p>Token cleared - Logout succesful</p></div>
    )
}