import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback } from 'react';

const MAP_CONTAINER_SIZE = {
	width: '1280px',
	height: '720px',
};

const MAP_CENTER = {
	lat: -34.590614963627395,
	lng: -58.548231004550146,
};

const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function Map() {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: GOOGLE_MAP_API_KEY,
	});

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setMap] = React.useState<google.maps.Map | null>(null);

	const onLoad = useCallback(function callback(map: google.maps.Map) {
		setMap(map);
	}, []);

	const onUnmount = useCallback(function callback() {
		setMap(null);
	}, []);

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={MAP_CONTAINER_SIZE}
			center={MAP_CENTER}
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
