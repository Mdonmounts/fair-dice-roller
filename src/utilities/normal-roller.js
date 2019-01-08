import { cumsum, sum, mult } from './math-utils';
import MersenneTwister from 'mersennetwister';

function NormalizedRoller(randomCuttoff=0.1, powerCoefficient=10) {
	const mt = new MersenneTwister(Date.now());
	const power = powerCoefficient;
	const randChance = randomCuttoff;
	const _outcomes = [2,3,4,5,6,7,8,9,10,11,12];
	const _expectedChance = [1,2,3,4,5,6,5,4,3,2,1];
	let _expected = _expectedChance.map((num) => num / 36 );
	let _observed = [0,0,0,0,0,1,0,0,0,0,0];

	function getProbabilities(observed, expected) {
		const numRolls = sum(observed);
		const percObserved = observed.map((num) => num / numRolls);

		const diffFromExpectation = [];
		for (let i = 0; i < expected.length; i++) {
			diffFromExpectation.push((percObserved[i] - expected[i]) / expected[i]);
		}

		const maxDiff = Math.max(...diffFromExpectation);
		const weights = [];
		for (let i = 0; i < diffFromExpectation.length; i++) {
			weights.push(Math.pow((maxDiff - diffFromExpectation[i] + 0.01), power)); 
		}
		const sumWeights = sum(weights);
		for (let i = 0; i < weights.length; i++) {
			weights[i] = weights[i] / sumWeights;
		}

		let prob = mult(expected, weights);
		const sumProb = sum(prob);
		prob = prob.map((num) => num / sumProb);
		return prob;
	}

	function sampleIndex(probs) {
		const cumProbs = cumsum(probs);
		const selector = mt.rnd();
		let lowEnd = 0;
		let index = 0;
		for (let i = 0; i < cumProbs.length; i++) {
			if (selector > lowEnd && selector <= cumProbs[i]) {
				index = i;
				break;
			}
			lowEnd = cumProbs[i];
		}
		return index;
	}

	this.getNextRoll = () => {
		let rollIndex= 0;
		if (mt.rnd() < randChance) {
			rollIndex = sampleIndex(_expected)
		} else {
			const probs = getProbabilities(_observed, _expected);
			rollIndex = sampleIndex(probs);
		}
		_observed[rollIndex] += 1;
		return _outcomes[rollIndex];
	}

	this.getObservations = () => {
		return [..._observed];
	}
}

export default NormalizedRoller;