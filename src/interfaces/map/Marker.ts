export type MarkerType = {
	name: string;
	latitude: number;
	longitude: number;
	size?: MARKER_ENUM;
	asignee?: string;
};

export enum MARKER_ENUM {
	LARGE = 'large',
	MEDIUM = 'medium',
	SMALL = 'small',
}

export enum MODAL_ENUM {
	CREATE_MARKER = 'createMarker',
	ASSIGN_DRIVER = 'assignDriver',
}
