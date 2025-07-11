<template>
  <div id="map-container">
    <div id="map" style="width: 100%; height: 100vh"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import useEnv from '@/composables/useEnv';
import { useRoute } from 'vue-router';
import { usePackageMapStore } from '@/store/packageMap.js';

const route = useRoute();
const id = route.params.id;
const packages = ref({
  id: 0,
  delivery_tracking: { lat: 0, lng: 0 }, // Start location
  location: { lat: 0, lng: 0 }, // End location
});

const { show } = usePackageMapStore();
const { APP_MAP_BOX_TOKEN } = useEnv();
mapboxgl.accessToken = APP_MAP_BOX_TOKEN;

const getPackage = async () => {
  const response = await show(id);
  packages.value = response.data;
};

onMounted(async () => {
  await getPackage();
  const { delivery_tracking, location } = packages.value;

  console.log('Start:', [delivery_tracking.lng, delivery_tracking.lat]);
  console.log('End:', [location.lng, location.lat]);

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [delivery_tracking.lng, delivery_tracking.lat],
    zoom: 12,
    interactive: true,
  });

  // Add markers
  new mapboxgl.Marker({ color: 'blue' })
    .setLngLat([delivery_tracking.lng, delivery_tracking.lat])
    .addTo(map);

  new mapboxgl.Marker({ color: 'red' })
    .setLngLat([location.lng, location.lat])
    .addTo(map);

  map.on('load', () => {
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      alternatives: false,
      controls: {
        instructions: true,
        inputs: true,
        profileSwitcher: true
      },
      geometries: 'geojson',
    });

    map.addControl(directions, 'top-left');

    directions.setOrigin([delivery_tracking.lng, delivery_tracking.lat]);
    directions.setDestination([location.lng, location.lat]);

    directions.on('error', (e) => {
      console.error('Directions error:', e.error);
    });

    directions.on('route', (e) => {
      console.log('Route received:', e.route);
      const routeLayerId = 'directions-route-line';
      if (map.getLayer(routeLayerId)) {
        map.setPaintProperty(routeLayerId, 'line-width', 4);
        map.setPaintProperty(routeLayerId, 'line-color', '#3b82f6');
      }
    });
  });
});

</script>

<style scoped></style>
