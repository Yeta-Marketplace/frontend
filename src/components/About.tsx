import useAppBarHeight from '../utils/useAppBarHeight';
import styled from '@emotion/styled'
import { colors } from '../styles/colors'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';



const MainHighlight = styled.mark`
  background-color: transparent;
  color: ${colors.orange};
  padding: 0 2px;
`

type Props = {}

function About({ }: Props) {
  const headerHeight = useAppBarHeight();

  return (
    <Container sx={{ height: `calc(100vh - ${headerHeight}px)`, }}>
      <Stack spacing={8} pt={10}>
        <Stack spacing={3} textAlign='center'>
          <Typography variant='h2' textAlign='center'> What is <MainHighlight>YetA</MainHighlight>?</Typography>
          <Typography variant='body1' sx={{ fontSize: '2rem' }}> <MainHighlight>YetA </MainHighlight>
            is a place for local communities to promote small events within their community. It's for the kind of stuff that doesn't
            make it to Google Maps and thus ends up on inappropriate platforms such as Facebook or Craigslist
          </Typography>
        </Stack>
        <Stack spacing={3} textAlign='center'>
          <Typography variant='h2' textAlign='center'> Who runs it?</Typography>
          <Typography variant='body1' sx={{ fontSize: '2rem' }}> Just <Link href="https://ramilus.com/" color='secondary'>me</Link>!
            I am a sole developer working out of Jersey Shore. If you would like to contact me, feel free to shoot me an email or
            simply leave <Link component={RouterLink} to='/feedback' color='secondary'>Feedback</Link>!
          </Typography>
        </Stack>
      </Stack>
    </Container >
  )
}

export default About