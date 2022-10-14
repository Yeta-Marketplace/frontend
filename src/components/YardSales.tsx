import 'mapbox-gl/dist/mapbox-gl.css';

import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Fab from '@mui/material/Fab';
import Slide from '@mui/material/Slide';
import AddIcon from '@mui/icons-material/Add';

import { heights } from '../styles/heights';
import { ILocation } from '../interfaces/location';
import YardSalesMap from './YardSales/YardSalesMap';
import YardSalesAdd from './YardSales/YardSalesAdd';

type Props = {
  signedIn: boolean
}


function YardSales({ signedIn }: Props) {

  const theme = useTheme();

  const [location, setLocation] = useState<ILocation>({ latitude: 39.95, longitude: -74.2 });
  const [lackingPermission, setLackingPermission] = useState(false);
  // TODO: Utilize status field
  const [status, setStatus] = useState<string | null>(null);
  const [showCreateFrom, setShowCreateForm] = useState(false);

  const handleCreateFormChange = () => {
    setShowCreateForm((prev) => !prev);
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      }, () => {
        setStatus('Unable to retrieve your location. Please check your permissions');
        setLackingPermission(true);
      },
        // { enableHighAccuracy: true } // might slow things down
      );
    }
  }

  useEffect(() => {
    if (!lackingPermission && !location) {
      getLocation();
    }
  })

  // const mapHeight = showCreateFrom ? '50%' : '100%';
  const mapHeight = '100%';

  return (
    <Box sx={{ height: heights.nonHeaderVH, width: '100%', overflow: 'hidden' }} >
      <Box sx={{ height: mapHeight, transition: "height 0.1s ease-in" }}>
        <YardSalesMap location={location} setLocation={setLocation} />
      </Box>
      <Fab variant="extended" color="primary" aria-label="add" sx={theme.fab} onClick={handleCreateFormChange}>
        <AddIcon />
        Add Yard Sale
      </Fab>
      <Slide direction="up" in={showCreateFrom} mountOnEnter unmountOnExit >
        <Container sx={{ background: 'white', position: 'fixed', bottom: 0, left: 0, right: 0, borderRadius: '25px 25px 0px 0px' }}>
          <YardSalesAdd location={location} />
        </Container>
      </Slide >
    </Box >
  )
}

export default YardSales
