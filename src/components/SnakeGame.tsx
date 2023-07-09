import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useEffect, useState } from 'react';
import '../snake.css';
import { generateFood, getNewSnakeHead, snakeIsEating, snakeIsEatingItself, snakeIsOutOfBound } from '../utils/Snake/SnakeGameUtils';
import { Directions, Position, TableStateDict } from '../utils/Snake/SnakeTypes';
import { getRandomPositionString, parsePosition, stringifyPosition } from '../utils/Snake/SnakeUtils';

type SnakeGameProps = {
	width: number;
	height: number;
	startGameCallback: () => void;
	endGameCallback: () => void;
}

export default function SnakeGame({ width, height, startGameCallback, endGameCallback }: SnakeGameProps) {
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

	const snakeEat = (snakeBody: Position[]) => {
		const snakeHead: Position = snakeBody[0];
		let newFoodPosition: Position = generateFood(snakeBody, width, height);
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
					snakeEat(newSnakeUp);
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
					snakeEat(newSnakeDown);
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
					snakeEat(newSnakeLeft);
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
					snakeEat(newSnakeRight);
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
		startGameCallback();
		setInitialState();
		window.addEventListener('keydown', handleKeyDown);
		disableBodyScroll(document.getElementById('divConsole')!);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		}
	}, []);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		}
	}, [handleKeyDown]);

	useEffect(() => {
		const highScoreInt: number = parseInt(highScore);
		if (score > highScoreInt) {
			setHighScore(score.toString());
		}
		if (gameOver) {
			endGameCallback();
			enableBodyScroll(document.getElementById('divConsole')!);
			localStorage.setItem('highscore', JSON.stringify(highScore));
		}
	}, [gameOver, score]);


	const [touchStartX, setTouchStartX] = useState<number>(0)
	const [touchEndX, setTouchEndX] = useState<number>(0)
	const [touchStartY, setTouchStartY] = useState<number>(0)
	const [touchEndY, setTouchEndY] = useState<number>(0)


	// the required distance between touchStart and touchEnd to be detected as a swipe
	const minSwipeDistance = 20

	const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.stopPropagation()
		setTouchEndX(0) // otherwise the swipe is fired even with usual touch events
		setTouchEndY(0)
		setTouchStartX(e.targetTouches[0].clientX)
		setTouchStartY(e.targetTouches[0].clientY)
	}

	const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.stopPropagation()
		setTouchEndX(e.targetTouches[0].clientX)
		setTouchEndY(e.targetTouches[0].clientY)
	}

	const onTouchEnd = (e: any) => {
		e.preventDefault()
		if (!touchStartX || !touchEndX || !touchStartY || !touchEndY) return
		const distanceX = touchStartX - touchEndX
		const isLeftSwipe = distanceX > minSwipeDistance
		const isRightSwipe = distanceX < -minSwipeDistance
		const distanceY = touchStartY - touchEndY
		const isUpSwipe = distanceY > minSwipeDistance
		const isDownSwipe = distanceY < -minSwipeDistance
		if (!isLeftSwipe && !isRightSwipe && !isUpSwipe && !isDownSwipe) return
		if (isLeftSwipe && direction !== Directions.RIGHT) {
			setDirection(Directions.LEFT);
		} else if (isRightSwipe && direction !== Directions.LEFT) {
			setDirection(Directions.RIGHT);
		} else if (isUpSwipe && direction !== Directions.DOWN) {
			setDirection(Directions.UP);
		} else if (isDownSwipe && direction !== Directions.UP) {
			setDirection(Directions.DOWN);
		}
	}



	useEffect(() => {
		window.addEventListener('touchend', onTouchEnd);
		return () => window.removeEventListener('touchend', onTouchEnd);
	}, [onTouchEnd]);

	return (
		<div onTouchStart={(e: React.TouchEvent<HTMLDivElement>) => { onTouchStart(e) }} onTouchMove={(e: React.TouchEvent<HTMLDivElement>) => { onTouchMove(e) }}>
			{
				gameOver ? (
					<div className='flex-col'>
						<span className='text-error'>Game Over</span>
						<span>Score: {score}</span>
						{score > parseInt(originalHighScore) && <span className='text-green'>¡Nuevo Record!</span>}
						<span>High Score: {highScore}</span>
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