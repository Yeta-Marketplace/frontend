
import Map, { Marker, GeolocateControl, NavigationControl } from 'react-map-gl';
import { useMemo, useState } from 'react';
import { MAPBOX_TOKEN } from '../../env'
import { ILocation } from '../../interfaces/location';
import YardSalesSelectedPopup from './SelectedPopup';
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

import { YardSaleRead } from '../../services/client'
import { Point as MapboxPoint } from 'mapbox-gl';


type Ghost = {
  latitude: number,
  longitude: number
}

function coords(latitude: number, longitude: number, n: number): Ghost[] {
  const coordinates = Array.from({ length: n }, () => ({
    latitude: latitude + Math.random() * 2 - 1,
    longitude: longitude + Math.random() * 2 - 1,
  }));
  return coordinates
}

function computeScaleFromZoom(zoom: number): number {
  return Math.max(0.5, Math.min(Math.floor(zoom) / 10, 1));
}


type Props = {
  location: ILocation,
  setLocation: Function,
  pickedEvents: string[],
  pickedTime: string,
  yardsales: YardSaleRead[]
}

function YardSalesMap({ location, setLocation, pickedEvents, pickedTime, yardsales }: Props) {

  const [viewState, setViewState] = useState({
    ...location,
    zoom: 11
  });

  const ghosts = useMemo<Ghost[]>(() => coords(location.latitude, location.longitude, 10), [location]);
  const [selectedYardsale, setSelectedYardsale] = useState<YardSaleRead | null>(null);

  const scale = computeScaleFromZoom(viewState.zoom);

  const timedelta = (pickedTime == 'this_week' ? 7 : 0);

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

      const offset = new MapboxPoint(-12, -28);

      return <Marker
        key={yardsale.id + color}
        latitude={yardsale.latitude}
        longitude={yardsale.longitude}
        color={color}
        onClick={e => {
          setSelectedYardsale(yardsale);
        }}
        offset={offset.mult(scale)}  // Manual hack to properly align markers
      >
        <span className="fa-layers fa-fw "
          style={{ transform: `scale(${scale})` }}
        >
          <FontAwesomeIcon icon={PinIcon} size='4x' color={color} />
          <FontAwesomeIcon icon={PinIcon} size='3x' inverse transform="right-2 up-0.5" />
          <FontAwesomeIcon icon={YardSaleIcon} size='lg' transform="right-8.7 up-6" color={color} />
        </span>
      </Marker>
    }
    ), [yardsales, scale, pickedEvents, pickedTime]);

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
      {...viewState}
      style={{ height: '100%' }}
      reuseMaps
      onMove={evt => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
      onClick={e => { setLocation({ latitude: e.lngLat.lat, longitude: e.lngLat.lng }); }}
    >
      <NavigationControl />
      <GeolocateControl onGeolocate={e =>
        setLocation({ latitude: e.coords.latitude, longitude: e.coords.longitude })
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