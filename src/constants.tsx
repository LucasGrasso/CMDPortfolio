const banner : string = `
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠟⠛⠛⠻⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⠿⢋⣁⣤⣴⣶⣶⣾⣷⣶⣶⣦⣤⣈⡙⠻⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⡿⠋⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠙⢿⣿⣿⣿⣿
⣿⣿⣿⠟⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⢿⣷⣄⠻⣿⣿⣿
⣿⣿⠏⣰⣿⡿⠋⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠙⢿⣆⠹⣿⣿
⣿⡏⢠⡿⠋⠀⠀⠀⠈⢻⣿⣿⣿⡿⠋⠈⠻⣿⠟⢀⣠⢀⣄⡀⢠⣄⠙⠄⢹⣿
⣿⠁⠈⢀⡠⠀⣠⠀⣷⣦⡙⠿⠋⠀⠀⠀⠀⠀⠐⢿⣿⣿⣿⣿⣷⣿⣷⣄⠈⣿⣿
⣿⠀⣴⣿⣣⣾⣿⣷⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⠀⣿⣿
⣿⡀⢻⣿⣿⣿⣿⣿⠟⠁⢀⠀⠀⡀⢠⡀⠘⣦⠀⣶⣄⡀⠙⢿⣿⣿⣿⡟⠀⣿
⣿⣇⠘⣿⣿⣿⠟⢁⣴⣾⡟⢠⣾⣷⣿⣷⡄⢻⣷⣿⣿⣿⣶⣄⠙⣿⣿⠇⣸⣿
⣿⣿⣆⢹⠟⢁⣴⣿⣿⣿⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣌⠋⢠⣿⣿
⣿⣿⣿⣆⠠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⣰⣿⣿⣿
⣿⣿⣿⣿⣷⣌⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⣡⣾⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣷⣦⣉⠛⠻⠿⢿⣿⣿⣿⣿⡿⠿⠟⠛⣉⣴⣾⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣤⣤⣤⣤⣤⣤⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿                           
`;

interface projectInformation {
    [key: string]: {
        description: string;
        role: string;
        url: string;
    };
  }

const projectInfo : projectInformation = {
    "Zerti": {
        "description": "Zerti es un proyecto Web3 cuyo objetivo central es asegurar la validez y confianza de las certificaciones basándose en la inmutabilidad y transparencia de la tecnología blockchain",
        "role": "Co-founder, CEO, Blockchain & Full-Stack Developer, UI/UX Designer",
        "url" : "https://zerti.com.ar/",
    },
    "ERC-5516": {
        "description":"An interface for non-transferrable, Multi-owned NFTs binding to Ethereum accounts.",
        "role": "Blockchain Developer",
        "url" : "https://eips.ethereum.org/EIPS/eip-5516",
    },
    "Stringless": {
        "description":"Finalista de concurso INNOVAR 2021 & 2022. Bajo basado en laseres y botones. Finalista de INNOVAR bajo la categoria Producto innovador.",
        "role": "Hardware and Software Developer",
        "url": "https://github.com/LucasGrasso/Stringless"
    },
    "Orthix":{
        "description":"Finalista de concurso INNOVAR 2021 Categoria Colegios Secundarios. Orthix es la union entre los mundos de la solidaridad, la IA, la impresion 3D y la ortopedia.",
        "role": "Full-Stack developer, UI/UX Designer",
        "url": "https://orthix.netlify.app/",
    },
    "Portfolio":{
        "description":"Portfolio hecho en HTML, CSS y JS Vanilla.",
        "role": "Front-end developer, UI/UX Designer",
        "url": "https://lucasgrasso.com.ar/",
    },
}

export { banner, projectInfo };

