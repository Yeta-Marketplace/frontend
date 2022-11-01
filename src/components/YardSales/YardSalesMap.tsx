
import Map, { Marker, GeolocateControl, NavigationControl } from 'react-map-gl';
import { useEffect, useMemo, useState } from 'react';
import { MAPBOX_TOKEN } from '../../env'
import { IYardSale } from '../../interfaces/yardsale';
import { api } from '../../services/api';
import { ILocation } from '../../interfaces/location';
import YardSalesSelectedPopup from './YardSalesSelectedPopup';
import moment from 'moment';
import { alpha } from "@mui/material";

import { timeColors } from './Items';

// import AddYardSaleIcon from '@mui/icons-material/AddBusiness';
import AddYardSaleIcon from '@mui/icons-material/AddLocationAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faWarehouse as YardSaleIcon,
  faGhost as HalloweenIcon,
  faLocationPin as PinIcon,
} from '@fortawesome/free-solid-svg-icons'


type Ghost = {
  latitude: number,
  longitude: number
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function coords(latitude: number, longitude: number, n: number): Ghost[] {
  const coordinates = Array.from({ length: n }, () => ({
    latitude: latitude + Math.random() * 2 - 1,
    longitude: longitude + Math.random() * 2 - 1,
  }));
  return coordinates
}


type Props = {
  location: ILocation,
  setLocation: Function,
  pickedEvents: string[],
  pickedTime: string
}

function YardSalesMap({ location, setLocation, pickedEvents, pickedTime }: Props) {

  const [yardsales, setYardsales] = useState<IYardSale[]>([]);
  const [ghosts, setGhosts] = useState<Ghost[]>(coords(location.latitude, location.longitude, 10));

  const [selectedYardsale, setSelectedYardsale] = useState<IYardSale | null>(null);

  const timedelta = (pickedTime == 'this_week' ? 7 : 0);

  useEffect(() => {
    async function getYardsales() {
      const newYardsales = await api.getYardSales(location.latitude, location.longitude, 1000, 0, 1000).then(response => response.data);
      setYardsales(newYardsales);
    }
    if (!yardsales.length) {
      getYardsales();
    }
  }, []);

  const yardsaleMarkers = useMemo(() =>
    yardsales.map(yardsale => {
      const start = moment().format('YYYY-MM-DD');
      const end = moment().add(timedelta, 'days').format('YYYY-MM-DD');
      let color = null;

      if (moment(yardsale.start_date).isAfter(end)) {
        // Future YS
        color = timeColors['future'];
      } else if (moment(yardsale.end_date).isBefore(start)) {
        // Past YS
        color = alpha(timeColors['past'], 0.5);
      } else {
        color = timeColors['present'];
      }

      return <Marker
        key={yardsale.id + color}
        latitude={yardsale.latitude}
        longitude={yardsale.longitude}
        color={color}
        onClick={e => {
          setSelectedYardsale(yardsale);
        }}
        anchor='bottom'
      >
        <span className="fa-layers fa-fw" >
          <FontAwesomeIcon icon={PinIcon} size='4x' color={color} />
          <FontAwesomeIcon icon={PinIcon} size='3x' inverse transform="right-2 up-0.5" />
          <FontAwesomeIcon icon={YardSaleIcon} size='lg' transform="right-8.7 up-6" color={color} />
        </span>
      </Marker>
    }
    ), [yardsales, pickedEvents, pickedTime]);

  const ghostMarkers = useMemo(() =>
    ghosts.map(ghost => {
      return <Marker
        key={ghost.latitude + ' ' + ghost.longitude}
        latitude={ghost.latitude}
        longitude={ghost.longitude}
      >
        <FontAwesomeIcon icon={HalloweenIcon} size='2x' color='white' fade />
      </Marker>
    }), [ghosts]);

  return (
    <Map
      style={{ height: '100%' }}
      reuseMaps
      initialViewState={{
        ...location,
        zoom: 11
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
      onClick={e => { setLocation({ latitude: e.lngLat.lat, longitude: e.lngLat.lng }); }}
    >
      <NavigationControl />
      <GeolocateControl onGeolocate={e => {
        setLocation({ latitude: e.coords.latitude, longitude: e.coords.longitude });
      }
      } />

      {/* YARD SALES AROUND YOU */}
      {pickedEvents.includes('yardsales') && yardsaleMarkers}

      {/* ====== FUN ====== */}
      {pickedEvents.includes('halloween') && ghostMarkers}

      {/* SELECTED YARD SALE */}
      {selectedYardsale && YardSalesSelectedPopup({ selectedYardsale, setSelectedYardsale })}

      {/* CURRENT/CLICKED LOCATION MARKER */}
      <Marker
        draggable
        latitude={location.latitude}
        longitude={location.longitude}
        anchor='bottom'
        onDragEnd={e => {
          setLocation({ latitude: e.lngLat.lat, longitude: e.lngLat.lng });
        }}
      >
        <AddYardSaleIcon color='secondary' fontSize='large' sx={{ fontSize: '45px' }} />
      </Marker>

    </Map>
  )
}

export default YardSalesMap