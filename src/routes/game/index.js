import { h } from 'preact';
import style from './style';
import Button from 'preact-material-components/Button';

const Game = ({ currentRoll, rollDice }) => (
	<div className={style.home}>
		<Button outlined class={style.button} onClick={rollDice}>{currentRoll}</Button>
	</div>
);

export default Game;
