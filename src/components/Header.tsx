import { apiUrl } from '../env'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Logo from './Logo';
import { colors } from './constants';

import AppBar from '@mui/material/AppBar';


const AppHeader = styled.div`
  background-color: ${colors.darkgrey};
  height: 10vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  font-size: calc(10px + 2vmin);
  color: rgb(29, 22, 0);
`


type Props = {
  signedIn: boolean
}

function Header({ signedIn }: Props) {
  return (
    <AppBar position="static">
      <AppHeader>
        <Logo />
        {signedIn === true
          ? <Link to='/signout'>Sign Out</Link>
          : <Link to='/signup'>Sign Up</Link>
        }
        <small> <a href={apiUrl + '/docs'} style={{ color: 'grey' }}>API docs</a> </small>
      </AppHeader>
    </AppBar>
  )
}

export default Header