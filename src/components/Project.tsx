import { projectInfo } from '../utils/constants';
import { handleLinkClick } from '../utils/ConsoleUtils';
import TypedText from './TypedText';

type Props = {
    name: string;
};

export default function Project({ name }: Props) {
    if(!projectInfo[name]) return (<div></div>);

    const project = projectInfo[name];
    return (
        <div className="project">
            {/* <ReactSVG src={project.image} beforeInjection={(svg) => {
                svg.setAttribute('style', 'width: 10%; height: 10%;')
            }}/> */}
            <TypedText text={name} type="title"/>
            <TypedText text={project.description}/>
            <TypedText text={project.role}/>
            <div onClick={() => handleLinkClick(project.url)} className="hoverable-div">
                <TypedText text={"Visitar Sitio web"} type="link"/>
            </div>
        </div>
    );
}