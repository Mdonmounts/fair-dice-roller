import 'preact-material-components/Theme/style.css';
import 'preact-material-components/Button/style.css';

import { h, Component } from 'preact';
import { Router } from 'preact-router';

import NormalizedRoller from '../utilities/normal-roller';
import Header from './header';

// Code-splitting is automated for routes
import Setup from '../routes/setup';
import Game from '../routes/game';

export default class App extends Component {
	state = {
		currentRoll: 0,
		outcomes: [],
		rollerSettings: {
			randomChance: 0.3,
			powerCo: 3
		}
	};

	resetRolls = () => {
		this.setState({
			currentRoll: 0,
			outcomes: []
		});
		this.roller = new NormalizedRoller();
	};

	changeRollerSetting = (newSettingObject) => {
		const newRollerSettings = Object.assign({}, this.state.rollerSettings, newSettingObject);
		this.setState({
			rollerSettings: newRollerSettings
		});
	};

	createRoller = () => {
		this.roller = new NormalizedRoller(this.state.rollerSettings.randomChance, this.state.rollerSettings.powerCo);
	};

	rollDice = () => {
		const newRoll = this.roller.getNextRoll();
		this.setState({
			currentRoll: newRoll,
			outcomes: this.roller.getObservations()
		});
	};

	simulate = (numRolls = 60) => {
		for (let i = 0; i < 60; i++) {
			this.roller.getNextRoll();
		}
		this.rollDice();
	};
	
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	componentDidMount() {
		this.createRoller();
	}

	render(props, { currentRoll, outcomes }) {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Game path="/" currentRoll={currentRoll} rollDice={this.rollDice} />
					<Setup path="/setup" rollerSettings={this.state.rollerSettings} reset={this.resetRolls} createRoller={this.createRoller} changeRollerSetting={this.changeRollerSetting} outcomes={outcomes}
						simulate={this.simulate}
					/>
				</Router>
			</div>
		);
	}
}
