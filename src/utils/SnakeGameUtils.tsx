import { Directions, Position } from "./SnakeTypes";

const snakeIsEating = (snakeHead: Position, food: Position) => {
    return snakeHead.x === food.x && snakeHead.y === food.y;
}

const snakeIsEatingItself = (snake: Position[]) => {
    if (snake.length <= 3) return false;
    const snakeHead: Position = snake[0];
    return snake.slice(1).some((snakePart) => snakePart.x === snakeHead.x && snakePart.y === snakeHead.y);
}

const snakeIsOutOfBound = (snakeHead: Position, width: number, height: number) => {
    return snakeHead.x < 0 || snakeHead.x >= width || snakeHead.y < 0 || snakeHead.y >= height;
}

const getNewSnakeHead = (snake: Position[], direction: string): Position => {
    if (!snake || snake.length === 0) return { x: 0, y: 0 };
    const snakeHead = snake[0];
    switch (direction) {
        case Directions.UP:
            return { x: snakeHead.x, y: snakeHead.y - 1 };
        case Directions.DOWN:
            return { x: snakeHead.x, y: snakeHead.y + 1 };
        case Directions.LEFT:
            return { x: snakeHead.x - 1, y: snakeHead.y };
        case Directions.RIGHT:
            return { x: snakeHead.x + 1, y: snakeHead.y };
        default:
            return { x: 0, y: 0 };
    }
}

export { snakeIsEating, snakeIsEatingItself, snakeIsOutOfBound, getNewSnakeHead };

