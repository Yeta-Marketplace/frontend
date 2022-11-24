import 'mapbox-gl/dist/mapbox-gl.css';

import useAppBarHeight from '../utils/useAppBarHeight'
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Fab from '@mui/material/Fab';
import Slide from '@mui/material/Slide';
import AddIcon from '@mui/icons-material/Add';
import BackIcon from '@mui/icons-material/ArrowDownward';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import { ILocation } from '../interfaces/location';
import YardSalesMap from './YardSales/Map';
import YardSalesAdd from './YardSales/Add';
import Navbar from './YardSales/Navbar';

import { YardsalesService, YardSaleRead } from '../services/client'

type Props = {
  signedIn: boolean
}


function YardSales({ signedIn }: Props) {

  const theme = useTheme();
  const headerHeight = useAppBarHeight();

  const [pickedEvents, setEvents] = useState(['yardsales']);  //() => events.map((event) => event.key));
  const [pickedTime, setTime] = useState('today');

  const [userLocation, setUserLocation] = useState<ILocation | null>(null);
  const [mapCenter, setMapCenter] = useState<ILocation | null>(null);
  const [addYardsaleLocation, setAddYardsaleLocation] = useState<ILocation | null>(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapStatus, setMapStatus] = useState('');

  const located = !!userLocation && !!mapCenter && !!addYardsaleLocation;

  // TODO: Utilize status field
  const [status, setStatus] = useState<string | null>(null);
  const [showCreateFrom, setShowCreateForm] = useState(false);

  const [yardsales, setYardsales] = useState<YardSaleRead[]>([]);

  const updateLocations = (location: ILocation) => {
    setUserLocation(location);
    setMapCenter(location);
    setAddYardsaleLocation(location);
  };

  useEffect(() => {
    async function getLocation() {
      if (!navigator.geolocation) {
        setStatus('Geolocation is not supported by your browser');
        return;
      };

      if (!userLocation) {
        setMapStatus('Locating You');

        navigator.geolocation.getCurrentPosition(
          (position) => {
            // updateLocations({ ...position.coords });
            updateLocations({ latitude: position.coords.latitude, longitude: position.coords.longitude });
            setMapStatus('Loading Map');
          },
          () => {
            setStatus('Unable to retrieve your location. Please check your permissions');
          }
        )
      }
    }
    getLocation();
  }, []);

  useEffect(() => {
    async function getYardsales() {
      if (!mapCenter) return;

      const newYardsales = await YardsalesService.readYardsales(mapCenter.latitude, mapCenter.longitude, 200, 0, 50);
      setYardsales(newYardsales);
    }
    getYardsales();
  }, [mapCenter?.latitude, mapCenter?.longitude]);

  const addYardsale = (yardsale: YardSaleRead) => {
    setYardsales([...yardsales, yardsale]);
  };

  const handleCreateFormChange = () => {
    setShowCreateForm((prev) => !prev);
  };

  return (
    <Box sx={{ height: `calc(100vh - ${headerHeight}px)`, width: '100%', overflow: 'hidden' }} >

      <Box sx={{ height: headerHeight, backgroundColor: 'white', }} >
        <Navbar pickedEvents={pickedEvents} setEvents={setEvents} pickedTime={pickedTime} setTime={setTime} />
      </Box>

      <Box
        display="flex"
        flexDirection='column'
        justifyContent="center"
        alignItems="center"
        height='100%'
        position='relative'
      >
        <Box
          visibility={!mapLoaded ? 'visible' : 'hidden'}
          display="flex"
          flexDirection='column'
          alignItems="center"
          position='absolute'
        >
          <CircularProgress color='secondary' size="5rem" />
          <Typography variant='h4' mt={2} color='grey'> {mapStatus}</Typography>
        </Box>

        <Box
          height='100%'
          width='100%'
          visibility={mapLoaded ? 'visible' : 'hidden'}
        >
          {located &&
            <YardSalesMap
              {...{
                userLocation, setUserLocation,
                mapCenter, setMapCenter,
                addYardsaleLocation, setAddYardsaleLocation,
                updateLocations, setMapLoaded,
                pickedEvents, pickedTime, yardsales
              }}
            />
          }
        </Box>
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
      {!!addYardsaleLocation &&
        <Slide direction="up" in={showCreateFrom} mountOnEnter unmountOnExit >
          <Container sx={{ background: 'white', position: 'fixed', bottom: 0, left: 0, right: 0, borderRadius: '25px 25px 0px 0px' }}>
            <YardSalesAdd location={addYardsaleLocation} signedIn={signedIn} addYardsale={addYardsale} />
          </Container>
        </Slide >
      }
    </Box >
  )
}

export default YardSales
