import { TypeAnimation } from 'react-type-animation';

type Props = {
  text : string
}

const TypedText = ({text} : Props) => {
    return (
      <TypeAnimation
        sequence={[
          text,
          () => {
            console.log('Done typing!'); // Place optional callbacks anywhere in the array
          }
        ]}
        wrapper="div"
        cursor={false}
        repeat={0}
        speed={75}
      />
    );
  };

export default TypedText;