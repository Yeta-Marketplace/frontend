
import Map, { Marker, GeolocateControl, NavigationControl } from 'react-map-gl';
import { useEffect, useMemo, useState } from 'react';
import { MAPBOX_TOKEN } from '../../env'
import { IYardSale } from '../../interfaces/yardsale';
import { api } from '../../services/api';
import { ILocation } from '../../interfaces/location';
import YardSalesSelectedPopup from './YardSalesSelectedPopup';
import moment from 'moment';
import { alpha } from "@mui/material";

// import AddYardSaleIcon from '@mui/icons-material/AddBusiness';
import AddYardSaleIcon from '@mui/icons-material/AddLocationAlt';


type Props = {
  location: ILocation,
  setLocation: Function
}

function YardSalesMap({ location, setLocation }: Props) {
  const [yardsales, setYardsales] = useState<IYardSale[]>([]);
  const [selectedYardsale, setSelectedYardsale] = useState<IYardSale | null>(null);

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
      const now = moment().format('YYYY-MM-DD');
      let color = null;
      let alphaCoeff = 0.5;

      if (moment(yardsale.start_date).isAfter(now)) {
        // Future YS
        color = "#fee541";
      } else if (moment(yardsale.end_date).isBefore(now)) {
        // Past YS
        color = "#a4a4a4";
      } else {
        alphaCoeff = 1.0;
        color = "#001fcf";
      }

      return <Marker
        key={yardsale.id}
        latitude={yardsale.latitude}
        longitude={yardsale.longitude}
        color={alpha(color, alphaCoeff)}
        onClick={e => {
          setSelectedYardsale(yardsale);
        }}
      />

    }
    ), [yardsales]);

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
      {yardsaleMarkers}

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