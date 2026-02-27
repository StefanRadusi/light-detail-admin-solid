import { Loader } from "@googlemaps/js-api-loader";
import { onMount } from "solid-js";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const loader = new Loader({
  apiKey,
  version: "weekly",
  libraries: ["maps", "marker"],
});

const mapOptions = {
  center: {
    lat: 46.76990498138808,
    lng: 23.587283658350607,
  },
  zoom: 18,
  mapId: "light-detail-map-id",
};

const GoogleMaps = () => {
  onMount(async () => {
    try {
      const [{ Map }, { AdvancedMarkerElement }] = await Promise.all([
        loader.importLibrary("maps"),
        loader.importLibrary("marker"),
      ]);

      const element = document.getElementById("google-map-component");
      if (element) {
        const map = new Map(element, mapOptions);
        new AdvancedMarkerElement({
          position: mapOptions.center,
          map,
          title: "Light Detail",
        });
      }
    } catch (error) {
      console.error("Error loading Google Maps:", error);
    }
  });

  return <div id="google-map-component" class="w-full h-[400px]" />;
};

export default GoogleMaps;
