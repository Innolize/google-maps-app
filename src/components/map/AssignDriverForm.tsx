import { DialogTitle } from '@headlessui/react';
import { useState } from 'react';

type AssignDriverFormProps = {
	onClickButton: (driverName: string) => void;
};

export const AssignDriverForm = ({ onClickButton }: AssignDriverFormProps) => {
	const [driver, setDriver] = useState('');

	return (
		<div data-test="assign-driver-form">
			<div className="mt-3 text-center sm:mt-5">
				<DialogTitle
					as="h3"
					className="text-base font-semibold leading-6 text-gray-900"
				>
					Ingresa el nombre del conductor:
				</DialogTitle>
				<div className="mt-2">
					<input
						type="text"
						name="latitude"
						id="driver-input"
						data-test="driver-input"
						className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						placeholder="nombre de conductor"
						onChange={(e) => setDriver(e.target.value)}
					/>
				</div>

				<div className="mt-5 sm:mt-6">
					<button
						type="button"
						data-test="assign-button"
						className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						onClick={() => {
							onClickButton(driver);
						}}
					>
						Asignar
					</button>
				</div>
			</div>
		</div>
	);
};
