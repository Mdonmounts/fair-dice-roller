import { h } from 'preact';
import style from './style';
import { Button } from 'preact-material-components/Button';
import Outcomes from '../../components/outcomes/outcomes';

const Setup = ({ rollerSettings, reset, createRoller, changeRollerSetting, outcomes, simulate }) => {
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
			<div>
				<input type="number" name="randomChance" min="0.0" max="1.0" step="0.1" value={randomChance}
					onChange={handleInputChange}
				/>
				<label>Chance of random chance</label>
			</div>
			<div>
				<input type="number" name="powerCo" min="1" max="20" step="1" value={powerCo}
					onChange={handleInputChange}
				/>
				<label>Discount coefficient (higher for faster convergence)</label>
			</div>
			<Button onClick={createRoller}>Create New Roller</Button>
			<Outcomes path="/stats" outcomes={outcomes} simulate={simulate} reset={reset} />
		</div>
	);
};

export default Setup;