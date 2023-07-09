const banner: string = `
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠟⠛⠛⠻⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⠿⢋⣁⣤⣴⣶⣶⣾⣷⣶⣶⣦⣤⣈⡙⠻⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⡿⠋⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠙⢿⣿⣿⣿⣿
⣿⣿⣿⠟⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⢿⣷⣄⠻⣿⣿⣿
⣿⣿⠏⣰⣿⡿⠋⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠙⢿⣆⠹⣿⣿
⣿⡏⢠⡿⠋⠀⠀⠀⠈⢻⣿⣿⣿⡿⠋⠈⠻⣿⠟⢀⣠⢀⣄⡀⢠⣄⠙⠄⢹⣿
⣿⠁⠈⢀⡠⠀⣠⠀⣷⣦⡙⠿⠋⠀⠀⠀⠀⠀⠐⢿⣿⣿⣿⣿⣷⣿⣷⣄⠈⣿⣿
⣿⠀⣴⣿⣣⣾⣿⣷⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⠀⣿⣿
⣿⡀⢻⣿⣿⣿⣿⣿⠟⠁⢀⠀⠀⡀⢠⡀⠘⣦⠀⣶⣄⡀⠙⢿⣿⣿⣿⡟⠀⣿
⣿⣇⠘⣿⣿⣿⠟⢁⣴⣾⡟⢠⣾⣷⣿⣷⡄⢻⣷⣿⣿⣿⣶⣄⠙⣿⣿⠇⣸⣿
⣿⣿⣆⢹⠟⢁⣴⣿⣿⣿⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣌⠋⢠⣿⣿
⣿⣿⣿⣆⠠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⣰⣿⣿⣿
⣿⣿⣿⣿⣷⣌⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⣡⣾⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣷⣦⣉⠛⠻⠿⢿⣿⣿⣿⣿⡿⠿⠟⠛⣉⣴⣾⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣤⣤⣤⣤⣤⣤⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿                           
`;

interface projectInformation {
	[key: string]: {
		description: string;
		role: string;
		url: string;
	};
}

const projectsInfo: projectInformation = {
	"Zerti": {
		"description": "Zerti is a Web3 project whose main objective is to ensure the validity and trust of certifications based on the immutability and transparency of blockchain technology.",
		"role": "Co-founder, CEO, Blockchain & Full-Stack Developer, UI/UX Designer",
		"url": "https://zerti.com.ar/",
	},
	"ERC-5516": {
		"description": "An interface for non-transferrable, Multi-owned NFTs binding to Ethereum accounts.",
		"role": "Blockchain Developer",
		"url": "https://eips.ethereum.org/EIPS/eip-5516",
	},
	"Stringless": {
		"description": "Finalist of the INNOVAR 2021 & 2022 competition. Bass based on lasers and buttons. INNOVAR finalist under the category Innovative Product.",
		"role": "Hardware and Software Developer",
		"url": "https://github.com/LucasGrasso/Stringless"
	},
	"Snake": {
		"description": "Snake game made in React.js",
		"role": "Front-end developer, UI/UX Designer",
		"url": "https://snake.lucasgrasso.com.ar/",
	},
	"Orthix": {
		"description": "Finalist of the INNOVAR 2021 in the Secondary Schools category. Orthix is the union between the worlds of solidarity, AI, 3D printing, and orthopedics.",
		"role": "Full-Stack developer, UI/UX Designer",
		"url": "https://orthix.netlify.app/",
	}
}

const getErrorMsg = (command: string) => {
	return `${command}: The term '${command}' is not recognized as a name of a cmdlet, function, script file, or executable program.
			Check the spelling of the name, or if a path was included, verify that the path is correct and try again.`;
}


export { banner, getErrorMsg, projectsInfo };

