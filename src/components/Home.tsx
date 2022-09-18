import styled from "styled-components"
import { colors } from "./constants"

const HomeDiv = styled.div`
  background-color: ${colors.darkgrey};
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`

const Main = styled.h1`
  color: ${colors.platinum};
`
const MainHighlight = styled.mark`
  background-color: transparent;
  color: ${colors.orange};
  padding: 0 2px;
`

const Submain = styled.h3`
  color: ${colors.lightgrey};
`

function Home({ }) {
  return (
    <HomeDiv>
      <Main> <MainHighlight>Yet A</MainHighlight>nother Marketplace</Main>
      <Submain> The only marketplace designed for Developers </Submain>
    </HomeDiv>
  )
}

export default Home