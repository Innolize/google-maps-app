describe('Home', () => {
	const INITIAL_MARKER = {
		LATITUDE: -34.5539086701257,
		LONGITUDE: -58.468607286912686,
		NAME: 'test marker',
		SIZE: 'Chico',
	};

	beforeEach(() => {
		createInitialMarkers();
	});

	const createInitialMarkers = () => {
		cy.visit('/');
		cy.contains('Agregar marcador').click();
		cy.get('[data-test="create-marker-form"]').should('be.visible').click();
		cy.get('[data-test="latitude-input"]').type(
			INITIAL_MARKER.LATITUDE.toString(),
		);
		cy.get('[data-test="longitude-input"]').type(
			INITIAL_MARKER.LONGITUDE.toString(),
		);
		cy.get('[data-test="name-input"]').type(INITIAL_MARKER.NAME);
		cy.get('[data-test="package-size-select"]').select(INITIAL_MARKER.SIZE);
		cy.get('[data-test="submit-marker-button"]').click();

		cy.get('[data-test="create-marker-form"]').should('not.exist');
	};

	it('Should render marker in "Marcadores" tab', () => {
		cy.contains('Marcadores').click();
		cy.get('[data-test="marker-list"]').should('be.visible');
		cy.get(`[data-test="item-${INITIAL_MARKER.NAME}"`);
	});

	it('Should be rendered in map', () => {
		cy.get(`[title="${INITIAL_MARKER.NAME}"]`).should('exist');
	});

	it('Should select a marker and show it in "Seleccionadas" tab', () => {
		cy.get(`[title="${INITIAL_MARKER.NAME}"]`).click();
		cy.get('[data-test="info-window-container"]').as('info-window-container');
		cy.get('@info-window-container').contains('seleccionar').should('exist');
		cy.get('[data-test="info-window-button"]').click();
		cy.get('@info-window-container').contains('deseleccionar').should('exist');
		cy.get(`[data-test="selected-item-${INITIAL_MARKER.NAME}"]`).as(
			'selectedItem',
		);
		cy.get('@selectedItem').contains(INITIAL_MARKER.NAME);
	});

	it('Should remove marker from "Marcadores" tab', () => {
		cy.get(`[title="${INITIAL_MARKER.NAME}"]`).click();
		cy.get('[data-test="info-window-container"]').as('info-window-container');
		cy.get('@info-window-container').contains('seleccionar').should('exist');
		cy.get('[data-test="info-window-button"]').click();
		cy.get('[data-test="selected-markers-list"]').as('selectedMarkersList');
		cy.get(`[data-test="selected-item-${INITIAL_MARKER.NAME}"]`).should(
			'exist',
		);
		cy.get('@selectedMarkersList').contains('Deseleccionar todos').click();
		cy.get(`[data-test="selected-item-${INITIAL_MARKER.NAME}"]`).should(
			'not.exist',
		);
	});

	it('Should asssign a driver to selected marker', () => {
		cy.get(`[title="${INITIAL_MARKER.NAME}"]`).as('initialMarker');
		cy.get('@initialMarker').click();
		cy.get('[data-test="info-window-container"]').as('info-window-container');
		cy.get('@info-window-container').contains('seleccionar').should('exist');
		cy.get('[data-test="info-window-button"]').click();
		cy.get('[data-test="selected-markers-list"]').as('selectedMarkersList');
		cy.get('@selectedMarkersList').contains('Asignar a conductor').click();
		cy.get('[data-test="assign-driver-form"]').as('assignDriverForm');
		cy.get('@assignDriverForm').should('be.visible');
		cy.get('@assignDriverForm')
			.get('[data-test="driver-input"]')
			.type('John Doe');
		cy.get('@assignDriverForm').get('[data-test="assign-button"]').click();
		cy.get('@assignDriverForm').should('not.exist');
		cy.get('@initialMarker').click();
		cy.contains('Asignado a: John Doe');
	});
});
