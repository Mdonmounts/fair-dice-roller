import { h } from 'preact';
import style from './style';
import { Button } from 'preact-material-components/Button';

const Setup = ({ rollerSettings, reset, createRoller, changeRollerSetting }) => {
	const { randomChance, powerCo } = rollerSettings;

	function handleInputChange(event) {
		const target = event.target;
		const value = Number(target.value);
		const name = target.name;
		changeRollerSetting({ [name]: value });
	}

	return (
		<div class={style.home}>
			<h1>Let's Play!</h1>
			<Button onClick={reset}>Reset Game</Button>
			<input type="number" name="randomChance" min="0.0" max="1.0" step="0.1" value={randomChance}
				onChange={handleInputChange} />
			<input type="number" name="powerCo" min="1" max="20" step="1" value={powerCo}
				onChange={handleInputChange} />
			<Button onClick={createRoller}>Create New Roller</Button>
		</div>
	);
};

export default Setup;