export interface ImageData {
	id: string;
	lat: number;
	lng: number;
	zoom: number;
	geocode: Geocode;
	attribution: string;
	bounds: number[];
	dataUri: string;
	elevation: number;
}

export interface Geocode {
	street_number: string;
	route: string;
	locality: string;
	administrative_area_level_1: string;
	country: string;
	postal_code: string;
}
