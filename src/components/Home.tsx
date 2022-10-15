import styled from '@emotion/styled'
import { colors } from '../styles/colors'
import useAppBarHeight from '../utils/useAppBarHeight';
import { useTheme } from '@mui/material/styles';


import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';


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

  const headerHeight = useAppBarHeight();
  const theme = useTheme();

  return (
    <Box minHeight={`calc(100vh - ${headerHeight}px)`} sx={{ backgroundColor: theme.palette.primary.main }} display="flex" flexDirection="column">
      <Box flex={1} textAlign='center' sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div>
          <Typography sx={{ typography: { lg: 'h1', md: 'h2' } }} variant='h3' color={colors.platinum}> <MainHighlight>Yet A</MainHighlight>nother Marketplace</Typography>
          {/* <Submain> The only marketplace designed for <Link color='secondary' underline="hover" component={RouterLink} to='/developers'>Developers</Link>
          </Submain> */}
        </div>
      </Box>
    </Box >
  )
}

export default Home