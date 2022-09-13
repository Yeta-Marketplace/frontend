import {removeLocalToken} from '../utils/token';

type Props = {
    setToken: Function
}

export default function Logout({setToken}: Props) {
    setToken(null);
    return (
        <div><p>Token cleared - Logout succesful</p></div>
    )
}