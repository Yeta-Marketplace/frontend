import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

import { apiUrl } from './env'

function App() {
  const [count, setCount] = useState(0)
  
  const [rootResponse, setRootResponse] = useState("")

  const getRoot = () => {
    axios.get('http://api.localhost/').then((response) => {
      console.log(response);
      setRootResponse( JSON.stringify( response.data ) )
    })
  };

  return (
    <div className="App">
      <header className="App-header">
        {apiUrl}
        <button onClick={ getRoot }> GET <code>api.yeta.market/</code> </button>
        {rootResponse}

        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p> */}
      </header>
    </div>
  )
}

export default App
