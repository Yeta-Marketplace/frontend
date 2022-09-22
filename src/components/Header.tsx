import { apiUrl } from '../env'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Logo from './Logo';
import { colors } from '../styles/colors';
import { heights } from '../styles/heights';

import AppBar from '@mui/material/AppBar';


const AppHeader = styled.div`
  background-color: ${colors.darkgrey};
  height: ${heights.headerVH};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  font-size: calc(10px + 2vmin);
  color: rgb(29, 22, 0);
`

const NiceLink = styled(Link)`
  text-decoration: none;
  &:hover {
    color: ${colors.platinum};
  }
`

const WorkInProgressLink = styled(NiceLink)`
  color: #333;
`


type Props = {
  signedIn: boolean
}

function Header({ signedIn }: Props) {
  return (
    <AppBar position="static">
      <AppHeader>
        <Logo />
        <WorkInProgressLink to='/yardsales'>Yard Sales</WorkInProgressLink>
        <WorkInProgressLink to='/workinprogress'>🛠 Buy 🛠</WorkInProgressLink>
        <WorkInProgressLink to='/workinprogress'>🛠 Sell 🛠</WorkInProgressLink>
        {signedIn === true
          ? <NiceLink to='/signout'>Sign Out</NiceLink>
          : <NiceLink to='/signup'>Sign Up</NiceLink>
        }
        <small> <a href={apiUrl + '/docs'} style={{ color: 'grey' }}>API docs</a> </small>
      </AppHeader>
    </AppBar>
  )
}

export default Header