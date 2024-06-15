import { useState } from 'react';

import Map from '@/components/map';
import SidePannel from '@/components/map/MarkerModal';
import { Button } from '@/components/shared/Button';
import { MarkerType } from '@/interfaces/map/Marker';

export default function Home() {
	const [markers, setMarkers] = useState<MarkerType[]>([]);
	const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

	const handleAddMarkerButtonOnClick = () => {
		setIsSidePanelOpen(true);
	};

	const handleAddMarker = (newMarker: MarkerType) => {
		console.log(newMarker);
		setMarkers([...markers, newMarker]);
	};

	const handleCloseSidePannel = () => {
		setIsSidePanelOpen(false);
	};

	return (
		<div className="flex items-center justify-center h-screen flex-col">
			{/* data-test? https://docs.cypress.io/guides/references/best-practices */}
			<h1 className="text-3xl font-bold underline" data-test="home-msg">
				<Button
					text="Agregar marcador"
					onClick={handleAddMarkerButtonOnClick}
				/>
				<Map markers={markers} />
				<SidePannel
					isOpen={isSidePanelOpen}
					onClose={handleCloseSidePannel}
					onClickButton={handleAddMarker}
				></SidePannel>
			</h1>
		</div>
	);
}
