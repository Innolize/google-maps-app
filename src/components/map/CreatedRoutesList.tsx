import { Button } from '../shared/Button';

import { MARKER_ENUM, MarkerType } from '@/interfaces/map/Marker';

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
									{marker.latitude}, {marker.longitude}
								</p>
								<p className="mt-1 truncate text-xs leading-5 text-gray-500">
									{marker.size || MARKER_ENUM.MEDIUM}
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
