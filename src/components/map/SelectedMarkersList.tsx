import { Button } from '../shared/Button';

import { MARKER_ENUM, MarkerType } from '@/interfaces/map/Marker';

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
		<div
			className="flex flex-1 items-center flex-col max-h-[720px] justify-between"
			data-test="selected-markers-list"
		>
			<ul role="list" className="divide-y divide-gray-100">
				{markers.map((marker, idx) => (
					<li
						data-test={`selected-item-${marker.name}`}
						key={idx}
						className="flex items-center justify-between gap-x-6 py-5"
					>
						<div className="flex min-w-0 gap-x-4">
							<div className="min-w-0 flex-auto">
								<p
									className="text-sm font-semibold leading-6 text-gray-900"
									data-test="selected-item-name"
								>
									{marker.name}
								</p>
								<p
									className="text-sm font-semibold leading-6 text-gray-900"
									data-test="selected-item-location"
								>
									{marker.latitude}, {marker.longitude}
								</p>
								<p
									className="mt-1 truncate text-xs leading-5 text-gray-500"
									data-test="selected-item-size"
								>
									{marker.size || MARKER_ENUM.MEDIUM}
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
