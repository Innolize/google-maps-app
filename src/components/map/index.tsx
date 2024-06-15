import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback } from 'react';

import { MARKER_ENUM, MarkerType } from '@/interfaces/map/Marker';

const MAP_CONTAINER_SIZE = {
	width: '1280px',
	height: '720px',
};

const MAP_CENTER = {
	lat: -34.590614963627395,
	lng: -58.548231004550146,
};

const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

type MapProps = {
	markers: MarkerType[];
};

const PACKAGE_SIZE_COLORS = {
	[MARKER_ENUM.SMALL]: 'green',
	[MARKER_ENUM.MEDIUM]: 'yellow',
	[MARKER_ENUM.LARGE]: 'blue',
};

function Map({ markers = [] }: MapProps) {
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
			{markers.map((marker, idx) => (
				<Marker
					position={{ lat: marker.lat, lng: marker.lng }}
					key={idx}
					icon={{
						path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z',
						fillColor: PACKAGE_SIZE_COLORS[marker.type || MARKER_ENUM.MEDIUM], // change the background color here
						fillOpacity: 1,
						strokeWeight: 0,
						scale: 1.5,
						anchor: new window.google.maps.Point(5, 10),
					}}
				></Marker>
			))}
		</GoogleMap>
	) : (
		<></>
	);
}

export default React.memo(Map);
