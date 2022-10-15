
import { apiUrl } from '../env';
import useAppBarHeight from '../utils/useAppBarHeight';

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link';

type Props = {}

function DevelopersAbout({ }: Props) {
  const headerHeight = useAppBarHeight();

  return (
    <Container sx={{ height: `calc(100vh - ${headerHeight}px)`, }}>
      <Typography variant='h1' textAlign='center' mt={5}> Are you a Developer? </Typography>
      <Typography mt={5} variant='body1' sx={{ fontSize: '2rem' }}>
        One of the key differentiators of Yeta is that we made a decision to be as <b>Developer</b>-friendly
        as we can, as opposed to the conventional <b>Client</b>-friendly.
      </Typography>
      <Typography mt={5} variant='body1' sx={{ fontSize: '2rem' }}>
        We want YOU to build new cool businesses and let us handle all of the
        boring market logic for you. This is why our
        <Link href={apiUrl + '/docs'} color='secondary' underline="hover" fontWeight='900'> API </Link>
        is completely open!
      </Typography>
    </Container >
  )
}

export default DevelopersAbout