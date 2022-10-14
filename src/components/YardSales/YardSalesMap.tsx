
import Map, { Marker, GeolocateControl, NavigationControl } from 'react-map-gl';
import { useEffect, useMemo, useState } from 'react';
import { MAPBOX_TOKEN } from '../../env'
import { IYardSale } from '../../interfaces/yardsale';
import { api } from '../../services/api';
import { ILocation } from '../../interfaces/location';
import YardSalesSelectedPopup from './YardSalesSelectedPopup';


type Props = {
  location: ILocation,
  setLocation: Function
}

function YardSalesMap({ location, setLocation }: Props) {
  const [yardsales, setYardsales] = useState<IYardSale[]>([]);
  const [selectedYardsale, setSelectedYardsale] = useState<IYardSale | null>(null);

  useEffect(() => {
    async function getYardsales() {
      const newYardsales = await api.getYardSales(location.latitude, location.longitude, 1000, 0, 300).then(response => response.data);
      setYardsales(newYardsales);
    }
    if (!yardsales.length) {
      getYardsales();
    }
  }, []);

  const yardsaleMarkers = useMemo(() =>
    yardsales.map(yardsale => (
      <Marker
        key={yardsale.id}
        latitude={yardsale.latitude}
        longitude={yardsale.longitude}
        color="blue"
        onClick={e => {
          setSelectedYardsale(yardsale);
        }}
      />
    )
    ), [yardsales]);

  return (
    <Map
      style={{ height: '100%' }}
      reuseMaps
      initialViewState={{
        ...location,
        zoom: 14
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <NavigationControl />
      <GeolocateControl />

      {/* YARD SALES AROUND YOU */}
      {yardsaleMarkers}

      {/* YOU ARE HERE */}
      <Marker
        draggable
        latitude={location.latitude}
        longitude={location.longitude}
        color="red"
        onDragEnd={e => {
          setLocation({ latitude: e.lngLat.lat, longitude: e.lngLat.lng });
        }}
      />

      {/* SELECTED YARD SALE */}
      {selectedYardsale && YardSalesSelectedPopup({ selectedYardsale, setSelectedYardsale })}
    </Map>
  )
}

export default YardSalesMap