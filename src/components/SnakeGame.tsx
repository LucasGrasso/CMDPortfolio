import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useEffect, useState } from 'react';
import '../snake.css';
import { getNewSnakeHead, snakeIsEating, snakeIsEatingItself, snakeIsOutOfBound } from '../utils/SnakeGameUtils';
import { Directions, Position, TableStateDict } from '../utils/SnakeTypes';
import { getRandomPosition, getRandomPositionString, parsePosition, stringifyPosition } from '../utils/SnakeUtils';

type SnakeGameProps = {
    width: number;
    height: number;
}

export default function SnakeGame({ width, height }: SnakeGameProps) {
    const [tableState, setTableState] = useState<TableStateDict>({} as TableStateDict);
    const [score, setScore] = useState<number>(0);
    const [highScore, setHighScore] = useState<string>(JSON.parse(localStorage.getItem('highscore') || '0'));
    const [originalHighScore, setOriginalHighScore] = useState<string>(JSON.parse(localStorage.getItem('highscore') || '0'));
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [direction, setDirection] = useState<string>("");
    const [snakeState, setSnakeState] = useState<Position[]>([]);
    const [foodState, setFoodState] = useState<Position>({ x: 0, y: 0 });

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

    const snakeEat = (snakeHead: Position) => {
        const newFoodPosition: Position = getRandomPosition(width, height);
        setFoodState(newFoodPosition);
        setScore(score + 1);
        setSnakeState([snakeHead].concat(snakeState));
        setTableState({
            ...tableState,
            [stringifyPosition(newFoodPosition)]: "food",
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
                setSnakeState(newSnakeUp.slice(0, - 1));
                if (snakeIsEatingItself(newSnakeUp) || snakeIsOutOfBound(newSnakeHeadUp, width, height)) {
                    setGameOver(true);
                }
                if (snakeIsEating(newSnakeHeadUp, foodState)) {
                    snakeEat(newSnakeHeadUp);
                } else {
                    const newSnakeTail = newSnakeUp[newSnakeUp.length - 1];
                    setSnakeState
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
                setSnakeState(newSnakeDown.slice(0, - 1));
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
                setSnakeState(newSnakeLeft.slice(0, - 1));
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
                setSnakeState(newSnakeRight.slice(0, - 1));
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
        const tick = setInterval(updateGame, 100);
        return () => {
            clearInterval(tick);
        }
    }, [direction, tableState]);

    useEffect(() => {
        setInitialState();
        window.addEventListener('keydown', handleKeyDown);
        const root: HTMLElement = document.getElementById('root')!;
        if (!root) return;
        disableBodyScroll(root);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    useEffect(() => {
        const highScoreInt: number = parseInt(highScore);
        if (score > highScoreInt) {
            setHighScore(score.toString());
        }
        if (gameOver) {
            const root: HTMLElement = document.getElementById('root')!;
            if (!root) return;
            enableBodyScroll(root);
            localStorage.setItem('highscore', JSON.stringify(highScore));
        }
    }, [gameOver, score]);


    return (
        <div>
            {
                gameOver ? (
                    <div className='flex-col'>
                        <h1 className='text-error'>Game Over</h1>
                        <h3>Score: {score}</h3>
                        {score > parseInt(originalHighScore) && <h4 className='text-green'>¡Nuevo Record!</h4>}
                        <h3>High Score: {highScore}</h3>
                    </div>
                ) : (
                    <div className='snake-container' key="snake-container">
                        <div className="cols" key="cols">
                            {[...Array(width)].map((_, j) => {
                                return (
                                    <div className="flex-row" key={j}>
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
                        <div className='flex flex-col'>
                            <span>Score: {score}</span>
                            <span>High Score: {highScore}</span>
                        </div>
                    </div>
                )
            }
        </div>
    );
}