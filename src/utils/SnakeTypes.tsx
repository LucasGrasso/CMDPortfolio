//Direction to key code
const Directions = {
    UP: "ArrowUp",
    DOWN: "ArrowDown",
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight",
    STOP: " "
}

type Position = { x: number, y: number };

interface TableStateDict {
    [key: string]: string;
}

export { Directions, type Position, type TableStateDict };
