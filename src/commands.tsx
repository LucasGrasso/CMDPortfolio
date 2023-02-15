
interface Command {
    [key: string]: () => string;
}

interface CommandDescription {
    [key: string]: string;
}

const commandDescriptions: CommandDescription = {
    'help': 'Lista los comandos disponibles.',
    /* 'greet': 'Lo saluda.', */
    'info': 'Cuenta un poco sobre mi.',
    'proyectos': 'Muestra mis proyectos.',
    'contacto': 'Información de Contacto.',
    'linkedin': 'Mi perfil de LinkedIn.',
    'github': 'Mi perfil de GitHub.',
    'estudios': 'Mis Estudios.',
    'date': 'Le dice la fecha.',
    'clear': 'Limpia la consola.',
    'repo': 'Repositorio de este proyecto.',
};

const commands: Command = {
    'help': () => `help`,
    /* 'greet': () => 'Bienvenido a mi Portfolio Conceptual.', */
    'info': () => 'Soy Lucas Grasso Ramos, Estudiante de Ciencias de Datos y desarrollador de Software. Desde pequeño fui atraído por las ciencias naturales y la tecnología, y hoy en día trato de canalizar esa pasión con la programación. Soy un desarrollador especializado en Solidity y Python, pero interesado por todas las tecnologías exponenciales, especialmente todo lo relacionado a Blockchain e IA.',
    'proyectos': () => 'proyectos',
    'estudios': () => 'Estudiante de Ciencias de Datos en la Universidad De Buenos Aires (UBA), Facultad de Ciencias Exactas y Naturales. Egresado de ORT TIC (Tecnologias de la Información y la Comunicacion) 2022.',
    'contacto': () => 'Sigamos en contacto! Mi correo electronico es lucasgrassoramos@gmail.com',
    'linkedin': () => 'Mi perfil de Linkedin es: https://www.linkedin.com/in/lucas-grasso-ramos/',
    'github': () => 'Mi perfil de Github es: https://github.com/LucasGrasso',
    'date': () => new Date().toString(),
    'clear': () => 'clear',
    'repo': () => 'Link al repositorio de github: https://github.com/LucasGrasso/CMDPortfolio',
};

const getCommandDescriptions = () => {
    return Object.keys(commandDescriptions).map((command) => {
        return `${command} - ${commandDescriptions[command]}`;
    });
};

export { commands, commandDescriptions, getCommandDescriptions };

