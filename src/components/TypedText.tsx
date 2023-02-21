import { TypeAnimation } from 'react-type-animation';
import { Speed } from '../utils/ConsoleUtils';

type Props = {
  text: string
  type?: string
  speed?: Speed
  callback?: () => void
}

const TypedText = ({ text, type = "", speed = 80, callback = () => { } }: Props) => {
  switch (type) {
    case "error":
      return (
        <TypeAnimation
          sequence={[
            text,
            callback,
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
            callback,
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
            callback,
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
            callback,
          ]}
          wrapper="div"
          cursor={false}
          repeat={0}
          speed={speed}
          className="text-link"
        />
      );
    case "no-wrap":
      return (
        <TypeAnimation
          sequence={[
            text,
            callback,
          ]}
          wrapper="div"
          cursor={false}
          repeat={0}
          speed={speed}
        />
      );
    default:
      return (
        <TypeAnimation
          sequence={[
            text,
            callback,
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