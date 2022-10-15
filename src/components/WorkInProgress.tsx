
import styled from '@emotion/styled'
import { colors } from '../styles/colors'
import useAppBarHeight from '../utils/useAppBarHeight';
import { useTheme } from '@mui/material/styles';


import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type Props = {}

const Div = styled.div`
  background-color: ${colors.darkgrey};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: ${colors.platinum};
`

function WorkInProgress({ }: Props) {

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
          <Typography sx={{ typography: { md: 'h3' } }} variant='h5' color={colors.platinum}> 🛠  Work In Progress! 🛠</Typography>
        </div>
      </Box>
    </Box >
  )
}

export default WorkInProgress