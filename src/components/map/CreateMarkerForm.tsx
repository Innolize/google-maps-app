import { DialogTitle } from '@headlessui/react';
import { useState } from 'react';

import { MARKER_ENUM, MarkerType } from '@/interfaces/map/Marker';

type CreateMarkerFormProps = {
	onClickButton: (newMarker: MarkerType) => void;
};

export const CreateMarkerForm = ({ onClickButton }: CreateMarkerFormProps) => {
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);
	const [markerType, setMarkerType] = useState<MARKER_ENUM>(MARKER_ENUM.LARGE);
	const [name, setName] = useState('');

	return (
		<div>
			<div>
				<div className="mt-3 text-center sm:mt-5">
					<DialogTitle
						as="h3"
						className="text-base font-semibold leading-6 text-gray-900"
					>
						Ingresa una dirección
					</DialogTitle>
					<div className="mt-2">
						<input
							type="number"
							name="latitude"
							id="latitude-input"
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							placeholder="-2335.2434"
							onChange={(e) => setLatitude(Number(e.target.value))}
						/>
					</div>
					<div className="mt-2">
						<input
							type="number"
							name="longitude"
							id="longitude-input"
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							placeholder="-2335.2434"
							onChange={(e) => setLongitude(Number(e.target.value))}
						/>
					</div>

					<div className="mt-2">
						<input
							type="text"
							name="name"
							id="name-input"
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							placeholder="marcador #1"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="mt-2">
						<select
							id="location"
							name="location"
							className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
							onChange={(e) => {
								setMarkerType(e.target.value as MARKER_ENUM);
							}}
						>
							<option value={MARKER_ENUM.LARGE}>Grande</option>
							<option value={MARKER_ENUM.MEDIUM}>Mediano</option>
							<option value={MARKER_ENUM.SMALL}>Chico</option>
						</select>
					</div>
				</div>
			</div>
			<div className="mt-5 sm:mt-6">
				<button
					type="button"
					className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					onClick={() => {
						onClickButton({
							lat: latitude,
							lng: longitude,
							type: markerType,
							name,
						});
					}}
				>
					Agregar marcador
				</button>
			</div>
		</div>
	);
};
