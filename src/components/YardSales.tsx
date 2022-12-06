import 'mapbox-gl/dist/mapbox-gl.css';

import useAppBarHeight from '../utils/useAppBarHeight'
import { useEffect, useState } from 'react';
import moment from 'moment';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Fab from '@mui/material/Fab';
import Slide from '@mui/material/Slide';
import AddIcon from '@mui/icons-material/Add';
import BackIcon from '@mui/icons-material/ArrowDownward';
// import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import { ILocation } from '../interfaces/location';
import YardSalesMap from './YardSales/Map';
import YardSalesAdd from './YardSales/Add';
import Navbar from './YardSales/Navbar';

import { EventsService, EventRead } from '../services/client'

type Props = {
  signedIn: boolean
}

const loadingMessages = [
  'Looking For You',
  'Still Looking For You',
  'Where Are You Hiding',
  'Did you even give us permission?',
  'Are you sure?',
]

function YardSales({ signedIn }: Props) {

  const theme = useTheme();
  const headerHeight = useAppBarHeight();

  const [pickedEvents, setEvents] = useState(['yardsales']);  //() => events.map((event) => event.key));
  const [pickedTime, setTime] = useState('today');

  const [userLocation, setUserLocation] = useState<ILocation | null>(null);
  const [mapCenter, setMapCenter] = useState<ILocation | null>(null);
  const [addYardsaleLocation, setAddYardsaleLocation] = useState<ILocation | null>(null);
  const [zoom, setZoom] = useState(11);

  const [mapStatus, setMapStatus] = useState(loadingMessages[0]);
  const [showWithoutLocationButton, setShowWithoutLocationButton] = useState(true);
  const [locating, setLocating] = useState(true);
  const [locatingMsgIndex, setLocatingMsgIndex] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(false);

  // TODO: Utilize status field
  const [status, setStatus] = useState<string | null>(null);
  const [showCreateFrom, setShowCreateForm] = useState(false);

  const [yardsales, setYardsales] = useState<EventRead[]>([]);

  const located = !!userLocation && !!mapCenter && !!addYardsaleLocation;

  const updateLocations = (location: ILocation) => {
    setUserLocation(location);
    setMapCenter(location);
    setAddYardsaleLocation(location);
  };

  const addYardsale = (yardsale: EventRead) => {
    setYardsales([...yardsales, yardsale]);
  };

  const handleCreateFormChange = () => {
    setShowCreateForm((prev) => !prev);
  };

  const proceedWithoutLocation = () => {
    // Center of U.S. zoomed out
    updateLocations({ latitude: 40, longitude: -100 });
    setZoom(3);
    setShowWithoutLocationButton(false);
    setLocating(false);
    setMapStatus('Loading Map');
  };

  useEffect(() => {
    if (locating) {
      setMapStatus(loadingMessages[locatingMsgIndex]);
    }
  }, [locatingMsgIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLocatingMsgIndex((prev) => ((prev + 1) % loadingMessages.length));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function getLocation() {
      if (!navigator.geolocation) {
        setStatus('Geolocation is not supported by your browser');
        proceedWithoutLocation();
        return;
      };

      if (!userLocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // updateLocations({ ...position.coords });
            updateLocations({ latitude: position.coords.latitude, longitude: position.coords.longitude });
            setLocating(false);
            setMapStatus('Loading Map');
          },
          () => {
            setStatus('Unable to retrieve your location. Please check your permissions');
            proceedWithoutLocation();
          }
        )
      }
    }
    getLocation();
  }, []);


  useEffect(() => {
    async function getYardsales() {
      if (!mapCenter) return;

      const newYardsales = await EventsService.readEvents(mapCenter.latitude, mapCenter.longitude, 10000, 0, 5000);
      // Sort below helps display today's sales on top of tomorrow's. Cheating basically
      setYardsales(newYardsales.sort((y1, y2) => moment(y2.start_date).diff(moment(y1.start_date))));
    }
    getYardsales();
  }, [mapCenter?.latitude, mapCenter?.longitude]);


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
          {showWithoutLocationButton &&
            <Box mt={4}>
              <Tooltip title="Sharing location provides more features but is optional!">
                <Button color='warning' variant='outlined' onClick={proceedWithoutLocation}> Proceed without location</Button>
              </Tooltip>
            </Box>
          }
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
                pickedEvents, pickedTime, yardsales,
                zoom
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

      {/* ============ Find me ============== */}
      {/* <Fab variant="extended" color="primary" aria-label="add"
        sx={{ bottom: theme.spacing(12), right: theme.fab.right, position: theme.fab.position }}
        onClick={handleCreateFormChange}>
        <LocationSearchingIcon />
      </Fab> */}


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
