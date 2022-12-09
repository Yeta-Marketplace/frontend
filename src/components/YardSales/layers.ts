// Helpful Pages:
// https://docs.mapbox.com/help/troubleshooting/using-recolorable-images-in-mapbox-maps/#mapbox-gl-js

import type {LayerProps} from 'react-map-gl';

export const clusterLayer: LayerProps = {
  id: 'clusters',
  type: 'circle',
  source: 'events',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': '#ffffff',
    'circle-radius': ['step', ['get', 'point_count'], 30, 5, 35, 10, 40],
    // 'circle-radius': {'base': 30, 'stops': [[3, 40], [4, 30], [15, 30]]},
    // 'circle-stroke-color': ['step', ['get', 'point_count'], '#51bbd6', 5, '#f1f075', 10, '#f28cb1'],
    'circle-stroke-color': '#f66200',
    'circle-stroke-width': 3
  }
};

export const clusterCountLayer: LayerProps = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'events',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 25,
  }
};

export const unclusteredPointLayer: LayerProps = {
  id: 'unclustered-point',
  type: 'symbol',
  source: 'events',
  filter: ['!', ['has', 'point_count']],
  layout: {
    'icon-image': 'yardsale',
    'icon-size': 0.4
  },
  'paint': {
    'icon-color': '#f66200',
  }
};
