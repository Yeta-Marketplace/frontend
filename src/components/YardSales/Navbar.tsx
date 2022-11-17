
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { events, times } from './Items'

type Props = {
  pickedEvents: string[],
  setEvents: Function,
  pickedTime: string,
  setTime: Function,
}

function Navbar({ pickedEvents, setEvents, pickedTime, setTime }: Props) {

  const handleEvents = (
    event: React.MouseEvent<HTMLElement>,
    newEvents: string[],
  ) => {
    setEvents(newEvents);
  };

  const handleTime = (
    event: React.MouseEvent<HTMLElement>,
    newTime: string,
  ) => {
    setTime(newTime);
  };

  return (
    <Toolbar
      variant='dense'
      sx={{ justifyContent: 'space-between', overflowX: 'auto', height: '100%', }}
    >
      <Box ml={{ 'xs': 0, 'sm': 0, 'md': 10 }} sx={{ height: '100%', }} >
        <ToggleButtonGroup
          value={pickedEvents}
          onChange={handleEvents}
          aria-label="event selection"
          color='secondary'
          sx={{ height: '100%' }}
        >
          {events.map((event) => (
            <ToggleButton
              value={event.key}
              key={event.name}
              aria-label={event.name}
              size='large'
              sx={{
                border: 0,
                height: '100%',
              }}
            >
              <Tooltip title={event.name}>
                <Stack alignItems='center'>
                  {event.icon}
                  <Typography variant='caption' noWrap>{event.name}</Typography>
                </Stack>
              </Tooltip>
            </ToggleButton>
          )
          )}
        </ToggleButtonGroup>
      </Box>


      <Box ml={{ 'xs': 0, 'sm': 0, 'md': 10 }} sx={{ height: '100%', }} >
        <ToggleButtonGroup
          value={pickedTime}
          onChange={handleTime}
          exclusive
          aria-label="time selection"
          sx={{ height: '100%', }}
        >
          {times.map((time) => (
            <ToggleButton
              value={time.key}
              key={time.name}
              aria-label={time.name}
              size='medium'
              color='secondary'
              sx={{
                border: 0,
                height: '100%',
              }}
            >
              {time.name}
            </ToggleButton>
          )
          )}
        </ToggleButtonGroup>
      </Box>
    </Toolbar >
  )
}

export default Navbar