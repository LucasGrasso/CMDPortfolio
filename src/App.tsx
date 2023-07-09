import { useEffect, useState } from "react";
import Console from "./components/Console";
import { ImageData } from "./types/ImageData";
import FetchRandomGoogleEarthImg from "./utils/FetchRandomGoogleEarthImg";

function App() {
	const [imageData, setImageData] = useState<ImageData | undefined>(undefined);

	useEffect(() => {
		if (imageData) return;
		FetchRandomGoogleEarthImg()
			.then(res => {
				setImageData(res);
			})
			.catch(err => console.log(err));
	}, [imageData]);

	useEffect(() => {
		if (!imageData) return;
		document.body.style.backgroundImage = `url(${imageData?.dataUri})`;
	}, [imageData]);

	return (
		<>
			<div className="attributions">
				<div id="attribution">
					{imageData?.attribution}
				</div>
				<div id="googleEarthView">
					All credits go to their respective authors and to <a href="https://earthview.withgoogle.com/" target="_blank" rel="noopener noreferrer" className="text-link">Google Earth View</a>
				</div>
			</div>
			<div style={{ padding: '1rem' }}>
				<Console />
			</div>
		</>
	);
}

export default App
