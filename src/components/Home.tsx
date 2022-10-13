import styled from '@emotion/styled'
import { colors } from '../styles/colors'
import { heights } from '../styles/heights'
import { apiUrl } from '../env';

import Link from '@mui/material/Link';

const HomeDiv = styled.div`
  background-color: ${colors.darkgrey};
  min-height: ${heights.nonHeaderVH};
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
      <Submain> The only marketplace designed for <Link href={apiUrl + '/docs'} color='secondary' underline="hover">Developers</Link> </Submain>
    </HomeDiv >
  )
}

export default Home