import { Position } from "./SnakeTypes";

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

export { snakeIsEating, snakeIsEatingItself, snakeIsOutOfBound };

