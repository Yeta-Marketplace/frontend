import './Header.css'
import { apiUrl } from '../env'
import { Link } from 'react-router-dom'


type Props = {
  loggedIn: boolean
}

function Header({ loggedIn }: Props) {
  return (
    <header className="App-header">
      <h1> <Link to='/'>Yeta</Link> </h1>
      {loggedIn === true
        ? <Link to='/logout'>Sign Out</Link>
        : <Link to='/login'>Sign In</Link>
      }
      <small> <a href={apiUrl + "/docs"} style={{ color: "grey" }}>API docs</a> </small>
    </header>
  )
}

export default Header