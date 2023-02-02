import { TypeAnimation } from 'react-type-animation';
import { Speed } from '../Utils';

type Props = {
  text : string
  type ?: string 
  speed ?: Speed
}

const TypedText = ({text, type = "", speed = 75} : Props) => {
  switch(type) {
    case "error":
      return (
        <TypeAnimation
          sequence={[
            text,          
          ]}
          wrapper="div"
          cursor={false}
          repeat={0}
          speed={speed}
          className="text-error"
        />
    );
    case "command":
      return (
        <TypeAnimation
          sequence={[
            text,            
          ]}
          wrapper="div"
          cursor={false}
          repeat={0}
          speed={speed}
          className="text-command"
        />
      );
    case "title":
      return (
        <TypeAnimation
          sequence={[
            text,
          ]}
          wrapper="div"
          cursor={false}
          repeat={0}
          speed={speed}
          className="text-title"
        />
      );
    case "link":
      return (
        <TypeAnimation
          sequence={[
            text,
          ]}
          wrapper="div"
          cursor={false}
          repeat={0}
          speed={speed}
          className="text-link"
        />
      );
    default:
      return (
        <TypeAnimation
          sequence={[
            text,   
          ]}
          wrapper="div"
          cursor={false}
          repeat={0}
          speed={speed}
          className="wrapped"
        />
      );
    }
  };

export default TypedText;