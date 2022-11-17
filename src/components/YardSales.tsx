import 'mapbox-gl/dist/mapbox-gl.css';

import useAppBarHeight from '../utils/useAppBarHeight'
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Fab from '@mui/material/Fab';
import Slide from '@mui/material/Slide';
import AddIcon from '@mui/icons-material/Add';
import BackIcon from '@mui/icons-material/ArrowDownward';

import { ILocation } from '../interfaces/location';
import YardSalesMap from './YardSales/Map';
import YardSalesAdd from './YardSales/Add';
import Navbar from './YardSales/Navbar';
import { events, times } from './YardSales/Items'

import { YardsalesService, YardSaleRead } from '../services/client'

type Props = {
  signedIn: boolean
}


function YardSales({ signedIn }: Props) {

  const theme = useTheme();
  const headerHeight = useAppBarHeight();

  const [location, setLocation] = useState<ILocation>({ latitude: 39.95, longitude: -74.2 });
  const [lackingPermission, setLackingPermission] = useState(false);
  const [loadedLocation, setLoadedLocation] = useState(false);

  const [pickedEvents, setEvents] = useState(() => events.map((event) => event.key));
  const [pickedTime, setTime] = useState('today');

  // TODO: Utilize status field
  const [status, setStatus] = useState<string | null>(null);
  const [showCreateFrom, setShowCreateForm] = useState(false);

  const [yardsales, setYardsales] = useState<YardSaleRead[]>([]);

  useEffect(() => {
    async function getYardsales() {
      const newYardsales = await YardsalesService.readYardsales(location.latitude, location.longitude, 100, 0, 50);
      setYardsales(newYardsales);
    }
    getYardsales();
  }, [loadedLocation]);

  const addYardsale = (yardsale: YardSaleRead) => {
    setYardsales([...yardsales, yardsale]);
  };

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
        setLoadedLocation(true);
      }, () => {
        setStatus('Unable to retrieve your location. Please check your permissions');
        setLackingPermission(true);
      },
        // { enableHighAccuracy: true } // might slow things down
      );
    }
  }

  useEffect(() => {
    if (!lackingPermission && !loadedLocation) {
      getLocation();
    }
  })


  return (
    <Box sx={{ height: `calc(100vh - ${headerHeight}px)`, width: '100%', overflow: 'hidden' }} >
      <Box sx={{ height: headerHeight, backgroundColor: 'white', }} >
        <Navbar pickedEvents={pickedEvents} setEvents={setEvents} pickedTime={pickedTime} setTime={setTime} />
      </Box>
      <Box sx={{ height: `100%`, }}>
        <YardSalesMap location={location} setLocation={setLocation} loadedLocation={loadedLocation}
          pickedEvents={pickedEvents} pickedTime={pickedTime} yardsales={yardsales} />
      </Box>

      {/* ================ Below has absolute positioning ======================= */}

      {/* ============ Add Button ============== */}
      <Fab variant="extended" color="primary" aria-label="add" sx={theme.fab} onClick={handleCreateFormChange}>
        {showCreateFrom ? (
          <> <BackIcon /> Hide Add Form </>
        ) : (
          <> <AddIcon /> Add Event </>
        )
        }
      </Fab>

      {/* ============ Add Form ============== */}
      <Slide direction="up" in={showCreateFrom} mountOnEnter unmountOnExit >
        <Container sx={{ background: 'white', position: 'fixed', bottom: 0, left: 0, right: 0, borderRadius: '25px 25px 0px 0px' }}>
          <YardSalesAdd location={location} signedIn={signedIn} addYardsale={addYardsale} />
        </Container>
      </Slide >
    </Box >
  )
}

export default YardSales
