import { ReactSVG } from "react-svg";
import { projectInfo } from '../constants';
import TypedText from './TypedText';

type Props = {
    name: string;
};

export default function Project({ name }: Props) {
    if(!projectInfo[name]) return (<div></div>);
    return (
        <div className="project">
            <ReactSVG src={projectInfo[name].image} beforeInjection={(svg) => {
                svg.setAttribute('style', 'width: 10%; height: 10%;')
            }}/>
            <TypedText text={name}/>
            <TypedText text={projectInfo[name].description}/>
            <TypedText text={projectInfo[name].role}/>
        </div>
    );
}