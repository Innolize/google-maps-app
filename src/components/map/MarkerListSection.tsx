import { useState } from 'react';

import { CreatedRoutesList } from './CreatedRoutesList';
import { MarkerList } from './MarkerList';
import { SelectedMarkersList } from './SelectedMarkersList';

import { MarkerType } from '@/interfaces/map/Marker';

export enum TABS_ENUM {
	SELECTION = 'Seleccionadas',
	MARKERS = 'Marcadores',
	CREATED_ROUTES = 'Rutas ya creadas',
}

export default function MarkerListSection({
	markers,
	selectedMarkers,
	assignDriverOnClick,
	clearSelectedMarkersOnClick,
}: {
	markers: MarkerType[];
	selectedMarkers: MarkerType[];
	assignDriverOnClick: () => void;
	clearSelectedMarkersOnClick: () => void;
}) {
	const [activeTab, setActiveTab] = useState<TABS_ENUM>(TABS_ENUM.SELECTION);

	const handleTabClick = (tab: TABS_ENUM) => {
		setActiveTab(tab);
	};

	return (
		<>
			<div className="flex">
				{Object.values(TABS_ENUM).map((tab) => (
					<button
						key={tab}
						onClick={() => handleTabClick(tab)}
						className={`${
							activeTab === tab
								? 'border-indigo-500 text-indigo-600'
								: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
						} whitespace-nowrap border-b-2 px-5 pb-4 text-sm font-medium`}
					>
						{tab}
					</button>
				))}
			</div>
			{activeTab === TABS_ENUM.MARKERS && <MarkerList markers={markers} />}
			{activeTab === TABS_ENUM.CREATED_ROUTES && (
				<CreatedRoutesList markers={markers} />
			)}
			{activeTab === TABS_ENUM.SELECTION && (
				<SelectedMarkersList
					markers={selectedMarkers}
					assignDriverOnClick={assignDriverOnClick}
					clearSelectedMarkersOnClick={clearSelectedMarkersOnClick}
				/>
			)}
		</>
	);
}
