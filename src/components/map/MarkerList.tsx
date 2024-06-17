import { useState } from 'react';

import { Button } from '../shared/Button';

import { MARKER_ENUM, MarkerType } from '@/interfaces/map/Marker';

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

export const MarkerList = ({ markers }: { markers: MarkerType[] }) => {
	return (
		<div className="flex flex-1 items-center flex-col">
			<ul role="list" className="divide-y divide-gray-100 min-h-[300px]">
				{markers.map((marker, idx) => (
					<li
						key={idx}
						className="flex items-center justify-between gap-x-6 py-5"
					>
						<div className="flex min-w-0 gap-x-4">
							<div className="min-w-0 flex-auto">
								<p className="text-sm font-semibold leading-6 text-gray-900">
									{marker.name}
								</p>
								<p className="text-sm font-semibold leading-6 text-gray-900">
									{marker.lat}, {marker.lng}
								</p>
								<p className="mt-1 truncate text-xs leading-5 text-gray-500">
									{marker.type || MARKER_ENUM.MEDIUM}
								</p>
							</div>
						</div>
						<Button key={idx} text="ver" />
					</li>
				))}
			</ul>
		</div>
	);
};

export const SelectedMarkersList = ({
	markers,
	assignDriverOnClick,
	clearSelectedMarkersOnClick,
}: {
	markers: MarkerType[];
	assignDriverOnClick: (driver: string) => void;
	clearSelectedMarkersOnClick: () => void;
}) => {
	return (
		<div className="flex flex-1 items-center flex-col max-h-[720px] justify-between ">
			<ul role="list" className="divide-y divide-gray-100">
				{markers.map((marker, idx) => (
					<li
						key={idx}
						className="flex items-center justify-between gap-x-6 py-5"
					>
						<div className="flex min-w-0 gap-x-4">
							<div className="min-w-0 flex-auto">
								<p className="text-sm font-semibold leading-6 text-gray-900">
									{marker.name}
								</p>
								<p className="text-sm font-semibold leading-6 text-gray-900">
									{marker.lat}, {marker.lng}
								</p>
								<p className="mt-1 truncate text-xs leading-5 text-gray-500">
									{marker.type || MARKER_ENUM.MEDIUM}
								</p>
							</div>
						</div>
						<Button key={idx} text="ver" />
					</li>
				))}
			</ul>
			<div>
				<div className="mt-2">
					<Button
						text="Deseleccionar todos"
						onClick={clearSelectedMarkersOnClick}
					/>
				</div>

				<div className="mt-2">
					<Button text="Asignar a conductor" onClick={assignDriverOnClick} />
				</div>
			</div>
		</div>
	);
};

export const CreatedRoutesList = ({ markers }: { markers: MarkerType[] }) => {
	const createdRoutes = markers.filter((marker) => marker.asignee);
	return (
		<div className="flex flex-1 items-center flex-col">
			<ul role="list" className="divide-y divide-gray-100 min-h-[300px]">
				{createdRoutes.map((marker, idx) => (
					<li
						key={idx}
						className="flex items-center justify-between gap-x-6 py-5"
					>
						<div className="flex min-w-0 gap-x-4">
							<div className="min-w-0 flex-auto">
								<p className="text-sm font-semibold leading-6 text-gray-900">
									{marker.name}
								</p>
								<p className="text-sm font-semibold leading-6 text-gray-900">
									{marker.lat}, {marker.lng}
								</p>
								<p className="mt-1 truncate text-xs leading-5 text-gray-500">
									{marker.type || MARKER_ENUM.MEDIUM}
								</p>
							</div>
						</div>
						<Button key={idx} text="ver" />
					</li>
				))}
			</ul>
		</div>
	);
};
