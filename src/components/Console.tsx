import React, { useEffect, useRef, useState } from 'react';
import { commandDescriptions, commands, getCommandDescriptions } from '../utils/commands';
import { handleLinkClick, HistoryCommand, SnakeInstances } from '../utils/ConsoleUtils';
import { banner, getErrorMsg, projectsInfo } from '../utils/constants';
import { files, getFormattedDirectories } from '../utils/files';
import scrollToWindowBottom from '../utils/scrollToBottom';
import ExecutedCommandText from './ExecutedCommandText';
import Project from './Project';
import SnakeGame from './SnakeGame';
import TypedText from './TypedText';

const Console: React.FC = () => {
  const [commandHistory, setCommandHistory] = useState<HistoryCommand[]>(JSON.parse(localStorage.getItem('history') || '[]').filter((i: HistoryCommand) => i.value !== 'snake'));
  const [input, setInput] = useState<string>('');
  const [commandHistoryCount, setCommandHistoryCount] = useState<number>(0);
  const inputElement = useRef<HTMLInputElement>(null);
  const [previousInputIsCommand, setPreviousInputIsCommand] = useState<boolean>(false);
  const [isSnakeActive, setIsSnakeActive] = useState<SnakeInstances>({});

  useEffect(() => {
    const newHistory = commandHistory.map(
      (command: HistoryCommand) => {
        return { value: command.value, shouldBeTyped: false }
      }
    )
    localStorage.setItem('history', JSON.stringify(newHistory));
    window.scrollTo(0, document.body.scrollHeight);
    setCommandHistoryCount(0)
  }, [commandHistory]);

  useEffect(() => {
    commands['clear'] = () => { setCommandHistory([]); return "" };
  }, []);


  useEffect(() => {
    if (Object.values(isSnakeActive).includes(true)) {
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.touchAction = 'auto';
    }
  }, [isSnakeActive]);

  const handleKeyDown = (e: any) => {
    const key = e.key;
    const arrowUpPressed: boolean = key === "ArrowUp"
    const arrowDownPressed: boolean = key === "ArrowDown"
    if (!Object.values(isSnakeActive).includes(true)) {
      if (arrowUpPressed && document.activeElement === inputElement.current) {
        e.view.event.preventDefault();
        if (commandHistoryCount + 1 > commandHistory.length) return;
        setPreviousInputIsCommand(true);
        setInput(commandHistory[commandHistory.length - (commandHistoryCount + 1)].value);
        setCommandHistoryCount(commandHistoryCount + 1);
      } else if (arrowDownPressed && document.activeElement === inputElement.current) {
        e.view.event.preventDefault();
        if (commandHistoryCount - 1 <= 0) {
          setPreviousInputIsCommand(false);
          setInput('');
          return;
        };
        setPreviousInputIsCommand(true);
        const newInput = commandHistory[commandHistory.length - (commandHistoryCount - 1)].value || '';
        setInput(newInput);
        setCommandHistoryCount(commandHistoryCount - 1);
      } else {
        setPreviousInputIsCommand(false);
        scrollToWindowBottom();
        inputElement.current?.focus();
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!input) return;
    e.preventDefault();
    setCommandHistory([...commandHistory, { value: input, shouldBeTyped: true }]);
    setInput('');
  };

  return (
    <div className="mx-auto p-20 font-mono text-center sm:text-left" id='divConsole'>
      <pre className="text-left font-mono">
        <p key="banner"> <span className="wrapped"><span className='text-green'>Lucas Grasso Ramos 1.0.0</span> - Made with <span className='text-blue'>React.js</span></span><span>{`\n ${banner} \n`}</span>type <span className='text-command'>"help"</span> for a list of commands</p>
        {commandHistory.map((command: HistoryCommand, i: number) => {
          switch (command.value) {
            case "proyectos":
              return (
                <div key={i}>
                  <ExecutedCommandText text={command.value} type="command" />
                  <div className='project-container'>
                    {
                      Object.keys(projectsInfo).map((projectName: string, j: number) => {
                        return <Project key={`project.${j}`} name={projectName} shouldBeTyped={command.shouldBeTyped} />
                      })
                    }
                  </div>
                </div>
              )
              
            case 'ls':
              if (command.shouldBeTyped) {
                return (
                  <div key={i}>
                    <ExecutedCommandText key={`cmd.${i}`} text={command.value} type="command" />
                    <div className='flex-col'>
                      <span className='text-green'>Mode  Name</span>
                      <span className='text-green'>----  ----</span>
                      {
                        files["tree"].map((fileObj, j: number) => {
                          const fileName: string = getFormattedDirectories(fileObj.path)
                          console.log(fileName)
                          if (fileName.split('.').length === 1) {
                            return <TypedText key={`ls.${i}.${j}`} text={`d-r-- ${fileName}`} type='no-wrap'></TypedText>
                          } else {
                            return <TypedText key={`ls.${i}.${j}`} text={`-a--- ${fileName}`} type='no-wrap'></TypedText>
                          }
                        })
                      }
                    </div>
                  </div>
                )
              } else {
                return (
                  <div key={i}>
                    <ExecutedCommandText key={`cmd.${i}`} text={command.value} type="command" />
                    <div className='flex-col'>
                      <span className='text-green'>Mode  Name</span>
                      <span className='text-green'>----  ----</span>
                      {
                        files["tree"].map((fileObj, j: number) => {
                          const fileName: string = getFormattedDirectories(fileObj.path)
                          if (fileName.split('.').length === 1) {
                            return <span key={`ls.${i}.${j}`}>{`d-r-- ${fileName}`}</span>
                          } else {
                            return <span key={`ls.${i}.${j}`}>{`-a--- ${fileName}`}</span>
                          }
                        })
                      }
                    </div>
                  </div>
                )
              }
            case 'snake':
              const startGameCallback = () => {
                scrollToWindowBottom();
                setIsSnakeActive({ ...isSnakeActive, [i]: true });
                inputElement.current?.blur();
              }
              const endGameCallback = () => {
                inputElement.current?.focus();
                setIsSnakeActive({ ...isSnakeActive, [i]: false });
              }
              return (
                <div key={i}>
                  <ExecutedCommandText text={command.value} type="command" />
                  <SnakeGame width={10} height={10} startGameCallback={startGameCallback} endGameCallback={endGameCallback} />
                </div>
              )
            case "help":
              return (
                <div key={i}>
                  <ExecutedCommandText key={`cmd.${i}`} text={command.value} type="command" />
                  <div className='help-container' key={`help.${i}`}>
                    {getCommandDescriptions().map((commandWithInfo: string, j: number) => {
                      const commandName = commandWithInfo.split(' - ')[0];
                      if (command.shouldBeTyped) {
                        return (
                          <div className='flex-row' key={`cmd.${i}.${j}`}>
                            <TypedText key={`cmd.name.${i}.${j}`} text={`${commandName} `} type="command" />
                            <TypedText key={`cmd.description.${i}.${j}`} text={` -> ${commandDescriptions[commandName]}`} />
                          </div>
                        )
                      } else {
                        return (
                          <div className='flex-row' key={`cmd.${i}.${j}`}>
                            <span key={`cmd.name.${i}.${j}`} className='text-command'>{`${commandName}`}</span>
                            <span key={`cmd.description.${i}.${j}`}>{` -> ${commandDescriptions[commandName]}`}</span>
                          </div>
                        )
                      }
                    })
                    }
                  </div>
                </div>
              )
            default:
              if (!commands[command.value]) {
                const errorMsg = getErrorMsg(command.value);
                if (command.shouldBeTyped) {
                  return (
                    <div key={i}>
                      <ExecutedCommandText text={command.value} type="command" />
                      <TypedText text={errorMsg} type="error" speed={90} />
                    </div>
                  )
                } else {
                  return (
                    <div key={i}>
                      <ExecutedCommandText text={command.value} type="command" />
                      <span className='text-error'>{errorMsg}</span>
                    </div>
                  )
                }
              } else if (typeof commands[command.value]() === 'string') {
                const regex = /https?:\/\/[^\s]+/g;
                const resultText: string = commands[command.value]();
                const regexMatches = resultText.match(regex);
                if (regexMatches) {
                  const link = regexMatches[0]
                  if (command.shouldBeTyped) {
                    return (
                      <div key={i}>
                        <ExecutedCommandText text={command.value} type="command" />
                        <TypedText text={resultText.split(link)[0]} />
                        <div onClick={() => handleLinkClick(link)} className="hoverable-div">
                          <TypedText text={link} type="link" />
                        </div>
                      </div>
                    )
                  } else {
                    return (
                      <div key={i} className='flex-col'>
                        <ExecutedCommandText text={command.value} type="command" />
                        <span>{resultText.split(link)[0]}</span>
                        <div onClick={() => handleLinkClick(link)} className="hoverable-div">
                          <span className='text-link'>{link}</span>
                        </div>
                      </div>
                    )
                  }
                }
                else {
                  if (command.shouldBeTyped) {
                    return (
                      <div key={i}>
                        <ExecutedCommandText text={command.value} type="command" />
                        {resultText.length > 250 ? (
                          <TypedText text={resultText} speed={85} />
                        ) : (
                          <TypedText text={resultText} />
                        )
                        }
                      </div>
                    )
                  } else {
                    return (
                      <div key={i} className='flex-col'>
                        <ExecutedCommandText text={command.value} type="command" />
                        <span className='wrapped'>{resultText}</span>
                      </div>
                    )
                  }
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
            className={`ml-10 flex-grow-1 p-2 text-input-command ${previousInputIsCommand ? 'text-input-previous-command' : ''}`}
            ref={inputElement}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={() => {
              setPreviousInputIsCommand(false);
              setCommandHistoryCount(0);
            }}
            onFocus={() => setCommandHistoryCount(0)}
          />
        </div>
      </form>
    </div>
  );
};

export default Console;
