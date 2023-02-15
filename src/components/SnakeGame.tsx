import { useEffect, useState } from 'react';
import '../snake.css';
import { snakeIsEating, snakeIsEatingItself, snakeIsOutOfBound } from '../utils/SnakeGameUtils';
import { Directions, Position, TableStateDict } from '../utils/SnakeTypes';
import { getRandomPosition, getRandomPositionString, parsePosition, stringifyPosition } from '../utils/SnakeUtils';

type SnakeGameProps = {
    width: number;
    height: number;
}

export default function SnakeGame({ width, height }: SnakeGameProps) {
    const [tableState, setTableState] = useState<TableStateDict>({} as TableStateDict);
    const [score, setScore] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [direction, setDirection] = useState<string>("");
    const [snakeState, setSnakeState] = useState<Position[]>([]);
    const [foodState, setFoodState] = useState<Position>({ x: 0, y: 0 });


    /* let direction: string = ""
    const setDirection = (newDirection: string) => {
        direction = newDirection;
    }

    let snakeState: Position[] = [];
    const setSnakeState = (newSnakeState: Position[]) => {
        snakeState = newSnakeState;
    }

    let foodState: Position = { x: 0, y: 0 };
    const setFoodState = (newFoodState: Position) => {
        foodState = newFoodState;
    } */


    const setInitialState = () => {
        const foodStartingPos: string = getRandomPositionString(width, height);
        let snakeStartingPos: string = getRandomPositionString(width, height);
        while (foodStartingPos === snakeStartingPos) {
            snakeStartingPos = getRandomPositionString(width, height);
        }
        setTableState({
            ...tableState,
            [foodStartingPos]: "food",
            [snakeStartingPos]: "snake"
        });

        setSnakeState([parsePosition(snakeStartingPos)]);
        setFoodState(parsePosition(foodStartingPos));
    }

    const handleKeyDown = (e: any) => {
        const pressedKey = e.key;
        if (pressedKey === Directions.UP && direction !== Directions.DOWN) {
            setDirection(Directions.UP);
            return;
        } else if (pressedKey === Directions.DOWN && direction !== Directions.UP) {
            setDirection(Directions.DOWN);
            return;
        } else if (pressedKey === Directions.LEFT && direction !== Directions.RIGHT) {
            setDirection(Directions.LEFT);
            return;
        } else if (pressedKey === Directions.RIGHT && direction !== Directions.LEFT) {
            setDirection(Directions.RIGHT);
            return;
        } else if (pressedKey === Directions.STOP) {
            setDirection(Directions.STOP);
            setGameOver(true);
            return;
        } else {
            setDirection(direction);
        }
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

    const snakeEat = (snakeHead: Position) => {
        console.log("snake is eating");
        setFoodState(getRandomPosition(width, height));
        setScore(score + 1);
        setTableState({
            ...tableState,
            [stringifyPosition(foodState)]: "food",
            [stringifyPosition(snakeHead)]: "snake",
        });
    }

    const updateGame = () => {
        if (gameOver) return;
        switch (direction) {
            //STOP
            case Directions.STOP:
                setGameOver(true);
                break;
            //LEFT
            case Directions.UP:
                const newSnakeHeadUp = getNewSnakeHead(snakeState, direction);
                const newSnakeUp = [newSnakeHeadUp].concat(snakeState);

                console.log("newSnakeUp", newSnakeUp);
                setSnakeState(newSnakeUp);
                if (snakeIsEatingItself(newSnakeUp) || snakeIsOutOfBound(newSnakeHeadUp, width, height)) {
                    setGameOver(true);
                }
                if (snakeIsEating(newSnakeHeadUp, foodState)) {
                    snakeEat(newSnakeHeadUp);
                } else {
                    const newSnakeTail = newSnakeUp[newSnakeUp.length - 1];
                    setTableState({
                        ...tableState,
                        [stringifyPosition(newSnakeHeadUp)]: "snake",
                        [stringifyPosition(newSnakeTail)]: "empty",
                    });
                }
                break;
            //DOWN
            case Directions.DOWN:
                const newSnakeHeadDown = getNewSnakeHead(snakeState, direction);
                const newSnakeDown = [newSnakeHeadDown].concat(snakeState);
                setSnakeState(newSnakeDown);
                if (snakeIsEatingItself(newSnakeDown) || snakeIsOutOfBound(newSnakeHeadDown, width, height)) {
                    setGameOver(true);
                }
                if (snakeIsEating(newSnakeHeadDown, foodState)) {
                    snakeEat(newSnakeHeadDown);
                } else {
                    const newSnakeTail = newSnakeDown[newSnakeDown.length - 1];
                    setTableState({
                        ...tableState,
                        [stringifyPosition(newSnakeHeadDown)]: "snake",
                        [stringifyPosition(newSnakeTail)]: "empty",
                    });
                }
                break;
            //LEFT
            case Directions.LEFT:
                const newSnakeHeadLeft = getNewSnakeHead(snakeState, direction);
                const newSnakeLeft = [newSnakeHeadLeft].concat(snakeState);
                setSnakeState(newSnakeLeft);
                if (snakeIsEatingItself(newSnakeLeft) || snakeIsOutOfBound(newSnakeHeadLeft, width, height)) {
                    setGameOver(true);
                }
                if (snakeIsEating(newSnakeHeadLeft, foodState)) {
                    snakeEat(newSnakeHeadLeft);
                } else {
                    const newSnakeTail = newSnakeLeft[newSnakeLeft.length - 1];
                    setTableState({
                        ...tableState,
                        [stringifyPosition(newSnakeHeadLeft)]: "snake",
                        [stringifyPosition(newSnakeTail)]: "empty",
                    });
                }
                break;
            //RIGHT
            case Directions.RIGHT:
                const newSnakeHeadRight = getNewSnakeHead(snakeState, direction);
                const newSnakeRight = [newSnakeHeadRight].concat(snakeState);
                setSnakeState(newSnakeRight);
                if (snakeIsEatingItself(newSnakeRight) || snakeIsOutOfBound(newSnakeHeadRight, width, height)) {
                    setGameOver(true);
                }
                if (snakeIsEating(newSnakeHeadRight, foodState)) {
                    snakeEat(newSnakeHeadRight);
                } else {
                    const newSnakeTail = newSnakeRight[newSnakeRight.length - 1];
                    setTableState({
                        ...tableState,
                        [stringifyPosition(newSnakeHeadRight)]: "snake",
                        [stringifyPosition(newSnakeTail)]: "empty",
                    });
                }
                break;

            case 'default':
                break;
        }
    }

    useEffect(() => {
        const tick = setInterval(updateGame, 250);
        setInitialState();
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearInterval(tick);
        }

    }, []);

    useEffect(() => {
        console.log("foodState", foodState);
    }, [foodState]);


    return (
        <div>
            {
                gameOver ? (<div>
                    <h1>Game Over</h1>
                    <h3>Score: {score}</h3>
                </div>) : (
                    <div className='snake-container' key="snake-container">
                        <div className="cols" key="cols">
                            {[...Array(width)].map((_, j) => {
                                return (
                                    <div className="row" key={j}>
                                        {[...Array(height)].map((_, i) => {
                                            const key = `${i},${j}`;
                                            return (
                                                <div key={key} className={tableState[key] === "snake" ? "cell-snake" : tableState[key] === "food" ? "cell-food" : `cell-empty ${key}`}></div>
                                            )
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                        <span>Score: {score}</span>
                    </div>
                )
            }
        </div>
    );
}