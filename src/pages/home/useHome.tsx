import { useState } from 'react';

import { MODAL_ENUM, MarkerType } from '@/interfaces/map/Marker';

export const useHome = () => {
	const [markers, setMarkers] = useState<MarkerType[]>([]);
	const [selectedMarkers, setSelectedMarkers] = useState<MarkerType[]>([]);
	const [currentModelOpen, setCurrentModelOpen] = useState<MODAL_ENUM | null>(
		null,
	);

	const [currentMarker, setCurrentMarker] = useState<MarkerType | null>(null);

	const handleAddCurrentMarker = (marker: MarkerType) => {
		setCurrentMarker(marker);
	};

	const handleRemoveCurrentMarker = () => {
		setCurrentMarker(null);
	};

	const handleAddMarkerButtonOnClick = () => {
		setCurrentModelOpen(MODAL_ENUM.CREATE_MARKER);
	};

	const handleRemoveSelectedMarker = (markerName: string) => {
		setSelectedMarkers(
			selectedMarkers.filter((marker) => marker.name !== markerName),
		);
	};

	const handleOpenAssignDriverModel = () => {
		setCurrentModelOpen(MODAL_ENUM.ASSIGN_DRIVER);
	};

	const handleClearSelectedMarkers = () => {
		setSelectedMarkers([]);
	};

	const handleAddMarker = (newMarker: MarkerType) => {
		setMarkers([...markers, newMarker]);
		setCurrentModelOpen(null);
	};

	const handleCloseSidePannel = () => {
		setCurrentModelOpen(null);
	};

	const handleSelectMarker = (markerName: string) => {
		try {
			const foundMarker = markers.find((marker) => marker.name === markerName);
			if (!foundMarker) throw new Error('Marker not found');
			setSelectedMarkers([...selectedMarkers, foundMarker]);
		} catch (error) {
			console.log(error);
		}
	};

	const handleAssignDriver = (driver: string) => {
		const newMarkerArray = markers.map((marker) => {
			const updatedItem = selectedMarkers.find(
				(item) => item.lat === marker.lat && item.lng === marker.lng,
			);

			return updatedItem ? { ...marker, asignee: driver } : marker;
		});

		setMarkers(newMarkerArray);
		setSelectedMarkers([]);
		setCurrentModelOpen(null);
	};

	return {
		markers,
		selectedMarkers,
		currentModelOpen,
		handleAddMarkerButtonOnClick,
		handleOpenAssignDriverModel,
		handleClearSelectedMarkers,
		handleAddMarker,
		handleCloseSidePannel,
		handleSelectMarker,
		handleAssignDriver,
		handleAddCurrentMarker,
		handleRemoveCurrentMarker,
		currentMarker,
		handleRemoveSelectedMarker,
	};
};
