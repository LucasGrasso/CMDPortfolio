
interface Command {
	[key: string]: () => string;
}

interface CommandDescription {
	[key: string]: string;
}

const commandDescriptions: CommandDescription = {
	'help': 'Lists all the available commands.',
	'info': 'Tells a little about myself.',
	'projects': 'Shows my projects.',
	'contact': 'Contact Information.',
	'linkedin': 'My LinkedIn profile.',
	'github': 'My GitHub profile.',
	'studies': 'My Studies.',
	'snake': 'Snake game.',
	'date': 'Tells the date.',
	'clear': 'Clears the console.',
	'repo': 'Repository of this project.',
	'ls': 'Lists the files in the current directory.'
};

const commands: Command = {
	'help': () => `help`,
	'info': () => 'I am Lucas Grasso Ramos, a Data Science student and software developer. Since I was young, I have been fascinated by natural sciences and technology, and nowadays I try to channel that passion through programming. I specialize in Solidity, TypeScript and Python, but Im interested in all exponential technologies, especially everything related to Blockchain and AI.',
	'projects': () => 'projects',
	'studies': () => 'Data Science student at Universidad De Buenos Aires (UBA), Faculty of Exact and Natural Sciences. Graduated from ORT TIC (Information and Communication Technologies) in 2022.',
	'contact': () => 'Let\'s stay in touch! My email address is lucasgrassoramos@gmail.com',
	'linkedin': () => 'My Linkedin profile: https://www.linkedin.com/in/lucas-grasso-ramos/',
	'github': () => 'My Github profile: https://github.com/LucasGrasso',
	'date': () => new Date().toString(),
	'snake': () => 'snake',
	'clear': () => 'clear',
	'repo': () => 'Link to github repo: https://github.com/LucasGrasso/CMDPortfolio',
};

const getCommandDescriptions = () => {
	return Object.keys(commandDescriptions).map((command) => {
		return `${command} - ${commandDescriptions[command]}`;
	});
};

export { commandDescriptions, commands, getCommandDescriptions };

