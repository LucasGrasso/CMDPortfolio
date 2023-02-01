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
        image: string;
    };
  }

const projectInfo : projectInformation = {
    "Zerti": {
        "description": "Zerti es un proyecto Web3 cuyo objetivo central es asegurar la validez y confianza de las certificaciones basándose en la inmutabilidad y transparencia de la tecnología blockchain",
        "role": "Co-founder, CEO, Blockchain & Full-Stack Developer",
        "image": "./zerti.svg"
    },
    "ERC-5516": {
        "description":"An interface for non-transferrable, Multi-owned NFTs binding to Ethereum accounts.",
        "role": "Blockchain Developer",
        "image": "./erc-5516.svg"
    }
}

export { banner, projectInfo };

