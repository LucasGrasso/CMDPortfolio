import { Directions, Position } from "./SnakeTypes";

const getRandomDirection = () => {
    const directions = Object.values(Directions);
    let randomDirection = directions[Math.floor(Math.random() * directions.length)];
    while (randomDirection === Directions.STOP) {
        randomDirection = directions[Math.floor(Math.random() * directions.length)];
    }
    return randomDirection;
}

function getRandomPosition(width: number, height: number): Position {
    return {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
    }
}

function getRandomPositionString(width: number, height: number): string {
    return stringifyPosition(getRandomPosition(width, height));
}

function stringifyPosition(position: Position): string {
    return `${position.x},${position.y}`;
}

function parsePosition(position: string): Position {
    const [x, y] = position.split(',');
    return {
        x: parseInt(x),
        y: parseInt(y)
    }
}


export { getRandomDirection, getRandomPosition, getRandomPositionString, stringifyPosition, parsePosition };

