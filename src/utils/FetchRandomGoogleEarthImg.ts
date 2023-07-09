import { ImageData } from "../types/ImageData";
import { photoIds } from "./constants";

async function FetchRandomGoogleEarthImg(): Promise<ImageData> {
	const randomPhotoId = photoIds[Math.floor(Math.random() * photoIds.length)];
	const response = await fetch(`https://www.gstatic.com/prettyearth/assets/data/v3/${randomPhotoId}.json`);
	const data = await response.json();
	return data;
}

export default FetchRandomGoogleEarthImg;