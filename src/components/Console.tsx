import React, { useEffect, useRef, useState } from 'react';
import { commandDescriptions, commands, getCommandDescriptions } from '../commands';
import { banner, getErrorMsg, projectInfo } from '../constants';
import { handleLinkClick } from '../Utils';
import ExecutedCommandText from './ExecutedCommandText';
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

  useEffect(() => {
    commands['clear'] = () => { setHistory([]); return "" };
  }, []);

  const handleKeydown = (e: any) => {
    const key = e.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    console.log(e);
    if (key === "ArrowUp") {
      e.view.event.preventDefault();
      if (count + 1 > history.length) return;
      setInput(history[history.length - (count + 1)]);
      setCount(count + 1);
    } else if (key === "ArrowDown") {
      e.view.event.preventDefault();
      if (count - 1 < 0) return;
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
                <div>
                  <ExecutedCommandText text={command} type="command" />
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
                  <ExecutedCommandText text={command} type="command" />
                  <div className='help-container'>
                    {getCommandDescriptions().map((commandWithInfo: string, i: number) => {
                      const commandName = commandWithInfo.split(' - ')[0];
                      return (
                        <div className='row'>
                          <TypedText key={i} text={`${commandName} `} type="command" />
                          <TypedText key={i} text={` -> ${commandDescriptions[commandName]}`} />
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
                  <div>
                    <ExecutedCommandText text={command} type="command" />
                    <TypedText key={i} text={errorMsg} type="error" speed={85} />
                  </div>
                )
              } else if (typeof commands[command]() === 'string') {
                const regex = /https?:\/\/[^\s]+/g;
                const resultText: string = commands[command]();
                const regexMatches = resultText.match(regex);
                if (regexMatches) {
                  const link = regexMatches[0]
                  return (
                    <div>
                      <ExecutedCommandText text={command} type="command" />
                      <TypedText key={i} text={resultText.split(link)[0]} />
                      <div onClick={() => handleLinkClick(link)} className="hoverable-div">
                        <TypedText key={i} text={link} type="link" />
                      </div>
                    </div>
                  )
                }
                else {
                  return (
                    <div>
                      <ExecutedCommandText text={command} type="command" />
                      {resultText.length > 250 ? (
                        <TypedText key={i} text={resultText} speed={80} />
                      ) : (
                        <TypedText key={i} text={resultText} />
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
        <div className="flex items-center mb-10 row">
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
