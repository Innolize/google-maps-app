import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback } from 'react';

const containerStyle = {
	width: '1280px',
	height: '720px',
};

const center = {
	lat: -34.590614963627395,
	lng: -58.548231004550146,
};

const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function Map() {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: GOOGLE_MAP_API_KEY,
	});

	const [map, setMap] = React.useState(null);

	const onLoad = useCallback(function callback(map: google.maps.Map) {
		// This is just an example of getting and using the map instance!!! don't just blindly copy!
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);

		map.setMap(map);
	}, []);

	const onUnmount = useCallback(function callback(map: google.maps.Map) {
		setMap(null);
	}, []);

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={11}
			onLoad={onLoad}
			onUnmount={onUnmount}
		>
			{/* Child components, such as markers, info windows, etc. */}
		</GoogleMap>
	) : (
		<></>
	);
}

export default React.memo(Map);
