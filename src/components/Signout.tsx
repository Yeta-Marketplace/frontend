import { useEffect } from 'react'
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
        <div><p>Token cleared - Signout succesful</p></div>
    )
}