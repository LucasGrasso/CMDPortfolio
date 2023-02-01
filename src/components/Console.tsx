import React, { useState } from 'react';
import { banner } from '../constants';
import TypedText from './TypedText';

const Console: React.FC = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState('');

  interface Command {
    [key: string]: () => string | JSX.Element | void;
  }

  interface CommandDescription {
    [key: string]: string;
  }

  const commandDescriptions: CommandDescription = {
    'help': 'Lista todos los comandos displonibles(Ya se habra dado cuenta)',
    'greet': 'Lo saluda',
    'quiensoy': 'Cuenta un poco sobre mi',
    'contacto': 'Información de Contacto',
    'linkedin': 'Mi perfil de LinkedIn',
    'github': 'Mi perfil de GitHub',
    'estudios': 'Mis Estudios',
    'fecha': 'Le dice la fecha',
    'gato': 'Un gato',
    'clear': 'Limpia la consola, menos el banner',
  };

  const getCommandDescriptions = () => {
    return Object.keys(commandDescriptions).map((command) => {
      return `${command} - ${commandDescriptions[command]}`;
    });
  };

  const commands: Command = {
    'help': () => `Comandos Disponibles:\n${getCommandDescriptions().join('\n')}`,
    'greet': () => 'Bienvenido a mi Portfolio Conceptual',
    'quiensoy': () => 'Soy Lucas Grasso Ramos, Estudiante de Ciencias de Datos y desarrollador de Software. Me especializo en desarollo de Blockchain y en Python. #Solidity #Python',
    'estudios': () => 'Estudiante de Ciencias de Datos en la Universidad De Buenos Aires (UBA), Facultad de Ciencias Exactas y Naturales. Egresado de ORT TIC (Tecnologias de la Información y la Comunicacion) 2022.',
    'contacto': () => 'Puedes contactarme a traves de mi correo electronico: lucasgrassoramos@gmail.com',
    'linkedin': () => 'Mi perfil de Linkedin es: https://www.linkedin.com/in/lucas-grasso-ramos/',
    'github': () => 'Mi perfil de Github es: https://github.com/LucasGrasso',
    'fecha': () => new Date().toString(),
    'gato': () => "gato",
    'clear': () => setHistory([]),
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const command = input.split(' ')[0];
    const result = commands[command] ? commands[command]() : 'Unknown command';
    console.log(result);
    if(result === "gato") {
      setHistory([...history, "gato"]);
    }
    else if(typeof result === 'string') {
      setHistory([...history, `C:\\Users\\Visitor> ${input}\n${result}`]);
    }
    setInput('');
  };

  return (
    <div className="mx-auto p-20 font-mono text-left">
       <pre className="text-left font-mono">
        <p key="banner">{`Lucas Grasso Ramos 0.0.1 \n ${banner} \n type "help" for a list of commands`}</p>
        {history.map((entry, i) => (
          <p key={i}>{entry == "gato" ? (
          <div>
            <TypedText text={"C:\\Users\\Visitor>"}/>
            <img src='https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg'/>
          </div>
          ) : 
          (
            <TypedText text={entry}/>
          )}</p>
        ))}
      </pre>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-10">
          <span>C:\Users\Visitor&gt;</span>
          <input
            autoFocus
            className="ml-10 flex-grow-1 p-2"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ outline: 'style-none' }}
          />
        </div>
      </form>
    </div>
  );
};

export default Console;
