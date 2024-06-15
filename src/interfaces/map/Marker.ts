export type MarkerType = {
	lat: number;
	lng: number;
	type?: MARKER_ENUM;
};

export enum MARKER_ENUM {
	LARGE = 'large',
	MEDIUM = 'medium',
	SMALL = 'small',
}
