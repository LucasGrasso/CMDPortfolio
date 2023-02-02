import React, { useEffect, useRef, useState } from 'react';
import { banner, projectInfo } from '../constants';
import { handleLinkClick } from '../Utils';
import Project from './Project';
import TypedText from './TypedText';

const Console: React.FC = () => {
  const [history, setHistory] = useState<string[]>(JSON.parse(localStorage.getItem('history') || '[]'));
  const [input, setInput] = useState('');
  const [count, setCount] = useState(0);
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
    window.scrollTo(0, document.body.scrollHeight);
    setCount(0)
  }, [history]);

  const handleKeydown = (e : any) => {
    const key = e.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    console.log(e);
    if (key === "ArrowUp") {
      if(count+1 > history.length) return;
      setInput(history[history.length - (count + 1)]);
      setCount(count + 1);
    } else if (key === "ArrowDown") {
      if(count-1 < 0) return;
      setInput(history[history.length - (count - 1)]);
      setCount(count - 1);
    } else {
      inputElement.current?.focus();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    }
  }, [count, inputElement]);
  
  interface Command {
    [key: string]: () => string;
  }

  interface CommandDescription {
    [key: string]: string;
  }

  const commandDescriptions: CommandDescription = {
    'help': 'Lista los comandos displonibles',
    'greet': 'Lo saluda',
    'quiensoy': 'Cuenta un poco sobre mi',
    'proyectos': 'Muestra mis proyectos',
    'contacto': 'Información de Contacto',
    'linkedin': 'Mi perfil de LinkedIn',
    'github': 'Mi perfil de GitHub',
    'estudios': 'Mis Estudios',
    'fecha': 'Le dice la fecha',
    'clear': 'Limpia la consola',
    'repo' : 'Repositorio de este proyecto',
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
    'clear': () => {setHistory([]); return "" },
    'repo': () => 'Link al repositorio de github: https://github.com/LucasGrasso/CMDPortfolio',
  };

  const getCommandDescriptions = () => {
    return Object.keys(commandDescriptions).map((command) => {
      return `${command} - ${commandDescriptions[command]}`;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if(!input) return;
    e.preventDefault();
    const command = input.split(' ')[0];
    setHistory([...history, command]);
    setInput('');
  };

  return (
    <div className="mx-auto p-20 font-mono text-center sm:text-left" id='divConsole'>
       <pre className="text-left font-mono">
        <p key="banner"> <span className="wrapped"><span className='text-green'>Lucas Grasso Ramos 1.0.0</span> - Made with <span className='text-blue'>React.js</span></span><span>{`\n ${banner} \n`}</span>type <span className='text-command'>"help"</span> for a list of commands</p>
        {history.map((command : string, i : number) => {
          switch (command) {
            case "proyectos":
              return (
                <div>
                  <span>C:\Users\Guest&gt; <span className='text-command'>{command}</span></span>
                  <div className='project-container'>
                    {
                      Object.keys(projectInfo).map((project, i) => {
                        return <Project key={i} name={project} />
                      })
                    }
                  </div>
                </div>
              )
            case "help":
              return (
                <div>
                  <span>C:\Users\Guest&gt; <span className='text-command'>{command}</span></span>
                  <div className='help-container'>
                    {getCommandDescriptions().map((commandWithInfo : string, i : number) => {
                      const commandName = commandWithInfo.split(' - ')[0];
                      return (
                        <div className='row'>
                          <TypedText key={i} text={`${commandName} `} type="command"/>
                          <TypedText key={i} text={` -> ${commandDescriptions[commandName]}`}/>
                        </div>
                      )})
                    }
                  </div>
                </div>
              )
            default:
              if(!commands[command]) {
                return(
                  <div>
                    <span>C:\Users\Guest&gt; <span className='text-command'>{command}</span></span>
                    <TypedText key={i} text={"Comando Desconocido"} type="error"/>
                  </div>
                )
              } else if(typeof commands[command]() === 'string') {
                const regex = /https?:\/\/[^\s]+/g;
                const resultText : string = commands[command]();
                const regexMatches = resultText.match(regex);
                if(regexMatches) {
                  const link = regexMatches[0]
                  return (
                    <div>
                      <span>C:\Users\Guest&gt; <span className='text-command'>{command}</span></span>
                      <TypedText key={i} text={resultText.split(link)[0]}/>
                      <div onClick={() => handleLinkClick(link)} className="hoverable-div">
                        <TypedText key={i} text={link} type="link"/>
                      </div>
                    </div>
                  )
                }
                else {
                  return (
                    <div>
                      <span>C:\Users\Guest&gt; <span className='text-command'>{command}</span></span>
                      <TypedText key={i} text={resultText}/>
                    </div>
                  )
                }
              } else if(typeof commands[command]() === 'function') {
                return (
                  <span>C:\Users\Guest&gt; <span className='text-command'>{command}</span></span>
                )
              }
          }
        })}
      </pre>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-10 row">
          <span>C:\Users\Guest&gt;</span>
          <input
            autoFocus
            className="ml-10 flex-grow-1 p-2 text-input-command"
            ref={inputElement}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default Console;
