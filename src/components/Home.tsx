import styled from "styled-components"

const AppHeader = styled.div`
  background-color: #282c34;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`


function Home({ }) {
  return (
    <AppHeader>
      <h1> <mark>Yet A</mark> nother Marketplace</h1>
    </AppHeader>
  )
}

export default Home