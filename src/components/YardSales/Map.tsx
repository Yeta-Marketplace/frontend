
import { useRef, useState, useEffect, useMemo } from 'react';
import moment from 'moment';

import { Map, Source, Layer, MapLayerMouseEvent, Marker, NavigationControl, GeolocateControl } from 'react-map-gl';
import type { MapRef } from 'react-map-gl';
import type { GeoJSONSource } from 'react-map-gl';
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from './layers';

import { ILocation } from '../../interfaces/location';
import { EventRead } from '../../services/client'

import { MAPBOX_TOKEN } from '../../env'
import YardSalesSelectedPopup from './SelectedPopup';
import AddYardSaleIcon from '@mui/icons-material/AddLocationAlt';

import YSimgUrl from '/src/icons/warehouse-solid.png';
import { timeColors } from './Items';
import { alpha } from "@mui/material";

const getFeature = (event: EventRead, start_date: string, end_date: string): GeoJSON.Feature<GeoJSON.Geometry> => {

  let color = '#f66200'; // default - current sale

  if (moment(event.start_date).isAfter(end_date)) {
    // Future YS
    color = timeColors['future'];
  } else if (moment(event.end_date).isBefore(start_date)) {
    // Past YS
    color = alpha(timeColors['past'], 0.5);
  }

  return {
    "type": "Feature",
    "properties": { "id": event.id, "color": color },
    "geometry": {
      "type": "Point",
      "coordinates": [event.longitude, event.latitude]
    }
  }
}

type Props = {
  userLocation: ILocation,
  setUserLocation: Function,
  mapCenter: ILocation,
  setMapCenter: Function,
  addYardsaleLocation: ILocation,
  setAddYardsaleLocation: Function,
  updateLocations: Function,
  setMapLoaded: Function,
  pickedEvents: string[],
  pickedTime: string,
  yardsales: EventRead[],
  zoom: number
}

function YardSalesMap({
  userLocation,
  setUserLocation,
  mapCenter,
  setMapCenter,
  addYardsaleLocation,
  setAddYardsaleLocation,
  updateLocations,
  setMapLoaded,
  pickedEvents,
  pickedTime,
  yardsales,
  zoom
}: Props) {

  const mapRef = useRef<MapRef>(null);
  const [viewState, setViewState] = useState({
    ...mapCenter,
    zoom: zoom
  });
  const [selectedYardsale, setSelectedYardsale] = useState<EventRead | null>(null);

  useEffect(() => {
    setViewState({ ...mapCenter, zoom: viewState.zoom });
  }, [userLocation]);

  useEffect(() => {
    const map = mapRef?.current?.getMap();

    map?.loadImage(YSimgUrl, (error, image) => {
      if (error) throw error;
      if (image === undefined) return;
      // About sdf: https://docs.mapbox.com/help/troubleshooting/using-recolorable-images-in-mapbox-maps/#what-are-signed-distance-fields-sdf
      if (!map.hasImage('yardsale')) map.addImage('yardsale', image, { sdf: true });
    })


  }); // This might need some condition to make sure it doesn't refresh every time


  const onClick = ((mapRef == null) ? undefined
    : (event: MapLayerMouseEvent) => {

      const features = event?.features;
      if ((features === undefined) || (features.length == 0)) return;
      const feature = features[0];

      if (feature.layer.id === clusterLayer.id) {
        const clusterId = feature?.properties?.cluster_id;
        const mapboxSource = mapRef.current?.getSource('events') as GeoJSONSource;

        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;
          if (feature.geometry.type === 'Point')
            mapRef.current?.easeTo({
              center: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]],
              zoom,
              duration: 500
            });
        });
      } else if (feature.layer.id === unclusteredPointLayer.id) {
        const yardsale = yardsales.find(y => y.id === feature.properties?.id);
        if (!!yardsale) setSelectedYardsale(yardsale);
      }
    }
  );


  const data = useMemo<GeoJSON.FeatureCollection>(() => {

    const timedelta = (pickedTime == 'this_week' ? 7 : 0);
    const start_date = moment().format('YYYY-MM-DD');
    const end_date = moment().add(timedelta, 'days').format('YYYY-MM-DD');

    return {
      "type": "FeatureCollection",
      "features": yardsales.map(y => getFeature(y, start_date, end_date))
    }
  }, [yardsales, pickedTime]);

  return (
    <Map
      {...viewState}
      ref={mapRef}
      reuseMaps
      mapStyle="mapbox://styles/mathemmagician/clb67hniu000315p9ia3byczt"
      mapboxAccessToken={MAPBOX_TOKEN}
      onLoad={e => setMapLoaded(true)}
      onMove={evt => {
        setViewState(evt.viewState);
        // setMapCenter({ latitude: Math.round(evt.viewState.latitude), longitude: Math.round(evt.viewState.longitude) });
      }}
      interactiveLayerIds={[clusterLayer.id!, unclusteredPointLayer.id!]}
      onClick={onClick}
    >
      <NavigationControl />
      <GeolocateControl onGeolocate={position =>
        updateLocations({ latitude: position.coords.latitude, longitude: position.coords.longitude })
      } />

      <Source
        id="events"
        type="geojson"
        data={data} //"https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
        cluster={true}
        clusterMaxZoom={7}
        clusterRadius={50}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>

      {/* SELECTED YARD SALE */}
      {selectedYardsale && YardSalesSelectedPopup({ selectedYardsale, setSelectedYardsale })}

      {/* CURRENT/CLICKED LOCATION MARKER */}
      <Marker
        draggable
        latitude={addYardsaleLocation.latitude}
        longitude={addYardsaleLocation.longitude}
        anchor='bottom'
        onDragEnd={e => {
          setAddYardsaleLocation({ latitude: e.lngLat.lat, longitude: e.lngLat.lng });
        }}
      >
        <AddYardSaleIcon color='secondary' fontSize='large' sx={{ fontSize: '45px' }} />
      </Marker>

    </Map>
  )
}

export default YardSalesMap