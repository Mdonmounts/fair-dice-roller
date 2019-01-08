import { h, Component } from 'preact';
import { Router } from 'preact-router';

import NormalizedRoller from '../utilities/normal-roller';
import Header from './header';

// Code-splitting is automated for routes
import Setup from '../routes/setup';
import Outcomes from '../routes/outcomes';
import Game from '../routes/game';

export default class App extends Component {
	state = {
		currentRoll: 0,
		outcomes: []
	};
	roller = new NormalizedRoller();

	resetRolls = () => {
		this.setState({
			currentRoll: 0,
			outcomes: []
		});
		this.roller = new NormalizedRoller();
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

	render(props, { currentRoll, outcomes }) {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Setup path="/" reset={this.resetRolls} />
					<Game path="/game" currentRoll={currentRoll} rollDice={this.rollDice} />
					<Outcomes path="/stats" outcomes={outcomes} simulate={this.simulate} />
				</Router>
			</div>
		);
	}
}
