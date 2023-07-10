import { handleLinkClick } from "../utils/ConsoleUtils";
import { projectsInfo } from "../utils/constants";
import TypedText from "./TypedText";

type Props = {
    name: string;
    shouldBeTyped?: boolean;
};

export default function Project({ name, shouldBeTyped }: Props) {
	if (!projectsInfo[name]) return (<div></div>);

	const project = projectsInfo[name];
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
				<span className='wrapped'>{project.description}</span>
				<span className='wrapped'>{project.role}</span>
				<div onClick={() => handleLinkClick(project.url)} className="hoverable-div">
					<span className='text-link'>Visitar Sitio web</span>
				</div>
			</div>
		);
	}
}