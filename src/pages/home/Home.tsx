import { useHome } from './useHome';

import Map from '@/components/map';
import { AssignDriverForm } from '@/components/map/AssignDriverForm';
import { CreateMarkerForm } from '@/components/map/CreateMarkerForm';
import { Button } from '@/components/shared/Button';
import CustomModal from '@/components/shared/Modal';
import { MODAL_ENUM } from '@/interfaces/map/Marker';

import MarkerListSection from '@components/map/MarkerListSection';

export default function Home() {
	const {
		currentModelOpen,
		handleAddMarker,
		handleAddMarkerButtonOnClick,
		handleAssignDriver,
		handleClearSelectedMarkers,
		handleCloseSidePannel,
		handleOpenAssignDriverModel,
		handleSelectMarker,
		markers,
		selectedMarkers,
		currentMarker,
		handleRemoveCurrentMarker,
		handleRemoveSelectedMarker,
		handleAddCurrentMarker,
	} = useHome();

	return (
		<div className="flex  justify-evenly h-screen mt-5">
			<div className="flex flex-col">
				<MarkerListSection
					markers={markers}
					selectedMarkers={selectedMarkers}
					assignDriverOnClick={handleOpenAssignDriverModel}
					clearSelectedMarkersOnClick={handleClearSelectedMarkers}
				></MarkerListSection>
			</div>
			<div className="flex">
				<div className="flex flex-col">
					<Button
						text="Agregar marcador"
						onClick={handleAddMarkerButtonOnClick}
					/>
					<Map
						markers={markers}
						currentMarker={currentMarker}
						infoWindowOnClose={handleRemoveCurrentMarker}
						markerOnClick={handleAddCurrentMarker}
						infoWindowOnClick={() => {
							currentMarker
								? selectedMarkers.includes(currentMarker)
									? handleRemoveSelectedMarker(currentMarker.name)
									: handleSelectMarker(currentMarker.name)
								: () => {
										console.log('no marker');
								  };
						}}
						infoWindowButtonText={
							currentMarker
								? selectedMarkers.includes(currentMarker)
									? 'deseleccionar'
									: 'seleccionar'
								: 'seleccionar'
						}
					></Map>

					<CustomModal
						isOpen={Boolean(currentModelOpen)}
						onClose={handleCloseSidePannel}
					>
						{currentModelOpen === MODAL_ENUM.CREATE_MARKER && (
							<CreateMarkerForm onClickButton={handleAddMarker} />
						)}
						{currentModelOpen === MODAL_ENUM.ASSIGN_DRIVER && (
							<AssignDriverForm onClickButton={handleAssignDriver} />
						)}
					</CustomModal>
				</div>
			</div>
		</div>
	);
}
