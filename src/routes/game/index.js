import { h } from 'preact';
import style from './style';
import Button from 'preact-material-components/Button';

const Game = ({ currentRoll, rollDice }) => (
    <div className={style.home}>
        <h1>{currentRoll}</h1>
        <Button outlined onClick={rollDice}>Roll the dice!</Button>
    </div>
);

export default Game;
