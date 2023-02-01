import React, { useEffect, useState } from 'react';
import { banner, projectInfo } from '../constants';
import Project from './Project';
import TypedText from './TypedText';

const Console: React.FC = () => {
  const [history, setHistory] = useState<string[]>(JSON.parse(localStorage.getItem('history') || '[]'));
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
    window.scrollTo(0, document.body.scrollHeight);
  }, [history]);

  interface Command {
    [key: string]: () => string | void;
  }

  interface CommandDescription {
    [key: string]: string;
  }

  const commandDescriptions: CommandDescription = {
    'help': 'Lista todos los comandos displonibles(Ya se habra dado cuenta)',
    'greet': 'Lo saluda',
    'quiensoy': 'Cuenta un poco sobre mi',
    'proyectos': 'Muestra mis proyectos',
    'contacto': 'Información de Contacto',
    'linkedin': 'Mi perfil de LinkedIn',
    'github': 'Mi perfil de GitHub',
    'estudios': 'Mis Estudios',
    'fecha': 'Le dice la fecha',
    'clear': 'Limpia la consola',
  };

  const getCommandDescriptions = () => {
    return Object.keys(commandDescriptions).map((command) => {
      return `${command} - ${commandDescriptions[command]}`;
    });
  };

  const commands: Command = {
    'help': () => `help`,
    'greet': () => 'Bienvenido a mi Portfolio Conceptual',
    'quiensoy': () => 'Soy Lucas Grasso Ramos, Estudiante de Ciencias de Datos y desarrollador de Software. Me especializo en desarollo de Blockchain y en Python. #Solidity #Python',
    'proyectos': () => 'proyectos',
    'estudios': () => 'Estudiante de Ciencias de Datos en la Universidad De Buenos Aires (UBA), Facultad de Ciencias Exactas y Naturales. Egresado de ORT TIC (Tecnologias de la Información y la Comunicacion) 2022.',
    'contacto': () => 'Puedes contactarme a traves de mi correo electronico: lucasgrassoramos@gmail.com',
    'linkedin': () => 'Mi perfil de Linkedin es: https://www.linkedin.com/in/lucas-grasso-ramos/',
    'github': () => 'Mi perfil de Github es: https://github.com/LucasGrasso',
    'fecha': () => new Date().toString(),
    'clear': () => setHistory([]),
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const command = input.split(' ')[0];
    setHistory([...history, command]);
    setInput('');
  };

  return (
    <div className="mx-auto p-20 font-mono text-center sm:text-left" id='divConsole'>
       <pre className="text-left font-mono">
        <p key="banner"> <span className="wrapped"><span className='text-green'>Lucas Grasso Ramos 0.0.1</span> - Made with <span className='text-blue'>React.js</span></span><span>{`\n ${banner} \n`}</span>type <span className='text-command'>"help"</span> for a list of commands</p>
        {history.map((command : string, i : number) => {
          switch (command) {
            case "proyectos":
              return (
                <div>
                <TypedText text={"C:\\Users\\Guest>proyectos"}/>
                {
                  Object.keys(projectInfo).map((project, i) => {
                    return <Project key={i} name={project} />
                  })
                }
                </div>
              )
            case "help":
              return (
                <div>
                    <div className='row'>
                      <TypedText key={i} text={`C:\\Users\\Guest>`}/>
                      <TypedText key={i} text={` ${command}`} type="command"/>
                    </div>
                    {getCommandDescriptions().map((commandWithInfo : string, i : number) => {
                      return <TypedText key={i} text={commandWithInfo}/>
                    })
                    }
                  </div>
              )
            default:
              if(!commands[command]) {
                return(
                  <div>
                    <div className='row'>
                      <TypedText key={i} text={`C:\\Users\\Guest>`}/>
                      <TypedText key={i} text={` ${command}`} type="command"/>
                    </div>
                    <TypedText key={i} text={"Comando Desconocido"} type="error"/>
                  </div>
                )
              } else if(typeof commands[command]() === 'string') {
                return (
                  <div>
                    <div className='row'>
                      <TypedText key={i} text={`C:\\Users\\Guest>`}/>
                      <TypedText key={i} text={` ${command}`} type="command"/>
                    </div>
                    <TypedText key={i} text={commands[command]()}/>
                  </div>
                )
              } else if(typeof commands[command]() === 'function') {
                <div className='row'>
                    <TypedText key={i} text={`C:\\Users\\Guest>${command}`}/>
                    <TypedText key={i} text={` ${command}`} type="command"/>
                  </div>
              }
          }
        })}
      </pre>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-10">
          <span>C:\Users\Guest&gt;</span>
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
