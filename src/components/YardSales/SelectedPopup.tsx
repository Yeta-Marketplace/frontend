import { Popup } from 'react-map-gl';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NavigateIcon from '@mui/icons-material/AssistantDirection';
import Stack from '@mui/material/Stack';
import { timeColors } from './Items'
import moment from 'moment';

import { EventRead } from '../../services/client'

type Props = {
  selectedYardsale: EventRead,
  setSelectedYardsale: Function
}

function YardSalesSelectedPopup({ selectedYardsale, setSelectedYardsale }: Props) {

  // TODO: Use chip for Past/Present/Future featured text https://mui.com/material-ui/react-chip/

  const now = moment().format('YYYY-MM-DD');

  let color = null;
  let status = null;
  if (moment(selectedYardsale.start_date).isAfter(now)) {
    // Future YS
    color = timeColors['future'];
    status = "Future Event";
  } else if (moment(selectedYardsale.end_date).isBefore(now)) {
    // Past YS
    color = timeColors['past'];
    status = "Past Event";
  } else {
    color = timeColors['present'];
    status = "Today!";
  };

  const startDateMoment = moment(selectedYardsale.start_date).format('MM/DD');
  const endDateMoment = moment(selectedYardsale.end_date).format('MM/DD');

  return (
    <Popup
      latitude={selectedYardsale.latitude}
      longitude={selectedYardsale.longitude}
      closeOnClick={false} // TODO: This definitely needs to be looked at
      onClose={() => setSelectedYardsale(null)}
    >
      <Stack spacing={1}>

        <h2>
          {selectedYardsale.description ? selectedYardsale.description : 'No Name'}
        </h2>

        <Stack direction='row' alignItems='center' spacing={2}>
          <Box sx={{ borderRadius: '5px', backgroundColor: color, padding: '2px 6px' }} >
            <Typography color='white'> {status} </Typography>
          </Box>
          {(startDateMoment === endDateMoment) ? (
            <Typography variant='overline'> {startDateMoment} </Typography>
          ) : (
            <Typography variant='overline'> {startDateMoment} - {endDateMoment}</Typography>
          )
          }
        </Stack>

        <Button
          color='secondary'
          variant="outlined"
          endIcon={<NavigateIcon />}
          target="_blank"
          rel="noopener noreferrer"
          href={"https://www.google.com/maps/search/?api=1&query=" + selectedYardsale.latitude.toString() + "%2C" + selectedYardsale.longitude.toString()}
        >
          Navigate
        </Button>
      </Stack>
    </Popup >
  )
}

export default YardSalesSelectedPopup