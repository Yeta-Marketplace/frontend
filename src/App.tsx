import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { apiUrl } from './env'

function App() {
  const [count, setCount] = useState(0)
  
  const [rootResponse, setRootResponse] = useState("")

  const getRoot = () => {
    axios.get( apiUrl ).then((response) => {
      setRootResponse( JSON.stringify( response.data ) )
    })
  };

  return (
    <div className="App">
      <header className="App-header">

        <h1> <mark>Yet A</mark> nother Marketplace</h1>
        
        <button onClick={ getRoot }> GET <code>api.yeta.market/</code> </button>
        {rootResponse}
        <br></br>

        <small> <a href={apiUrl + "/docs"} style={{color: "grey", opacity: "20%"}}>full docs</a> </small>
      </header>
    </div>
  )
}

export default App
