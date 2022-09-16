import { apiUrl } from '../env'
import { Link } from 'react-router-dom'
import styled from "styled-components"

const AppHeader = styled.div`
  background-color: #c1c5cf;
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
    <AppHeader>
      <h1> <Link to='/'>Yeta</Link> </h1>
      {signedIn === true
        ? <Link to='/signout'>Sign Out</Link>
        : <Link to='/signup'>Sign Up</Link>
      }
      <small> <a href={apiUrl + "/docs"} style={{ color: "grey" }}>API docs</a> </small>
    </AppHeader>
  )
}

export default Header