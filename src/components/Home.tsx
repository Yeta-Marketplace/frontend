import styled from "styled-components"

const HomeDiv = styled.div`
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
    <HomeDiv>
      <h1> <mark>Yet A</mark> nother Marketplace</h1>
      <h4 style={{ color: '#4b5059' }}> The only marketplace designed for Developers </h4>
    </HomeDiv>
  )
}

export default Home