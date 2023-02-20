import { handleLinkClick } from '../utils/ConsoleUtils';
import { projectInfo } from '../utils/constants';
import TypedText from './TypedText';

type Props = {
    name: string;
    shouldBeTyped?: boolean;
};

export default function Project({ name, shouldBeTyped }: Props) {
    if (!projectInfo[name]) return (<div></div>);

    const project = projectInfo[name];
    if (shouldBeTyped) {
        return (
            <div className="project">
                <TypedText text={name} type="title" />
                <TypedText text={project.description} />
                <TypedText text={project.role} />
                <div onClick={() => handleLinkClick(project.url)} className="hoverable-div">
                    <TypedText text={"Visitar Sitio web"} type="link" />
                </div>
            </div>
        );
    } else {
        return (
            <div className="project">
                <span className='text-title'>{name}</span>
                <span>{project.description}</span>
                <span>{project.role}</span>
                <div onClick={() => handleLinkClick(project.url)} className="hoverable-div">
                    <span className='text-link'>Visitar Sitio web</span>
                </div>
            </div>
        );
    }
}