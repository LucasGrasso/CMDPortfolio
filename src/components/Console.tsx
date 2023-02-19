import React, { useEffect, useRef, useState } from 'react';
import { commandDescriptions, commands, getCommandDescriptions } from '../utils/commands';
import { handleLinkClick } from '../utils/ConsoleUtils';
import { banner, getErrorMsg, projectInfo } from '../utils/constants';
import ExecutedCommandText from './ExecutedCommandText';
import Project from './Project';
import SnakeGame from './SnakeGame';
import TypedText from './TypedText';

const Console: React.FC = () => {
  const [history, setHistory] = useState<string[]>(JSON.parse(localStorage.getItem('history') || '[]').filter((i: string) => i !== 'snake'));
  const [input, setInput] = useState('');
  const [count, setCount] = useState(0);
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
    window.scrollTo(0, document.body.scrollHeight);
    setCount(0)
  }, [history]);

  useEffect(() => {
    commands['clear'] = () => { setHistory([]); return "" };
  }, []);

  const handleKeyDown = (e: any) => {
    const key = e.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    const arrowUpPressed: boolean = key === "ArrowUp"
    const arrowDownPressed: boolean = key === "ArrowDown"
    const arrowLeftPressed: boolean = key === "ArrowLeft"
    const arrowRightPressed: boolean = key === "ArrowRight"
    const enterPressed: boolean = key === "Enter"
    if (arrowUpPressed && document.activeElement === inputElement.current) {
      e.view.event.preventDefault();
      if (count + 1 > history.length) return;
      setInput(history[history.length - (count + 1)]);
      setCount(count + 1);
    } else if (arrowDownPressed && document.activeElement === inputElement.current) {
      e.view.event.preventDefault();
      if (count - 1 < 0) return;
      setInput(history[history.length - (count - 1)]);
      setCount(count - 1);
    } else if (!arrowDownPressed && !arrowUpPressed && !arrowLeftPressed && !arrowRightPressed && !enterPressed) {
      inputElement.current?.focus();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [count, inputElement]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!input) return;
    e.preventDefault();
    const command = input.split(' ')[0];
    setHistory([...history, command]);
    setInput('');
  };

  return (
    <div className="mx-auto p-20 font-mono text-center sm:text-left" id='divConsole'>
      <pre className="text-left font-mono">
        <p key="banner"> <span className="wrapped"><span className='text-green'>Lucas Grasso Ramos 1.0.0</span> - Made with <span className='text-blue'>React.js</span></span><span>{`\n ${banner} \n`}</span>type <span className='text-command'>"help"</span> for a list of commands</p>
        {history.map((command: string, i: number) => {
          switch (command) {
            case "proyectos":
              return (
                <div key={i}>
                  <ExecutedCommandText text={command} type="command" />
                  <div className='project-container'>
                    {
                      Object.keys(projectInfo).map((projectName: string, j: number) => {
                        return <Project key={`project.${j}`} name={projectName} />
                      })
                    }
                  </div>
                </div>
              )
            case 'snake':
              window.scrollTo(0, document.body.scrollHeight);
              if (window.innerWidth > 768) {
                inputElement.current?.blur();
              }
              return (
                <div key={i}>
                  <ExecutedCommandText text={command} type="command" />
                  <SnakeGame width={10} height={10} />
                </div>
              )
            case "help":
              return (
                <div key={i}>
                  <ExecutedCommandText key={`cmd.${i}`} text={command} type="command" />
                  <div className='help-container' key={`help.${i}`}>
                    {getCommandDescriptions().map((commandWithInfo: string, j: number) => {
                      const commandName = commandWithInfo.split(' - ')[0];
                      return (
                        <div className='flex-row' key={`cmd.${i}.${j}`}>
                          <TypedText key={`cmd.name.${i}.${j}`} text={`${commandName} `} type="command" />
                          <TypedText key={`cmd.description.${i}.${j}`} text={` -> ${commandDescriptions[commandName]}`} />
                        </div>
                      )
                    })
                    }
                  </div>
                </div>
              )
            default:
              if (!commands[command]) {
                const errorMsg = getErrorMsg(command);
                return (
                  <div key={i}>
                    <ExecutedCommandText text={command} type="command" />
                    <TypedText text={errorMsg} type="error" speed={85} />
                  </div>
                )
              } else if (typeof commands[command]() === 'string') {
                const regex = /https?:\/\/[^\s]+/g;
                const resultText: string = commands[command]();
                const regexMatches = resultText.match(regex);
                if (regexMatches) {
                  const link = regexMatches[0]
                  return (
                    <div key={i}>
                      <ExecutedCommandText text={command} type="command" />
                      <TypedText text={resultText.split(link)[0]} />
                      <div onClick={() => handleLinkClick(link)} className="hoverable-div">
                        <TypedText text={link} type="link" />
                      </div>
                    </div>
                  )
                }
                else {
                  return (
                    <div key={i}>
                      <ExecutedCommandText text={command} type="command" />
                      {resultText.length > 250 ? (
                        <TypedText text={resultText} speed={80} />
                      ) : (
                        <TypedText text={resultText} />
                      )
                      }
                    </div>
                  )
                }
              } else {
                return (
                  <span></span>
                )
              }
          }
        })}
      </pre>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-10 flex-row">
          <ExecutedCommandText type="default" />
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
